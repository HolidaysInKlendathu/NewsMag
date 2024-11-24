// lib/mdx.ts
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

export async function processMDX(content: string) {
  const { content: processedContent, frontmatter } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypePrism,
        ],
        format: 'mdx',
      },
    },
  })

  return {
    content: processedContent,
    frontmatter,
  }
}