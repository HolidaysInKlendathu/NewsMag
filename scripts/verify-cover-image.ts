// scripts/verify-cover-image.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyCoverImage() {
  try {
    console.log('Verifying cover image field...')

    const authors = await prisma.author.findMany({
      select: {
        name: true,
        coverImage: true
      }
    })

    console.log('Authors with cover images:')
    authors.forEach(author => {
      console.log(`${author.name}: ${author.coverImage || 'No cover image'}`)
    })

  } catch (error) {
    console.error('Verification failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyCoverImage()