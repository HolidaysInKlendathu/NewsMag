'use client'

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { categories } from '@/app/config/categories'
import { Search } from 'lucide-react'
import { UserNav } from './user-nav'
import type { Route } from 'next'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <NextUINavbar 
      maxWidth="xl" 
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link href={{ pathname: '/' }} className="flex justify-start items-center gap-1">
            <Image
              src="/images/logo-p.svg"
              alt="Modern Magazine Logo"
              width={52}
              height={52}
              className="block" // Ensure logo is always visible
            />
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {categories.map((category) => (
            <Dropdown key={category.slug}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    radius="sm"
                    variant="light"
                  >
                    {category.name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={`${category.name} submenu`}
                className="w-[340px] gap-2"
              >
                {category.subCategories.map((subCategory) => (
                  <DropdownItem
                    key={subCategory.slug}
                    description={subCategory.description}
                  >
                    <Link
                      href={`/articles/${category.slug}/${subCategory.slug}` as Route}
                      className="w-full"
                    >
                      {subCategory.name}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem>
          {!session ? (
            <Button 
              variant="flat" 
              onClick={() => signIn()}
              color="primary"
            >
              Sign In
            </Button>
          ) : (
            <UserNav />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {categories.map((category) => (
          <div key={category.slug}>
            <NavbarMenuItem className="font-bold">
              {category.name}
            </NavbarMenuItem>
            {category.subCategories.map((subCategory) => (
              <NavbarMenuItem key={subCategory.slug}>
                <Link
                  href={`/articles/${category.slug}/${subCategory.slug}` as Route}
                  className="w-full"
                >
                  {subCategory.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        ))}
        <NavbarMenuItem>
          <Link href={{ pathname: '/about' }}>
            About
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  )
}