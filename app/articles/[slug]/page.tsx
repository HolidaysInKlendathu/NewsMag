import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { prisma } from '@/lib/prisma'
import { ArticleStatus } from '@prisma/client'

export async function generateStaticParams() {
 const articles = await prisma.article.findMany({
   where: {
     status: ArticleStatus.PUBLISHED
   },
   select: {
     slug: true,
   },
 })

 return articles.map((article) => ({
   slug: article.slug,
 }))
}

export async function generateMetadata({
 params,
}: {
 params: { slug: string }
}): Promise<Metadata> {
 try {
   if (!params?.slug) {
     return {
       title: 'Article Not Found',
     }
   }

   const article = await prisma.article.findFirst({
     where: { 
       slug: params.slug as string,
       status: ArticleStatus.PUBLISHED,
     },
     select: {
       title: true,
       excerpt: true,
       coverImage: true,
       publishedAt: true,
       updatedAt: true,
       author: {
         select: {
           name: true,
           avatar: true,
         },
       },
       categories: {
         select: {
           name: true,
         },
       },
       tags: {
         select: {
           name: true,
         },
       },
     },
   })

   if (!article) {
     return {
       title: 'Article Not Found',
     }
   }

   return {
     title: article.title,
     description: article.excerpt,
     authors: article.author?.name ? [{ name: article.author.name }] : [],
     openGraph: {
       title: article.title,
       description: article.excerpt,
       type: 'article',
       publishedTime: article.publishedAt.toISOString(),
       modifiedTime: article.updatedAt.toISOString(),
       authors: article.author?.name ? [article.author.name] : [],
       images: article.coverImage ? [
         {
           url: article.coverImage,
           width: 1200,
           height: 630,
           alt: article.title,
         }
       ] : [],
     },
   }
 } catch (error) {
   console.error('Error generating metadata:', error)
   return {
     title: 'Error Loading Article',
   }
 }
}

export default async function ArticlePage({
 params,
}: {
 params: { slug: string }
}) {
 try {
   if (!params?.slug) {
     notFound()
   }

   const article = await prisma.article.findFirst({
     where: { 
       slug: params.slug as string,
       status: ArticleStatus.PUBLISHED,
     },
     select: {
       title: true,
       content: true,
       excerpt: true,
       coverImage: true,
       publishedAt: true,
       readingTime: true,
       author: {
         select: {
           name: true,
           avatar: true,
           bio: true,
         },
       },
       categories: {
         select: {
           name: true,
           slug: true,
         },
       },
       tags: {
         select: {
           name: true,
           slug: true,
         },
       },
     },
   })

   if (!article) {
     notFound()
   }

   const mdxSource = await serialize(article.content, {
     mdxOptions: {
       remarkPlugins: [remarkGfm],
       rehypePlugins: [
         rehypeSlug,
         [rehypeHighlight, { ignoreMissing: true }],
       ],
     },
   })

   return (
     <article className="container mx-auto py-8">
       <header className="mb-8">
         <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
         {article.author && (
           <div className="flex items-center space-x-4">
             {article.author.avatar ? (
               <div className="relative w-10 h-10">
                 <Image
                   src={article.author.avatar}
                   alt={article.author.name || 'Author'}
                   fill
                   className="object-cover rounded-full"
                   sizes="40px"
                   priority
                 />
               </div>
             ) : (
               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                 <span className="text-lg font-semibold">
                   {article.author.name?.[0]?.toUpperCase() || '?'}
                 </span>
               </div>
             )}
             <div>
               <p className="font-medium">{article.author.name}</p>
               {article.author.bio && (
                 <p className="text-sm text-muted-foreground">{article.author.bio}</p>
               )}
             </div>
           </div>
         )}
         
         {article.coverImage && (
           <div className="relative w-full aspect-video mt-6">
             <Image
               src={article.coverImage}
               alt={article.title}
               fill
               className="object-cover rounded-lg"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
               priority
             />
           </div>
         )}
       </header>
       
       <div className="prose lg:prose-xl dark:prose-invert mx-auto">
         <MDXRemote 
           {...mdxSource}
           components={{
             img: ({ src, alt, ...props }) => (
               <div className="relative w-full aspect-video my-8">
                 <Image
                   src={src || ''}
                   alt={alt || ''}
                   fill
                   className="object-cover rounded-lg"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                 />
               </div>
             ),
           }}
         />
       </div>

       <footer className="mt-8">
         <div className="flex flex-wrap gap-2">
           {article.categories.map((category) => (
             <span key={category.slug} className="bg-primary/10 px-3 py-1 rounded-full text-sm">
               {category.name}
             </span>
           ))}
         </div>
       </footer>
     </article>
   )
 } catch (error) {
   console.error('Error loading article:', error)
   notFound()
 }
}