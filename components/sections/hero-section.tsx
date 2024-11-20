import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden rounded-xl">
      <Image
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
        alt="Hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm">
          Featured
        </span>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          The Future of Journalism in the Digital Age
        </h1>
        <p className="mb-6 max-w-2xl text-lg text-gray-200">
          Exploring how technology and social media are reshaping the way we consume and create news
        </p>
        <Button asChild size="lg">
          <Link href="/articles/future-of-journalism">Read More</Link>
        </Button>
      </div>
    </section>
  )
}