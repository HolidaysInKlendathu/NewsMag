// utils/url-utils.ts
export function getArticleUrl(article: { category: string; slug: string }): string {
    return `/articles/${article.category}/${article.slug}`
  }
  
  // Optional: Add validation
  export function validateArticleUrl(url: string): boolean {
    const pattern = /^\/articles\/[\w-]+\/[\w-]+-\d{4}$/
    return pattern.test(url)
  }