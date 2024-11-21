// app/mdx-components.tsx
import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: function CustomImage({ src, alt }) {
      if (!src) return null
      
      return (
        <div className="relative w-full aspect-video my-8">
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )
    },
    ...components,
  }
}