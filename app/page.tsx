// app/page.tsx
import prisma from '@/lib/db'
import { BentoHero } from '@/components/sections/bento-hero'
import { FeaturedArticles } from '@/components/sections/featured-articles'
import { LatestNews } from '@/components/sections/latest-news'
import { CategorySection } from '@/components/sections/category-section'
import { TrendingTopics } from '@/components/sections/trending-topics'
import { Newsletter } from '@/components/sections/newsletter'
import type { BentoArticle } from '@/types/article'

async function getLatestArticles(): Promise<BentoArticle[]> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED'
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        slug: true,
        featured: true,
        categories: {
          select: {
            slug: true,
            parentId: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 5
    })

    return articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      publishedAt: article.publishedAt,
      slug: article.slug,
      featured: article.featured,
      category: article.categories.find(c => !c.parentId)?.slug || '',
      subCategory: article.categories.find(c => c.parentId)?.slug || ''
    }))

  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function HomePage() {
  const latestArticles = await getLatestArticles()

  return (
    <div className="container mx-auto px-4 space-y-16 py-8">
      <BentoHero articles={latestArticles} />
      <FeaturedArticles />
      <LatestNews />
      <CategorySection />
      <TrendingTopics />
      <Newsletter />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'