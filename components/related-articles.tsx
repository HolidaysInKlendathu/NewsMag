import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@prisma/client'

type RelatedArticlesProps = {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.slug}`}
            className="group"
          >
            <div className="relative h-48 mb-4">
              {article.coverImage && (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                />
              )}
            </div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}