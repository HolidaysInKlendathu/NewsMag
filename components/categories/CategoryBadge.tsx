// components/categories/CategoryBadge.tsx
import Link from 'next/link'
import type { Category } from '@/types/article'

interface CategoryBadgeProps {
  category: Category
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link 
      ref={`/categories/${category.slug}`}
      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors" href={'/'}    >
      {category.name}
    </Link>
  )
}