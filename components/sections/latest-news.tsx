import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export function LatestNews() {
  const news = [
    {
      id: 1,
      title: 'Breaking: Major Scientific Discovery',
      time: '2 hours ago',
      category: 'Science',
    },
    {
      id: 2,
      title: 'Global Markets React to Economic Changes',
      time: '3 hours ago',
      category: 'Finance',
    },
    {
      id: 3,
      title: 'New Technology Breakthrough Announced',
      time: '4 hours ago',
      category: 'Tech',
    },
    {
      id: 4,
      title: 'Sports Update: Championship Results',
      time: '5 hours ago',
      category: 'Sports',
    },
  ]

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold">Latest News</h2>
      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id} className="p-4 hover:bg-muted/50">
            <Link href={`/articles/${item.id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <span className="mb-1 text-sm font-medium text-primary">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="text-sm">{item.time}</span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}