import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedArticles } from '@/components/sections/featured-articles'
import { LatestNews } from '@/components/sections/latest-news'
import { CategorySection } from '@/components/sections/category-section'
import { TrendingTopics } from '@/components/sections/trending-topics'
import { Newsletter } from '@/components/sections/newsletter'

export default async function Home() {
  return (
    <div className="container mx-auto px-4 space-y-16 py-8">
      <HeroSection />
      <FeaturedArticles />
      <LatestNews />
      <CategorySection />
      <TrendingTopics />
      <Newsletter />
    </div>
  )
}