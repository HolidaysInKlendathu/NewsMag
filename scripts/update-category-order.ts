// scripts/update-category-order.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateCategoryOrder() {
  try {
    console.log('Starting category order update...')
    
    // Get all categories
    const categories = await prisma.category.findMany()
    
    // Update each category with a default order
    for (const category of categories) {
      await prisma.category.update({
        where: { id: category.id },
        data: { order: 1 }, // Set all to 1 initially
      })
      console.log(`Updated category: ${category.name}`)
    }

    console.log('Successfully updated all categories')
  } catch (error) {
    console.error('Error updating category orders:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateCategoryOrder()