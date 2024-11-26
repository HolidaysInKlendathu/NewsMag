// types/article.ts
import { AuthorType, AuthorMinimal } from './author'

// Category Types
export interface Category {
  name: string
  slug: string
  description?: string | null
}

// Base Article interface with common properties
export interface ArticleBase {
  title: string
  slug: string
  excerpt: string
  coverImage: string
  publishedAt: Date
  readingTime?: number
  metaTitle?: string
  metaDescription?: string
  category: string       // Changed to match database structure
  subCategory: string   // Added to match database structure
  status: ArticleStatus // Added status
  
  // Visibility & Prominence
  featured: boolean
  spotlight: boolean
  evergreen: boolean
  
  // Monetization & Partnership
  sponsored: boolean
  sponsorName?: string
  partnerContent: boolean
  affiliate: boolean
  crowdsourced: boolean
  premium: boolean
  
  // Content Features
  hasVideo: boolean
  hasAudio: boolean
  hasGallery: boolean
  
  // Series
  series?: string
  seriesOrder?: number
}

// Article with minimal author info (for cards and lists)
export interface ArticleWithAuthor extends ArticleBase {
  id: string           // Added ID as it's needed for lists
  author?: AuthorMinimal
}

// Full article (for article page)
export interface ArticleFull extends ArticleBase {
  id: string
  content: string
  author?: AuthorType
  tags?: {
    name: string
    slug: string
  }[]
}

// Article status type
export type ArticleStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED" | "SCHEDULED"

// Markdown frontmatter type
export interface ArticleFrontmatter {
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string  // String for markdown, converted to Date when processed
  author: string      // Author ID
  status: ArticleStatus
  readingTime: number
  metaTitle: string
  metaDescription: string
  category: string
  subCategory: string
  tags: string[]
  
  // Visibility & Prominence
  featured: boolean
  spotlight: boolean
  evergreen: boolean
  
  // Monetization & Partnership
  sponsored: boolean
  sponsorName?: string
  partnerContent: boolean
  affiliate: boolean
  crowdsourced: boolean
  premium: boolean
  
  // Content Features
  hasVideo: boolean
  hasAudio: boolean
  hasGallery: boolean
  
  // Series
  series?: string
  seriesOrder?: number
}

// Helper type for BentoHero component
export interface BentoArticle extends Pick<ArticleBase, 
  'title' | 'excerpt' | 'coverImage' | 'publishedAt' | 
  'category' | 'subCategory' | 'slug' | 'featured'
> {
  id: string
}

// Helper functions
export function generateArticleUrl(article: { category: string, slug: string }): string {
  return `/articles/${article.category}/${article.slug}`
}

export function isFeaturedArticle(article: ArticleBase): boolean {
  return article.featured
}

export function isSpotlightArticle(article: ArticleBase): boolean {
  return article.spotlight
}

export interface BentoArticle {
    id: string
    title: string
    excerpt: string
    coverImage: string
    publishedAt: Date
    slug: string
    featured: boolean
    category: string    // Main category slug
    subCategory: string // Sub category slug
  }