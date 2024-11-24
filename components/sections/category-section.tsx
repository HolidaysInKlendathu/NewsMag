import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Newspaper, Briefcase, Globe, Microscope, Camera, Heart } from 'lucide-react'
import { Route } from 'next'

export function CategorySection() {
  const categories = [
    { name: 'Politics', icon: Newspaper, count: 128 },
    { name: 'Business', icon: Briefcase, count: 85 },
    { name: 'World', icon: Globe, count: 243 },
    { name: 'Science', icon: Microscope, count: 97 },
    { name: 'Arts', icon: Camera, count: 65 },
    { name: 'Health', icon: Heart, count: 112 },
  ]

  return (
    <section className="space-y-8">
      <h2 className="text-4xl">Categories</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link key={category.name} href={`/category/${category.name.toLowerCase()}` as Route}>
              <Card className="flex items-center gap-4 p-6 transition-colors hover:bg-muted/50">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} articles
                  </p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

