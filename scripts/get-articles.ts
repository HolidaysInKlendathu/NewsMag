// utils/get-articles.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Article {
  title: string
  excerpt: string
  coverImage: string
  publishedAt: Date
  author: string
  status: string
  readingTime: number
  metaTitle: string
  metaDescription: string
  categories: string[]
  featured: boolean
  slug: string
  content: string
}

export async function getArticles(): Promise<Article[]> {
  const articlesDirectory = path.join(process.cwd(), 'app/content/articles')
  const filenames = fs.readdirSync(articlesDirectory)

  const articles = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(articlesDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        ...data,
        content,
        slug: data.slug || filename.replace('.md', ''),
        publishedAt: new Date(data.publishedAt)
      } as Article
    })
    .filter(article => article.status === "PUBLISHED")

  return articles
}