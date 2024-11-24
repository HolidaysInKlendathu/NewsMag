// components/authors/AuthorInfo.tsx
import Link from 'next/link'
import { AuthorAvatar } from './AuthorAvatar'
import { AuthorType, AuthorMinimal } from '@/types/author'
import { Badge } from '@/components/ui/badge'
import { 
  Building2,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Github,
  Linkedin,
  Globe,
  Mail,
  CheckCircle2
} from 'lucide-react'

interface AuthorInfoProps {
  author: AuthorType | AuthorMinimal
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showBio?: boolean
  showSocial?: boolean
  showExpertise?: boolean
}

function isFullAuthor(author: AuthorType | AuthorMinimal): author is AuthorType {
  return (author as AuthorType).socialLinks !== undefined
}

export function AuthorInfo({ 
  author, 
  size = 'sm',
  showBio = false,
  showSocial = false,
  showExpertise = false 
}: AuthorInfoProps) {
  const isComplete = isFullAuthor(author)

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full">
      <div className="flex items-start gap-4">
        <AuthorAvatar 
          name={author.name}
          avatar={author.avatar}
          slug={author.slug}
          size={size}
        />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <Link 
              href={`/authors/${author.slug}`}
              className="text-xl font-bold hover:text-primary dark:font-primary transition-colors"
            >
              {author.name}
            </Link>
            {isComplete && author.verified && (
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
            )}
          </div>

          {isComplete && author.title && (
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Building2 className="w-4 h-4" />
              <span>{author.title}</span>
              {author.company && (
                <>
                  <span>at</span>
                  <span className="font-medium">{author.company}</span>
                </>
              )}
            </div>
          )}

          {isComplete && author.location && (
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{author.location}</span>
            </div>
          )}

          {showBio && author.bio && (
            <p className="text-muted-foreground mt-4">{author.bio}</p>
          )}

          {isComplete && showExpertise && author.expertise && (
            <div className="flex flex-wrap gap-2 mt-4">
              {author.expertise.split(',').map(skill => (
                <Badge key={skill} variant="secondary">
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          )}

          {isComplete && showSocial && author.socialLinks && (
            <div className="flex gap-3 mt-4">
              {Object.entries(author.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                  {platform === 'github' && <Github className="w-5 h-5" />}
                  {platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {!['twitter', 'github', 'linkedin'].includes(platform) && 
                    <LinkIcon className="w-5 h-5" />
                  }
                </a>
              ))}
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}