// utils/slug-utils.ts
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const prisma = new PrismaClient()

interface SlugOptions {
  title: string
  category: string  // This will be used for URL structure but will connect to Categories table
  publishedAt?: Date
  addTimestamp?: boolean
}

export async function generateUniqueSlug({
  title,
  category,
  publishedAt,
  addTimestamp = false
}: SlugOptions): Promise<string> {
  // Your existing validation and slug generation code stays the same
  if (!title || typeof title !== 'string') {
    throw new Error('Title is required and must be a string')
  }

  if (!category || typeof category !== 'string') {
    throw new Error('Category is required and must be a string')
  }

  try {
    const baseSlug = slugify(title.trim(), {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    if (!baseSlug) {
      throw new Error('Failed to generate base slug from title')
    }

    const slug = publishedAt 
      ? `${baseSlug}-${new Date(publishedAt).getFullYear()}`
      : baseSlug

    const categorySlug = slugify(category.trim(), {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    if (!categorySlug) {
      throw new Error('Failed to generate category slug')
    }

    let fullSlug = `${categorySlug}/${slug}`
    
    let exists = await prisma.article.findUnique({
      where: { slug: fullSlug }
    })
    
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