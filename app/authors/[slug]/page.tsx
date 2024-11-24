// app/authors/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'
import { AuthorProfile } from '@/components/authors/AuthorProfile'
import { ArticleGrid } from '@/components/articles/ArticleGrid'
import type { AuthorType } from '@/types/author'

type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

async function getAuthor(slug: string) {
  const author = await prisma.author.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { status: ArticleStatus.PUBLISHED },
        orderBy: { publishedAt: 'desc' },
        include: {
          categories: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  if (!author) return null

  // Convert Prisma author to AuthorType
  const typedAuthor: AuthorType = {
    ...author,
    socialLinks: author.socialLinks as AuthorType['socialLinks'],
    articles: author.articles.map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      coverImage: article.coverImage,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      categories: article.categories
    }))
  }

  return typedAuthor
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const resolvedParams = await params
  const author = await getAuthor(resolvedParams.slug)

  if (!author) return {}

  return {
    title: `${author.name} - Author Profile`,
    description: author.bio ?? `Articles by ${author.name}`,
  }
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const resolvedParams = await params
  const author = await getAuthor(resolvedParams.slug)

  if (!author) notFound()

  return (
    <div className="container mx-auto py-8">
      <AuthorProfile author={author} />
      <div className="mt-12">
        <div className="container mx-auto px-4 py-8">
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Articles by {author.name}
            </h2>
            <ArticleGrid 
              articles={author.articles}
              categorySlug={author.articles[0]?.categories[0]?.slug || ''}
            />
          </section>
        </div>
      </div>
    </div>
  )
}