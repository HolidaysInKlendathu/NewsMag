// components/authors/AuthorAvatar.tsx
import Image from 'next/image'
import Link from 'next/link'

interface AuthorAvatarProps {
  name: string
  avatar?: string | null
  slug: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLinked?: boolean
  className?: string
}

export function AuthorAvatar({ 
  name, 
  avatar, 
  slug, 
  size = 'sm',
  isLinked = true,
  className = ''
}: AuthorAvatarProps) {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-40 h-40'
  }

  const content = (
    <>
      {avatar ? (
        <div className={`relative ${dimensions[size]} ${className}`}>
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover rounded-lg shadow-lg border-4 border-white"
            sizes={`${parseInt(dimensions[size].split('-')[1]) * 4}px`}
          />
        </div>
      ) : (
        <div className={`${dimensions[size]} ${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg border-4 border-white shadow-lg flex items-center justify-center`}>
          <span className={`font-bold text-white ${size === 'xl' ? 'text-6xl' : 'text-lg'}`}>
            {name[0]?.toUpperCase() || '?'}
          </span>
        </div>
      )}
    </>
  )

  if (!isLinked) return content

  return (
    <Link 
      href={`/authors/${slug}`}
      className="transition-transform hover:scale-105"
    >
      {content}
    </Link>
  )
}