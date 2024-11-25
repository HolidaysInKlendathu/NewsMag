// scripts/process-markdown.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PrismaClient } from '@prisma/client'
import { generateUniqueSlug } from '../utils/slug-utils'

const prisma = new PrismaClient()
const CONTENT_DIR = path.join(process.cwd(), 'app/content/articles')

async function processMarkdownFiles() {
  try {
    // Ensure content directory exists
    if (!fs.existsSync(CONTENT_DIR)) {
      console.error(`Content directory not found: ${CONTENT_DIR}`)
      return
    }

    const files = fs.readdirSync(CONTENT_DIR)
    console.log(`Found ${files.length} files in content directory`)
    
    for (const file of files) {
      if (!file.endsWith('.md')) {
        console.log(`Skipping non-markdown file: ${file}`)
        continue
      }
      
      try {
        const filePath = path.join(CONTENT_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        // Validate required fields
        if (!data.title || !data.category) {
          console.error(`Missing required fields in ${file}. Title and category are required.`)
          continue
        }

        console.log(`Processing article: ${data.title}`)
        
        // Generate unique slug
        const slug = await generateUniqueSlug({
          title: data.title,
          category: data.category,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined
        })
        
        // Check if article already exists
        const existingArticle = await prisma.article.findFirst({
          where: {
            OR: [
              { slug },
              { title: data.title }
            ]
          }
        })
        
        if (existingArticle) {
          console.log(`Article already exists: ${data.title}`)
          continue
        }
        
        // Create new article
        const article = await prisma.article.create({
          data: {
            title: data.title,
            slug,
            content,
            excerpt: data.excerpt || '',
            coverImage: data.coverImage || '',
            publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
            authorId: data.author || 'cm3pw0m9u00026hqfvtiqmtcw', // Your default author ID
            status: data.status || 'PUBLISHED',
            featured: Boolean(data.featured),
            spotlight: Boolean(data.spotlight),
            evergreen: Boolean(data.evergreen),
            sponsored: Boolean(data.sponsored),
            partnerContent: Boolean(data.partnerContent),
            crowdsourced: Boolean(data.crowdsourced),
            premium: Boolean(data.premium),
            hasVideo: Boolean(data.hasVideo),
            hasAudio: Boolean(data.hasAudio),
            hasGallery: Boolean(data.hasGallery),
          }
        })
        
        console.log(`Created article: ${article.title} with slug: ${article.slug}`)
      } catch (error) {
        console.error(`Error processing file ${file}:`, error)
        continue // Continue with next file even if one fails
      }
    }
  } catch (error) {
    console.error('Error processing markdown files:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Add debug mode flag
const DEBUG = process.env.DEBUG === 'true'

// Run the processor
processMarkdownFiles()
  .then(() => console.log('Finished processing markdown files'))
  .catch(error => console.error('Fatal error:', error))