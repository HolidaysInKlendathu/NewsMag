import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'
import { ShareButtons } from '@/components/share-buttons'
import { ArticleContent } from '@/components/article-content'
import { RelatedArticles } from '@/components/related-articles'
import { Comments } from '@/components/comments'
import { AuthorCard } from '@/components/author-card'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  })

  if (!article) {
    notFound()
  }

  return article
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug)

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <AuthorCard author={article.author} />
            <time className="text-muted-foreground">
              {format(article.publishedAt, 'MMMM d, yyyy')}
            </time>
          </div>
          <ShareButtons article={article} />
        </div>

        <div className="relative aspect-video mb-8">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <ArticleContent content={article.content} />

        <div className="flex flex-wrap gap-2 mt-8">
          {article.categories.map((category) => (
            <span
              key={category.id}
              className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
            >
              {category.name}
            </span>
          ))}
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      <hr className="my-16" />

      <RelatedArticles
        currentArticleId={article.id}
        categoryIds={article.categories.map((c) => c.id)}
      />

      <Comments articleId={article.id} />
    </article>
  )
}