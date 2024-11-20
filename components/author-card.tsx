import Image from 'next/image'
import { User } from '@prisma/client'

type AuthorCardProps = {
  author: User
}

export default function AuthorCard({ author }: AuthorCardProps) {
  // Early return if no author data
  if (!author) return null

  // Get initial for avatar fallback - handle null name case
  const getInitial = () => {
    if (!author.name) return '?'
    return author.name.charAt(0).toUpperCase()
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
      <div className="relative h-16 w-16">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name || 'Author'}
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <div className="h-full w-full bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold">
              {getInitial()}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold">{author.name || 'Anonymous'}</h3>
        {author.bio && <p className="text-sm text-muted-foreground">{author.bio}</p>}
      </div>
    </div>
  )
}