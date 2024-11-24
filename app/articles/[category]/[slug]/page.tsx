// app/articles/[category]/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'
import { ArticleContent } from '@/components/articles/ArticleContent'

type Params = { category: string; slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

async function getArticle(categorySlug: string, articleSlug: string) {
  return prisma.article.findFirst({
    where: { 
      slug: articleSlug,
      status: ArticleStatus.PUBLISHED,
      categories: {
        some: {
          slug: categorySlug
        }
      }
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
          bio: true,
          slug: true,
          title: true,
          company: true,
          location: true,
          website: true,
          email: true,
          expertise: true,
          verified: true,
          socialLinks: true,
        },
      },
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: ArticleStatus.PUBLISHED },
    select: {
      slug: true,
      categories: {
        select: { slug: true },
      },
    },
  })

  return articles.flatMap((article) => 
    article.categories.map((category) => ({
      category: category.slug,
      slug: article.slug,
    }))
  )
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.category, resolvedParams.slug)

  if (!article) {
    return { title: 'Article Not Found' }
  }

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    authors: article.author?.name ? [{ name: article.author.name }] : [],
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: article.author?.name ? [article.author.name] : [],
      images: article.coverImage ? [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : [],
    },
  }
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.category, resolvedParams.slug)

  if (!article) notFound()

  return (
    <div className="container mx-auto py-8">
      <ArticleContent article={article} />
    </div>
  )
}