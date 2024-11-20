import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import { Search } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Modern Magazine</span>
        </Link>
        <NavigationMenu className="mx-6 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/category/politics" className="transition-colors hover:text-foreground/80">Politics</Link>
            <Link href="/category/technology" className="transition-colors hover:text-foreground/80">Technology</Link>
            <Link href="/category/culture" className="transition-colors hover:text-foreground/80">Culture</Link>
            <Link href="/category/science" className="transition-colors hover:text-foreground/80">Science</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">About</Link>
          </nav>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}