// scripts/seed-categories.ts
import { PrismaClient } from '@prisma/client'
import { categories } from '../app/config/categories'

const prisma = new PrismaClient()

async function seedCategories() {
  try {
    console.log('🌱 Starting category seeding...')

    // Create main categories first
    for (const category of categories) {
      console.log(`\nProcessing main category: ${category.name}`)
      
      const mainCategory = await prisma.category.upsert({
        where: {
          slug: category.slug
        },
        update: {
          name: category.name,
          description: category.description,
          order: 1,
          featured: false
        },
        create: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          order: 1,
          featured: false
        }
      })

      console.log(`✅ Created/Updated main category: ${mainCategory.name}`)

      // Create subcategories and link them to the main category
      for (const subCategory of category.subCategories) {
        const sub = await prisma.category.upsert({
          where: {
            slug: subCategory.slug
          },
          update: {
            name: subCategory.name,
            description: subCategory.description,
            parentId: mainCategory.id,
            order: 1,
            featured: false
          },
          create: {
            name: subCategory.name,
            slug: subCategory.slug,
            description: subCategory.description,
            parentId: mainCategory.id,
            order: 1,
            featured: false
          }
        })
        console.log(`  ✅ Created/Updated subcategory: ${sub.name}`)
      }
    }

    console.log('\n✨ Category seeding completed!')

    // Print verification
    const totalCategories = await prisma.category.count()
    console.log(`\nTotal categories in database: ${totalCategories}`)
    
    const mainCategories = await prisma.category.findMany({
      where: {
        parentId: null
      },
      include: {
        children: true
      }
    })

    console.log('\nCategory Structure:')
    mainCategories.forEach(cat => {
      console.log(`\n${cat.name}:`)
      cat.children.forEach(sub => {
        console.log(`  - ${sub.name}`)
      })
    })

  } catch (error) {
    console.error('Error seeding categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
seedCategories()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })