// components/articles/ArticleCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { AuthorInfo } from '@/components/authors/AuthorInfo'
import { CategoryBadge } from '@/components/categories/CategoryBadge'
import type { ArticleWithAuthor } from '@/types/article'

interface ArticleCardProps {
  article: ArticleWithAuthor
  categorySlug?: string // Made optional since we now have category in article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { 
    title, 
    slug, 
    excerpt, 
    coverImage, 
    publishedAt, 
    author, 
    category,
    subCategory 
  } = article

  const categoryInfo = {
    name: category.replace(/-/g, ' '), // Convert slug to display name
    slug: category,
    description: null
  }

  const subCategoryInfo = {
    name: subCategory.replace(/-/g, ' '),
    slug: subCategory,
    description: null
  }

  return (
    <article className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      {coverImage && (
        <Link href={`/articles/${category}/${slug}`}>
          <div className="relative w-full aspect-video rounded-t-xl">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover rounded-t-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      
      <div className="flex flex-col flex-grow p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link 
            href={`/articles/${category}/${slug}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </h2>
        
        {excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
        )}
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <CategoryBadge category={categoryInfo} />
            <CategoryBadge category={subCategoryInfo} />
          </div>
          
          <div className="flex items-center justify-between text-sm pt-4 border-t">
            {author && (
              <AuthorInfo 
                author={author} 
                size="sm"
              />
            )}
            <time 
              dateTime={publishedAt.toISOString()}
              className="text-muted-foreground"
            >
              {format(publishedAt, 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </div>
    </article>
  )
}