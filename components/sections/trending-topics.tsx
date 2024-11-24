import { Badge } from '@/components/ui/badge'
import { Route } from 'next'
import Link from 'next/link'

export function TrendingTopics() {
  const topics = [
    { name: 'Artificial Intelligence', count: 42 },
    { name: 'Climate Change', count: 38 },
    { name: 'Space Exploration', count: 31 },
    { name: 'Digital Privacy', count: 27 },
    { name: 'Remote Work', count: 25 },
    { name: 'Mental Health', count: 23 },
    { name: 'Renewable Energy', count: 21 },
    { name: 'Cryptocurrency', count: 19 },
  ]

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold">Trending Topics</h2>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link key={topic.name} href={`/topic/${topic.name.toLowerCase()}` as Route}>
            <Badge variant="secondary" className="text-sm">
              {topic.name}
              <span className="ml-2 text-xs text-muted-foreground">
                {topic.count}
              </span>
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  )
}