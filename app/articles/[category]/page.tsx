// app/articles/[category]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'
import { format } from 'date-fns'

type Props = {
  params: { category: string }
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })

  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.category },
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

export default async function CategoryPage({ params }: Props) {
  const category = await prisma.category.findUnique({
    where: { slug: params.category },
    include: {
      articles: {
        where: { 
          status: ArticleStatus.PUBLISHED 
        },
        orderBy: { publishedAt: 'desc' },
        include: {
          author: {
            select: {
              name: true,
              avatar: true,
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

  if (!category) notFound()

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.articles.map((article) => (
          <article key={article.slug} className="flex flex-col">
            {article.coverImage && (
              <Link href={`/articles/${category.slug}/${article.slug}`}>
                <div className="relative w-full aspect-video mb-4">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
            )}
            
            <h2 className="text-xl font-bold mb-2">
              <Link 
                href={`/articles/${category.slug}/${article.slug}`}
                className="hover:text-primary"
              >
                {article.title}
              </Link>
            </h2>
            
            {article.excerpt && (
              <p className="text-muted-foreground mb-4">{article.excerpt}</p>
            )}
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/articles/${cat.slug}`}
                    className="bg-primary/10 px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  {article.author?.avatar ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name || ''}
                        fill
                        className="object-cover rounded-full"
                        sizes="32px"
                      />
                    </div>
                  ) : null}
                  <span>{article.author?.name}</span>
                </div>
                <time dateTime={article.publishedAt.toISOString()}>
                  {format(article.publishedAt, 'MMM d, yyyy')}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}