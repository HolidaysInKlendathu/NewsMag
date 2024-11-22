// scripts/update-author-slugs.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function updateAuthorSlugs() {
  try {
    const authors = await prisma.author.findMany()
    
    for (const author of authors) {
      let slug = generateSlug(author.name)
      let counter = 1
      
      // Handle duplicate slugs
      while (true) {
        const existing = await prisma.author.findUnique({
          where: { slug: counter > 1 ? `${slug}-${counter}` : slug }
        })
        
        if (!existing || existing.id === author.id) {
          break
        }
        counter++
      }
      
      const finalSlug = counter > 1 ? `${slug}-${counter}` : slug
      
      await prisma.author.update({
        where: { id: author.id },
        data: { slug: finalSlug }
      })
      
      console.log(`Updated author: ${author.name} -> ${finalSlug}`)
    }
    
    console.log('Successfully updated all author slugs')
  } catch (error) {
    console.error('Error updating author slugs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateAuthorSlugs()