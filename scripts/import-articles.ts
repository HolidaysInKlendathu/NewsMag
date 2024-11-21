// scripts/import-articles.ts
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const prisma = new PrismaClient()

async function importArticles() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')

    const articlesDirectory = path.join(process.cwd(), 'app', 'content', 'articles')
    console.log('Looking for articles in:', articlesDirectory)
    
    const filenames = fs.readdirSync(articlesDirectory)
    console.log('Found files:', filenames)

    for (const filename of filenames) {
      try {
        const filePath = path.join(articlesDirectory, filename)
        console.log('Processing file:', filePath)
        
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        // Verify author exists
        const author = await prisma.author.findUnique({
          where: { id: data.author }
        })

        if (!author) {
          console.error(`Author with ID ${data.author} not found for article ${filename}`)
          continue
        }

        // Check if article already exists
        const existingArticle = await prisma.article.findUnique({
          where: { slug: filename.replace('.md', '') }
        })

        if (existingArticle) {
          console.log(`Article ${filename} already exists, skipping...`)
          continue
        }

        const article = await prisma.article.create({
          data: {
            title: data.title,
            slug: filename.replace('.md', ''),
            content: content,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            status: data.status as 'PUBLISHED',
            publishedAt: new Date(data.publishedAt),
            authorId: data.author,
            readingTime: data.readingTime,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            wordCount: content.split(/\s+/).length,
          },
        })

        console.log(`Imported article:`, {
          title: article.title,
          slug: article.slug,
          authorId: article.authorId
        })
      } catch (error) {
        console.error(`Error processing ${filename}:`, error)
      }
    }

    // Verify the imports
    const articles = await prisma.article.findMany({
      include: {
        author: true
      }
    })
    console.log('All articles after import:', articles)

  } catch (error) {
    console.error('Error importing articles:', error)
  } finally {
    await prisma.$disconnect()
  }
}

importArticles()