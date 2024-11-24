import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { categories } from '../app/config/categories'
import React from 'react'
import { Route } from 'next'

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Modern Magazine</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category.slug}>
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] text-sm gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {category.subCategories.map((subCategory) => (
                      <ListItem
                        key={subCategory.slug}
                        title={subCategory.name}
                        href={`/articles/${category.slug}/${subCategory.slug}` as Route}
                      >
                        {subCategory.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            {/* Static links */}
            <NavigationMenuItem>
              <Link href={{ pathname: '/about' }} legacyBehavior passHref>
                <NavigationMenuLink className="transition-colors hover:text-foreground/80">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
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