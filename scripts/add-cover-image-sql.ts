// scripts/add-cover-image-sql.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCoverImageColumn() {
  try {
    console.log('Starting SQL migration for cover image...')

    // Add the column using raw SQL
    await prisma.$executeRaw`ALTER TABLE Author ADD COLUMN coverImage TEXT;`
    
    console.log('Added coverImage column')

    // Update existing authors with a default cover
    const authors = await prisma.author.findMany()
    const defaultCover = 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=2000&q=80'

    for (const author of authors) {
      await prisma.$executeRaw`
        UPDATE Author 
        SET coverImage = ${defaultCover}
        WHERE id = ${author.id};
      `
      console.log(`Updated cover image for author: ${author.name}`)
    }

    console.log('Migration completed successfully')
  } catch (error) {
    if (error.code === 'P2010') {
      console.log('Column already exists, proceeding with updates...')
      // Try to update existing authors
      const authors = await prisma.author.findMany()
      const defaultCover = 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=2000&q=80'

      for (const author of authors) {
        await prisma.$executeRaw`
          UPDATE Author 
          SET coverImage = ${defaultCover}
          WHERE id = ${author.id};
        `
        console.log(`Updated cover image for author: ${author.name}`)
      }
    } else {
      console.error('Migration failed:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

addCoverImageColumn()