// scripts/verify-article-schema.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyAndUpdateArticles() {
  try {
    // 1. Get all existing articles
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        featured: true,
        spotlight: true,
        evergreen: true,
        sponsored: true,
        partnerContent: true,
        crowdsourced: true,
        premium: true,
        hasVideo: true,
        hasAudio: true,
        hasGallery: true,
      }
    })

    console.log(`Found ${articles.length} articles`)
    console.log('\nSample article with new fields:')
    console.log(JSON.stringify(articles[0], null, 2))

    // 2. Update articles with undefined values
    const updates = await prisma.article.updateMany({
      where: {
        OR: [
          { spotlight: undefined },
          { evergreen: undefined },
          { sponsored: undefined },
          { partnerContent: undefined },
          { crowdsourced: undefined },
          { premium: undefined },
          { hasVideo: undefined },
          { hasAudio: undefined },
          { hasGallery: undefined },
        ]
      },
      data: {
        spotlight: false,
        evergreen: false,
        sponsored: false,
        partnerContent: false,
        crowdsourced: false,
        premium: false,
        hasVideo: false,
        hasAudio: false,
        hasGallery: false,
      }
    })

    console.log(`Updated ${updates.count} articles with default values`)
  } catch (error) {
    console.error('Error during verification:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyAndUpdateArticles()