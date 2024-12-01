// lib/markdown.ts
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { getArticleContent } from './minio'

export async function processMarkdown(markdownUrl: string) {
  const content = await getArticleContent(markdownUrl)
  const { data, content: markdownContent } = matter(content)

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