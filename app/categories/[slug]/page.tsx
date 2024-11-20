import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  })

  if (!category) return {}

  return {
    title: `${category.name} News`,
    description: category.description ?? `Latest articles in ${category.name}`,
    openGraph: {
      title: `${category.name} News`,
      description: category.description ?? `Latest articles in ${category.name}`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      articles: {
        where: { 
          status: ArticleStatus.PUBLISHED 
        },
        orderBy: { publishedAt: 'desc' },
        include: {
          author: true,
          categories: true,
        },
      },
    },
  })

  if (!category) notFound()

  return (
    <div>
      {/* Category content */}
    </div>
  )
}