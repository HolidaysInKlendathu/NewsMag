// types/article.ts
import { AuthorType, AuthorMinimal } from './author'

export interface Category {
  name: string
  slug: string
  description?: string | null
}

export interface ArticleBase {
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  publishedAt: Date
  categories: Category[]
}

export interface ArticleWithAuthor extends ArticleBase {
  author?: AuthorMinimal
}

export interface ArticleFull extends ArticleBase {
  id: string
  content: string
  readingTime?: number | null
  author?: AuthorType
  tags?: {
    name: string
    slug: string
  }[]
}