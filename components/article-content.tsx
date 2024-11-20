'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import { ComponentProps } from 'react'

type ArticleContentProps = {
  content: MDXRemoteSerializeResult
}

type ImageProps = ComponentProps<'img'> & {
  src?: string
  alt?: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="prose lg:prose-xl dark:prose-invert mx-auto">
      <MDXRemote 
        {...content}
        components={{
          img: ({ src, alt, ...props }: ImageProps) => {
            if (!src) return null
            
            return (
              <div className="relative w-full h-[400px] my-8">
                <Image
                  src={src}
                  alt={alt || 'Article image'}
                  fill
                  className="object-cover rounded-lg"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )
          },
        }}
      />
    </article>
  )
}