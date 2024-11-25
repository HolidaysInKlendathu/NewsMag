'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"

interface Article {
  title: string
  excerpt: string
  coverImage: string
  publishedAt: Date
  author: string
  status: string
  readingTime: number
  metaTitle: string
  metaDescription: string
  categories: string[]
  featured: boolean
  slug: string
}

interface BentoHeroProps {
  articles: Article[]
}

export const BentoHero = ({ articles }: BentoHeroProps) => {
  // Filter featured articles and sort by publishedAt date
  const featuredArticles = articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5) // Only take the first 5 featured articles for the bento grid

  if (featuredArticles.length === 0) {
    return null // Or return a placeholder/loading state
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 max-w-7xl mx-auto h-[800px] md:h-[600px]">
      {/* Main Featured Article */}
      <Link 
        href={`/articles/${featuredArticles[0].slug}`}
        className="col-span-1 md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent/20 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <Image
          src={featuredArticles[0].coverImage}
          alt={featuredArticles[0].title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-200">
          <div className="space-y-2">
            <span className="text-sm font-medium text-white">
              {format(new Date(featuredArticles[0].publishedAt), 'MMM dd, yyyy')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white/90">
              {featuredArticles[0].title}
            </h2>
            <p className="text-white/80 line-clamp-2 text-sm md:text-base">
              {featuredArticles[0].excerpt}
            </p>
          </div>
        </div>
      </Link>

      {/* Secondary Articles */}
      {featuredArticles.slice(1, 5).map((article, index) => (
        <Link
          key={article.slug}
          href={`/articles/${article.slug}`}
          className="col-span-1 row-span-1 relative group rounded-3xl overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          />
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="space-y-1">
              <span className="text-xs font-medium text-white/80">
                {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-white/90 line-clamp-2">
                {article.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}