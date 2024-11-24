// components/articles/ArticleGrid.tsx
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

type Article = {
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  publishedAt: Date
  author?: {
    name: string
    avatar?: string | null
    slug: string
  } | null
  categories: {
    name: string
    slug: string
  }[]
}

type ArticleGridProps = {
  articles: Article[]
  categorySlug: string
}

export function ArticleGrid({ articles, categorySlug }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article key={article.slug} className="flex flex-col">
          {article.coverImage && (
            <Link href={`/articles/${categorySlug}/${article.slug}`}>
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
              href={`/articles/${categorySlug}/${article.slug}`}
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
              {article.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/articles/${category.slug}`}
                  className="bg-primary/10 px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              {article.author && (
                <div className="flex items-center space-x-4">
                  {article.author.avatar ? (
                    <Link href={`/authors/${article.author.slug}`}>
                      <div className="relative w-8 h-8">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          fill
                          className="object-cover rounded-full"
                          sizes="32px"
                        />
                      </div>
                    </Link>
                  ) : null}
                  <Link 
                    href={`/authors/${article.author.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.author.name}
                  </Link>
                </div>
              )}
              <time dateTime={article.publishedAt.toISOString()}>
                {format(article.publishedAt, 'MMM d, yyyy')}
              </time>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}