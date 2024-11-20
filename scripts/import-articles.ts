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

    // Update the path to point to the app directory
    const articlesDirectory = path.join(process.cwd(), 'app', 'content', 'articles')
    console.log('Looking for articles in:', articlesDirectory)
    
    const filenames = fs.readdirSync(articlesDirectory)
    console.log('Found files:', filenames)

    for (const filename of filenames) {
      const filePath = path.join(articlesDirectory, filename)
      console.log('Processing file:', filePath)
      
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

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
    }

    console.log('Import completed successfully!')

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