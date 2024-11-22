// app/authors/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'
import { 
  Globe, 
  MapPin, 
  Building2, 
  Twitter, 
  Github, 
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const authors = await prisma.author.findMany({
    select: { slug: true },
  })

  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await prisma.author.findUnique({
    where: { slug: params.slug },
  })

  if (!author) return { title: 'Author Not Found' }

  return {
    title: `${author.name} - Author Profile`,
    description: author.bio || `Articles written by ${author.name}`,
    openGraph: {
      title: `${author.name} - Author Profile`,
      description: author.bio || `Articles written by ${author.name}`,
      type: 'profile',
      images: author.avatar ? [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: author.name,
        }
      ] : [],
    },
  }
}

export default async function AuthorPage({ params }: Props) {
  const author = await prisma.author.findUnique({
    where: { slug: params.slug },
    include: {
      articles: {
        where: { 
          status: ArticleStatus.PUBLISHED 
        },
        orderBy: { 
          publishedAt: 'desc' 
        },
        include: {
          categories: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  if (!author) notFound()

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return <Twitter className="w-5 h-5" />
      case 'github': return <Github className="w-5 h-5" />
      case 'linkedin': return <Linkedin className="w-5 h-5" />
      case 'facebook': return <Facebook className="w-5 h-5" />
      case 'instagram': return <Instagram className="w-5 h-5" />
      case 'youtube': return <Youtube className="w-5 h-5" />
      default: return <ExternalLink className="w-5 h-5" />
    }
  }

  return (
    <div>
      {/* Hero Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-80 relative">
          {author.coverImage ? (
            <Image
              src={author.coverImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary/10 to-primary/5" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        </div>

        {/* Author Info - Positioned over the cover image */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-32 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              {author.avatar ? (
                <div className="relative w-40 h-40 rounded-xl border-4 border-background overflow-hidden shadow-xl">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-40 h-40 bg-primary/10 rounded-xl border-4 border-background flex items-center justify-center shadow-xl">
                  <span className="text-6xl font-semibold">
                    {author.name[0].toUpperCase()}
                  </span>
                </div>
              )}

              {/* Author Details */}
              <div className="flex-grow">
                <h1 className="text-4xl font-bold flex items-center gap-3">
                  {author.name}
                  {author.verified && (
                    <span className="text-blue-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                </h1>
                
                {(author.title || author.company) && (
                  <div className="flex items-center gap-2 mt-2 text-lg text-muted-foreground">
                    <Building2 className="w-5 h-5" />
                    <span>
                      {author.title}
                      {author.company && ` at ${author.company}`}
                    </span>
                  </div>
                )}

                {/* Location and Website */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {author.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>{author.location}</span>
                    </div>
                  )}
                  
                  {author.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  )}
                </div>

                {/* Social Links */}
                {author.socialLinks && typeof author.socialLinks === 'object' && (
                  <div className="flex gap-4 mt-4">
                    {Object.entries(author.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title={platform}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {author.bio && (
              <div className="mt-6 max-w-3xl">
                <p className="text-lg">{author.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Articles by {author.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {author.articles.map((article) => (
              <article key={article.slug} className="flex flex-col">
                {article.coverImage && (
                  <Link 
                    href={`/articles/${article.categories[0]?.slug}/${article.slug}`}
                  >
                    <div className="relative w-full aspect-video mb-4">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                )}
                
                <h3 className="text-xl font-bold mb-2">
                  <Link 
                    href={`/articles/${article.categories[0]?.slug}/${article.slug}`}
                    className="hover:text-primary"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                {article.excerpt && (
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                )}
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
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
                  
                  <time 
                    dateTime={article.publishedAt.toISOString()}
                    className="text-sm text-muted-foreground"
                  >
                    {format(article.publishedAt, 'MMM d, yyyy')}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}