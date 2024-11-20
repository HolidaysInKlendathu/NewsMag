// lib/markdown.ts
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

export async function processMarkdown(content: string) {
  // Parse frontmatter
  const { data, content: markdownContent } = matter(content)
  
  // Serialize the content
  const mdxSource = await serialize(markdownContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeHighlight, { ignoreMissing: true }],
      ],
    },
    scope: data,
  })

  return {
    frontmatter: data,
    content: mdxSource,
  }
}