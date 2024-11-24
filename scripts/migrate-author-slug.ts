// scripts/migrate-author-slug.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function generateUniqueSlug(baseName: string): Promise<string> {
  let slug = generateSlug(baseName)
  let counter = 1
  
  while (true) {
    const existing = await prisma.author.findUnique({
      where: { slug: counter === 1 ? slug : `${slug}-${counter}` }
    })

    if (!existing) {
      return counter === 1 ? slug : `${slug}-${counter}`
    }

    counter++
  }
}

async function migrateAuthorSlugs() {
  try {
    console.log('Starting author slug migration...')

    // Get all authors
    const authors = await prisma.author.findMany()
    console.log(`Found ${authors.length} authors`)

    // Update each author
    for (const author of authors) {
      try {
        const slug = await generateUniqueSlug(author.name)
        
        await prisma.author.update({
          where: { id: author.id },
          data: { slug }
        })

        console.log(`Updated author "${author.name}" with slug "${slug}"`)
      } catch (error) {
        console.error(`Error updating author ${author.name}:`, error)
      }
    }

    console.log('Migration completed')

  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the migration
migrateAuthorSlugs()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })