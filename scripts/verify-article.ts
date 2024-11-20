// scripts/verify-article.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyArticle() {
  try {
    // First check if we can connect to the database
    await prisma.$connect()
    console.log('Database connection successful')

    // List all articles
    const allArticles = await prisma.article.findMany()
    console.log('All articles:', allArticles)

    // Try to find our specific article
    const article = await prisma.article.findFirst({
      where: {
        slug: 'ai-trends'
      },
      include: {
        author: true,
      },
    })
    
    if (article) {
      console.log('Article found:', article)
    } else {
      console.log('Article not found. Checking database state...')
      
      // List all slugs
      const slugs = await prisma.article.findMany({
        select: { slug: true }
      })
      console.log('Available slugs:', slugs)
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyArticle()