// scripts/watch-articles.ts
import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'
import { minioClient, getArticleContent } from '@/lib/minio'

const prisma = new PrismaClient()
const BUCKET_NAME = process.env.MINIO_BUCKET || ''

async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  })

  const slug = `${baseSlug}`
  let exists = await prisma.article.findFirst({
    where: { slug }
  })

  if (!exists) return slug

  // If slug exists, add incremental number
  let counter = 1
  let newSlug = `${slug}-${counter}`
  
  while (exists) {
    newSlug = `${slug}-${counter}`
    exists = await prisma.article.findFirst({
      where: { slug: newSlug }
    })
    counter++
  }

  return newSlug
}

async function processArticle(objectName: string) {
  try {
    console.log(`\n📝 Processing article: ${objectName}`)
    
    const content = await getArticleContent(objectName)
    const { data, content: markdownContent } = matter(content)

    // Validate required fields
    if (!data.title || !data.category) {
      throw new Error('Article must have title and category')
    }

    // Validate coverImage URL
    if (!data.coverImage || !data.coverImage.startsWith('http')) {
      throw new Error('Invalid coverImage URL. Must be a valid HTTP URL')
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { slug: data.category }
    })

    if (!category) {
      throw new Error(`Invalid category: ${data.category}. Please use a valid category slug.`)
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(data.title)

    // Check if article already exists
    const existingArticle = await prisma.article.findFirst({
      where: {
        OR: [
          { title: data.title },
          { slug }
        ]
      }
    })

    if (existingArticle) {
      console.log(`⚠️ Article already exists: ${data.title}`)
      return
    }

    // Create new article
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        content: markdownContent,
        excerpt: data.excerpt,
        coverImage: data.coverImage.trim(),
        publishedAt: new Date(data.publishedAt),
        authorId: data.author || 'cm3pw0m9u00026hqfvtiqmtcw',
        status: data.status || 'PUBLISHED',
        
        // Features and flags
        featured: Boolean(data.featured),
        spotlight: Boolean(data.spotlight),
        evergreen: Boolean(data.evergreen),
        sponsored: Boolean(data.sponsored),
        sponsorName: data.sponsorName,
        partnerContent: Boolean(data.partnerContent),
        affiliate: Boolean(data.affiliate),
        crowdsourced: Boolean(data.crowdsourced),
        premium: Boolean(data.premium),
        
        // Media features
        hasVideo: Boolean(data.hasVideo),
        hasAudio: Boolean(data.hasAudio),
        hasGallery: Boolean(data.hasGallery),

        // Connect to category
        categories: {
          connect: [{ id: category.id }]
        }
      }
    })

    console.log('✅ Article created successfully:')
    console.log(`Title: ${article.title}`)
    console.log(`Cover Image: ${article.coverImage}`)
    console.log(`Category: ${data.category}`)
    console.log(`URL: /articles/${data.category}/${article.slug}`)

  } catch (error) {
    console.error(`❌ Error processing article:`, error)
  }
}

// Replace chokidar watcher with MinIO events
minioClient.listenBucketNotification(BUCKET_NAME, '', '', ['s3:ObjectCreated:*'])
  .on('notification', async (record: any) => {
    const objectName = record.s3.object.key
    if (objectName.endsWith('.md')) {
      await processArticle(objectName)
    }
  })

// Handle graceful shutdown
process.on('SIGINT', () => {
  prisma.$disconnect()
  process.exit(0)
})