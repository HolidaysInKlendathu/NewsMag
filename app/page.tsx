// app/page.tsx
import prisma from '@/lib/db'
import { BentoHero } from '@/components/sections/bento-hero'
import { FeaturedArticles } from '@/components/sections/featured-articles'
import { LatestNews } from '@/components/sections/latest-news'
import { CategorySection } from '@/components/sections/category-section'
import { TrendingTopics } from '@/components/sections/trending-topics'
import { Newsletter } from '@/components/sections/newsletter'
import type { BentoArticle } from '@/types/article'
import { ErrorBoundary } from '@/components/error-boundary'
import { Suspense } from 'react'

const debug = true; // Toggle for debugging

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function HomePage() {
  try {
    console.log('HomePage: Starting to render');
    const articles = await getLatestArticles();
    
    if (!articles || articles.length === 0) {
      console.error('No articles returned from getLatestArticles');
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">No articles available</p>
        </div>
      );
    }

    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 space-y-16 py-8">
          <Suspense fallback={
            <div className="w-full h-[400px] animate-pulse bg-muted rounded-lg" />
          }>
            <BentoHero articles={articles} />
          </Suspense>
          <FeaturedArticles />
          <LatestNews />
          <CategorySection />
          <TrendingTopics />
          <Newsletter />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    return <div>Error loading page content</div>;
  }
}

async function getLatestArticles(): Promise<BentoArticle[]> {
  console.log('Starting getLatestArticles function');
  
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
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
    });

    console.log('Raw articles from database:', articles);

    if (!articles?.length) {
      console.log('No articles found in database');
      return [];
    }

    return articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      imageUrl: article.coverImage,
      coverImage: article.coverImage,
      publishedAt: new Date(article.publishedAt).toISOString(),
      slug: article.slug,
      featured: article.featured,
      category: article.categories[0]?.slug ?? '',
      subCategory: article.categories[1]?.slug ?? '',
      categories: article.categories
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}