import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

// Create a new Prisma instance specifically for sitemap
const prismaForSitemap = new PrismaClient()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://riskbagel.com"

  // Get all published articles
  const articles = await prismaForSitemap.article.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      slug: true,
      publishedAt: true,
    },
  })

  // Get all categories
  const categories = await prismaForSitemap.category.findMany({
    select: {
      slug: true,
    },
  })

  // Get all tags
  const tags = await prismaForSitemap.tag.findMany({
    select: {
      slug: true,
    },
  })

  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: `${baseUrl}/tags/${tag.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
  ] as MetadataRoute.Sitemap
}