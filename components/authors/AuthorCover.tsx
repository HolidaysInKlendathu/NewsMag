// components/authors/AuthorCover.tsx
import Image from 'next/image'

interface AuthorCoverProps {
  coverImage?: string | null
}

export function AuthorCover({ coverImage }: AuthorCoverProps) {
  return (
    <div className="relative h-80 bg-gradient-to-r from-blue-500 to-purple-600">
      {coverImage && (
        <Image
          src={coverImage}
          alt=""
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
    </div>
  )
}