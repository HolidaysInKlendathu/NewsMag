import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Route } from 'next'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Modern Magazine brings you the latest news and stories from around the world.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={'/category/politics' as Route} className="text-muted-foreground hover:text-foreground">
                  Politics
                </Link>
              </li>
              <li>
                <Link href={'/category/technology' as Route} className="text-muted-foreground hover:text-foreground">
                  Technology
                </Link>
              </li>
              <li>
                <Link href={'/category/culture' as Route} className="text-muted-foreground hover:text-foreground">
                  Culture
                </Link>
              </li>
              <li>
                <Link href={'/category/science' as Route} className="text-muted-foreground hover:text-foreground">
                  Science
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: contact@modernmag.com
              </li>
              <li className="text-muted-foreground">
                Phone: (555) 123-4567
              </li>
              <li className="text-muted-foreground">
                Address: 123 News Street
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Modern Magazine. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href={'/privacy' as Route} className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href={'/terms' as Route} className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

