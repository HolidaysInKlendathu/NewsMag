import * as React from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"
import { categories } from "../app/config/categories"
import type { Route } from 'next'

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {categories.map((category) => (
              <div key={category.slug} className="flex flex-col space-y-2">
                <Link
                  href={{ pathname: `/articles/${category.slug}` } as unknown as Route}
                  className="text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
                <div className="pl-4 flex flex-col space-y-2">
                  {category.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.slug}
                      href={{ pathname: `/articles/${category.slug}/${subCategory.slug}` } as unknown as Route}
                      className="text-sm text-muted-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href={{ pathname: '/about' }}
              className="text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}