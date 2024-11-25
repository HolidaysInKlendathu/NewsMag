// types/article.ts
import { AuthorType, AuthorMinimal } from './author'

// Base Category type (for components)
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
  categories: Category[]
  readingTime?: number
  metaTitle?: string
  metaDescription?: string
  
  // New flags
  featured: boolean
  spotlight: boolean
  evergreen: boolean
  sponsored: boolean
  sponsorName?: string
  partnerContent: boolean
  affiliate: boolean
  crowdsourced: boolean
  
  // Content features
  hasVideo: boolean
  hasAudio: boolean
  hasGallery: boolean
  premium: boolean
  
  // Series
  series?: string
  seriesOrder?: number
}

// Article with minimal author info (for cards and lists)
export interface ArticleWithAuthor extends ArticleBase {
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
  publishedAt: string
  author: string
  status: ArticleStatus
  readingTime: number
  metaTitle: string
  metaDescription: string
  category: string
  subCategory: string
  tags: string[]
  
  // Flags
  featured: boolean
  spotlight: boolean
  evergreen: boolean
  sponsored: boolean
  sponsorName?: string
  partnerContent: boolean
  affiliate: boolean
  crowdsourced: boolean
  
  // Content features
  hasVideo: boolean
  hasAudio: boolean
  hasGallery: boolean
  premium: boolean
  
  // Series
  series?: string
  seriesOrder?: number
}