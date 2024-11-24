// scripts/seed-db.ts
import { PrismaClient } from '@prisma/client'
import { seedAuthors } from '../data/seed-data'

const dbClient = new PrismaClient()

function createAuthorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function ensureUniqueSlug(baseName: string): Promise<string> {
  let slug = createAuthorSlug(baseName)
  let counter = 1
  
  while (true) {
    const existing = await dbClient.author.findUnique({
      where: { slug: counter === 1 ? slug : `${slug}-${counter}` }
    })

    if (!existing) {
      return counter === 1 ? slug : `${slug}-${counter}`
    }

    counter++
  }
}

async function seedDatabaseWithAuthors() {
  try {
    console.log('Starting database seeding...')

    for (const authorData of seedAuthors) {
      try {
        // Check if author email already exists
        const existingUser = await dbClient.user.findUnique({
          where: { email: authorData.email }
        })

        let userId: string | undefined

        if (!existingUser) {
          // Create user if doesn't exist
          const user = await dbClient.user.create({
            data: {
              name: authorData.name,
              email: authorData.email,
              emailVerified: new Date(),
              role: "AUTHOR",
            }
          })
          userId = user.id
          console.log(`Created user for: ${authorData.name}`)
        } else {
          userId = existingUser.id
          console.log(`User already exists for: ${authorData.name}`)
        }

        // Generate unique slug
        const slug = await ensureUniqueSlug(authorData.name)

        // Check if author already exists
        const existingAuthor = await dbClient.author.findFirst({
          where: { email: authorData.email }
        })

        if (!existingAuthor) {
          // Create author
          const author = await dbClient.author.create({
            data: {
              ...authorData,
              slug,
              userId
            }
          })
          console.log(`Created author: ${author.name} with slug: ${author.slug}`)
        } else {
          console.log(`Author already exists: ${authorData.name}`)
        }

      } catch (error) {
        console.error(`Error processing author ${authorData.name}:`, error)
      }
    }

    console.log('Database seeding completed')

  } catch (error) {
    console.error('Error in database seeding:', error)
  } finally {
    await dbClient.$disconnect()
  }
}

async function cleanupSeedData() {
  try {
    // Delete authors created by this script
    await dbClient.author.deleteMany({
      where: {
        email: {
          in: seedAuthors.map(author => author.email)
        }
      }
    })

    // Delete users created by this script
    await dbClient.user.deleteMany({
      where: {
        email: {
          in: seedAuthors.map(author => author.email)
        }
      }
    })

    console.log('Cleaned up seed data')
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}

async function runSeeder() {
  const shouldCleanup = process.argv.includes('--cleanup')
  
  if (shouldCleanup) {
    console.log('Cleaning up existing seed data...')
    await cleanupSeedData()
  }

  console.log('Starting database seeding...')
  await seedDatabaseWithAuthors()
}

// Run with error handling
runSeeder()
  .catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })