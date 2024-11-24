// components/articles/ArticleContent.tsx
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

type Article = {
  title: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  publishedAt: Date
  readingTime?: number | null
  author?: {
    name: string
    avatar?: string | null
    bio?: string | null
    slug: string
  } | null
  categories: {
    name: string
    slug: string
  }[]
  tags: {
    name: string
    slug: string
  }[]
}

type ArticleContentProps = {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        {article.author && (
          <div className="flex items-center space-x-4">
            <Link href={`/authors/${article.author.slug}`}>
              {article.author.avatar ? (
                <div className="relative w-10 h-10">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover rounded-full"
                    sizes="40px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {article.author.name[0].toUpperCase()}
                  </span>
                </div>
              )}
            </Link>
            <div>
              <Link 
                href={`/authors/${article.author.slug}`}
                className="font-medium hover:text-primary transition-colors"
              >
                {article.author.name}
              </Link>
              {article.author.bio && (
                <p className="text-sm text-muted-foreground">{article.author.bio}</p>
              )}
            </div>
          </div>
        )}
        
        {article.coverImage && (
          <div className="relative w-full aspect-video mt-6">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}
      </header>
      
      <div className="prose lg:prose-xl dark:prose-invert mx-auto">
        {article.content}
      </div>

      <footer className="mt-8">
        <div className="flex flex-wrap gap-2">
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
      </footer>
    </article>
  )
}