'use client'

import { Facebook, Mail, Share2, Twitter } from 'lucide-react'
import { Button } from './ui/button'

interface ShareButtonsProps {
  article: {
    title: string
    slug: string
  }
}

export function ShareButtons({ article }: ShareButtonsProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.slug}`
  const shareText = `Check out "${article.title}"`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(
      shareText
    )}&body=${encodeURIComponent(shareUrl)}`,
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.email, '_blank')}
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: article.title,
              url: shareUrl,
            })
          }
        }}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}