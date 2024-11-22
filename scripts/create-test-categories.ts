// scripts/create-test-categories.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testCategories = [
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Latest news and developments in technology',
    featured: true,
    order: 1,
  },
  {
    name: 'Politics',
    slug: 'politics',
    description: 'Political news and analysis',
    featured: true,
    order: 2,
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Sports news and coverage',
    featured: true,
    order: 3,
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Entertainment and celebrity news',
    featured: false,
    order: 4,
  },
  {
    name: 'Science',
    slug: 'science',
    description: 'Scientific discoveries and research',
    featured: false,
    order: 5,
  },
]

async function createTestCategories() {
  try {
    console.log('Creating test categories...')

    for (const category of testCategories) {
      const existingCategory = await prisma.category.findUnique({
        where: { slug: category.slug },
      })

      if (!existingCategory) {
        await prisma.category.create({
          data: category,
        })
        console.log(`Created category: ${category.name}`)
      } else {
        console.log(`Category ${category.name} already exists`)
      }
    }

    console.log('Test categories created successfully')
  } catch (error) {
    console.error('Error creating test categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestCategories()