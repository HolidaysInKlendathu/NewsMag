// types/author.ts
import { Prisma } from '@prisma/client'

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

export interface AuthorSocialLinks {
  twitter?: string
  github?: string
  linkedin?: string
  [key: string]: string | undefined
}

export interface AuthorMinimal {
  name: string
  slug: string
  avatar: string | null
  bio: string | null
}

export interface AuthorType extends AuthorMinimal {
  id: string
  email: string | null
  coverImage: string | null
  website: string | null
  location: string | null
  expertise: string | null
  socialLinks: JsonValue
  title: string | null
  company: string | null
  featured: boolean
  verified: boolean
  articles: Array<{
    id: string
    title: string
    slug: string
    coverImage: string | null
    excerpt: string | null
    publishedAt: Date
    categories: Array<{
      name: string
      slug: string
    }>
  }>
}