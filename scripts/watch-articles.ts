// scripts/watch-articles.ts
import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { PrismaClient } from '@prisma/client'
import { generateUniqueSlug } from '../utils/slug-utils'

const prisma = new PrismaClient()
const ARTICLES_DIR = path.join(process.cwd(), 'app/content/articles')

async function processArticle(filePath: string) {
  try {
    console.log(`Processing new/modified article: ${path.basename(filePath)}`)
    
    // Read and parse the markdown file
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    // Generate the slug
    const slug = await generateUniqueSlug({
      title: data.title,
      category: data.category,
      publishedAt: new Date(data.publishedAt)
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
      return
    }

    // Create new article in database
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        content,
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        publishedAt: new Date(data.publishedAt),
        authorId: data.author || 'cm3pw0m9u00026hqfvtiqmtcw',
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

    console.log(`✅ Created article: ${article.title}`)
    console.log(`🔗 URL: /articles/${article.slug}`)

  } catch (error) {
    console.error(`Error processing article ${filePath}:`, error)
  }
}

// Initialize watcher
const watcher = chokidar.watch(ARTICLES_DIR, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
})

// Add event listeners
watcher
  .on('add', filePath => {
    if (path.extname(filePath) === '.md') {
      processArticle(filePath)
    }
  })
  .on('change', filePath => {
    if (path.extname(filePath) === '.md') {
      processArticle(filePath)
    }
  })
  .on('ready', () => {
    console.log('👀 Watching for new articles in content/articles...')
  })
  .on('error', error => {
    console.error('Error watching files:', error)
  })

// Handle graceful shutdown
process.on('SIGINT', () => {
  watcher.close()
  prisma.$disconnect()
  process.exit(0)
})