// components/authors/AuthorProfile.tsx
import { AuthorType } from '@/types/author'
import { AuthorCover } from './AuthorCover'
import { AuthorInfo } from './AuthorInfo'

interface AuthorProfileProps {
  author: AuthorType
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div>
      <AuthorCover coverImage={author.coverImage} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32">
          <AuthorInfo 
            author={author}
            size="xl"
            showBio={true}
            showSocial={true}
            showExpertise={true}
          />
        </div>
      </div>
    </div>
  )
}