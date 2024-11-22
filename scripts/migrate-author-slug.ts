// scripts/migrate-author-slug.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens
}

async function migrateAuthorSlugs() {
  try {
    console.log('Starting author slug migration...')

    // Get all authors
    const authors = await prisma.author.findMany()
    console.log(`Found ${authors.length} authors`)

    // Update each author
    for (const author of authors) {
      console.log(`Processing author: ${author.name}`)
      
      // Generate initial slug
      let baseSlug = generateSlug(author.name)
      let finalSlug = baseSlug
      let counter = 1

      // Keep trying until we find a unique slug
      while (true) {
        try {
          await prisma.author.update({
            where: { id: author.id },
            data: { slug: finalSlug }
          })
          console.log(`Updated author "${author.name}" with slug "${finalSlug}"`)
          break
        } catch (error) {
          // If there's a unique constraint error, try next number
          counter++
          finalSlug = `${baseSlug}-${counter}`
          console.log(`Trying alternative slug: ${finalSlug}`)
        }
      }
    }

    // Verify all authors have slugs
    const unprocessedAuthors = await prisma.author.findMany({
      where: { slug: null }
    })

    if (unprocessedAuthors.length > 0) {
      console.error('Some authors still missing slugs:', unprocessedAuthors)
    } else {
      console.log('All authors successfully processed')
    }

  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateAuthorSlugs()