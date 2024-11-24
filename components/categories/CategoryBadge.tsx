// components/categories/CategoryBadge.tsx
import Link from 'next/link'
import type { Category } from '@/types/article'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md' | 'lg'
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  return (
    <Link
      href={`/articles/${category.slug}`}
      className={`${sizeClasses[size]} bg-primary/10 rounded-full hover:bg-primary/20 transition-colors inline-block`}
    >
      {category.name}
    </Link>
  )
}