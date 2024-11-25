// utils/slug-utils.ts
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const prisma = new PrismaClient()

interface SlugOptions {
  title: string
  category: string
  publishedAt?: Date
  addTimestamp?: boolean
}

export async function generateUniqueSlug({
  title,
  category,
  publishedAt,
  addTimestamp = false
}: SlugOptions): Promise<string> {
  // Validate inputs
  if (!title || typeof title !== 'string') {
    throw new Error('Title is required and must be a string')
  }

  if (!category || typeof category !== 'string') {
    throw new Error('Category is required and must be a string')
  }

  try {
    // Basic slug generation with error handling
    const baseSlug = slugify(title.trim(), {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    // Validate generated base slug
    if (!baseSlug) {
      throw new Error('Failed to generate base slug from title')
    }

    // Add year if publication date is provided
    const slug = publishedAt 
      ? `${baseSlug}-${new Date(publishedAt).getFullYear()}`
      : baseSlug

    // Create the full slug with category
    const categorySlug = slugify(category.trim(), {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    // Validate category slug
    if (!categorySlug) {
      throw new Error('Failed to generate category slug')
    }

    let fullSlug = `${categorySlug}/${slug}`
    
    // Check if slug exists
    let exists = await prisma.article.findUnique({
      where: { slug: fullSlug }
    })
    
    // If exists, try adding timestamp or increment
    if (exists) {
      if (addTimestamp) {
        fullSlug = `${categorySlug}/${slug}-${Date.now()}`
      } else {
        let counter = 1
        while (exists) {
          fullSlug = `${categorySlug}/${slug}-${counter}`
          exists = await prisma.article.findUnique({
            where: { slug: fullSlug }
          })
          counter++
        }
      }
    }

    return fullSlug
  } catch (error) {
    console.error('Error generating slug:', error)
    throw error
  }
}