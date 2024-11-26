// utils/article-helpers.ts
import { ArticleBase, ArticleWithAuthor, ArticleFull } from '@/types/article'

// Helper for basic article URL generation
export function getArticleUrl(article: ArticleBase): string {
  return `/articles/${article.category}/${article.slug}`
}

// Format date for display
export function formatArticleDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Check if article is recent (within last 7 days)
export function isRecentArticle(publishedAt: Date): boolean {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - publishedAt.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}

// Get reading time in minutes
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Filter featured articles
export function getFeaturedArticles(articles: ArticleWithAuthor[]): ArticleWithAuthor[] {
  return articles
    .filter(article => article.featured)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

// Filter spotlight articles
export function getSpotlightArticles(articles: ArticleWithAuthor[]): ArticleWithAuthor[] {
  return articles
    .filter(article => article.spotlight)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

// Get related articles by category
export function getRelatedArticles(
  article: ArticleFull,
  allArticles: ArticleWithAuthor[],
  limit: number = 3
): ArticleWithAuthor[] {
  return allArticles
    .filter(a => 
      a.slug !== article.slug && // Not the same article
      a.category === article.category // Same category
    )
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit)
}

// Get related articles by subcategory
export function getRelatedArticlesBySubCategory(
  article: ArticleFull,
  allArticles: ArticleWithAuthor[],
  limit: number = 3
): ArticleWithAuthor[] {
  return allArticles
    .filter(a => 
      a.slug !== article.slug && // Not the same article
      a.subCategory === article.subCategory // Same subcategory
    )
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit)
}

// Check if article is premium content
export function isPremiumContent(article: ArticleBase): boolean {
  return article.premium || false
}

// Get article type labels
export function getArticleTypeLabels(article: ArticleBase): string[] {
  const labels: string[] = []
  
  if (article.premium) labels.push('Premium')
  if (article.sponsored) labels.push('Sponsored')
  if (article.partnerContent) labels.push('Partner Content')
  if (article.crowdsourced) labels.push('Community Contribution')
  if (article.evergreen) labels.push('Evergreen')
  
  return labels
}

// Get article category label
export function getArticleCategoryLabel(article: ArticleBase): string {
  return `${article.category} › ${article.subCategory}`.replace(/-/g, ' ')
}

// Format article URL for SEO
export function getSeoFriendlyUrl(article: ArticleBase): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  return `${baseUrl}/articles/${article.category}/${article.slug}`
}

// Get article breadcrumbs
export function getArticleBreadcrumbs(article: ArticleBase) {
  return [
    { label: 'Home', href: '/' },
    { label: article.category.replace(/-/g, ' '), href: `/categories/${article.category}` },
    { label: article.subCategory.replace(/-/g, ' '), href: `/categories/${article.category}/${article.subCategory}` },
    { label: article.title, href: getArticleUrl(article) }
  ]
}