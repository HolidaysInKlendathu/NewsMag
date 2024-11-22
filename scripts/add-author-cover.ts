// scripts/add-author-cover.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addAuthorCoverImage() {
  try {
    console.log('Starting author cover image migration...')
    
    // Add the column (this is handled by prisma db push)
    // Update existing authors with a default cover if needed
    const authors = await prisma.author.findMany()
    
    for (const author of authors) {
      // You can add default cover images or leave them null
      await prisma.author.update({
        where: { id: author.id },
        data: { 
          coverImage: null  // Or set a default cover image
        }
      })
    }

    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addAuthorCoverImage()