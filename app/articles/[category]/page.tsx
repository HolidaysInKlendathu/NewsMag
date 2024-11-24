import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'
import { ArticleGrid } from '../../../components/articles/ArticleGrid'

type Params = { category: string }
type SearchParams = { [key: string]: string | string[] | undefined }

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { status: ArticleStatus.PUBLISHED },
        orderBy: { publishedAt: 'desc' },
        include: {
          author: {
            select: {
              name: true,
              avatar: true,
              slug: true,
            },
          },
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
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })

  return categories.map(({ slug }) => ({
    category: slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const resolvedParams = await params
  const category = await getCategory(resolvedParams.category)

  if (!category) return {}

  return {
    title: `${category.name} Articles`,
    description: category.description ?? `Latest articles in ${category.name}`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const resolvedParams = await params
  const category = await getCategory(resolvedParams.category)

  if (!category) notFound()

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
      </header>

      <ArticleGrid 
        articles={category.articles}
        categorySlug={category.slug}
      />
    </div>
  )
}