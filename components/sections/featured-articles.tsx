import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Route } from 'next'

export function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: 'The Rise of AI in Modern Healthcare',
      excerpt: 'How artificial intelligence is transforming medical diagnosis and treatment',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
      category: 'Technology',
      date: 'Mar 15, 2024',
    },
    {
      id: 2,
      title: 'Sustainable Cities of Tomorrow',
      excerpt: 'Innovative urban planning solutions for a greener future',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      category: 'Environment',
      date: 'Mar 14, 2024',
    },
    {
      id: 3,
      title: 'The Future of Work',
      excerpt: 'Remote work and the changing landscape of employment',
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
      category: 'Business',
      date: 'Mar 13, 2024',
    },
  ]

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">Featured Articles</h2>
        <Link href={"/articles" as Route} className="text-primary hover:underline">
          View All
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm text-primary">{article.category}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
              <p className="text-muted-foreground">{article.excerpt}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link
                href={`/articles/${article.id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}