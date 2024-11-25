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
import { Search, ChevronDown, ArrowRight } from 'lucide-react'
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
      className="gap-4"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* Logo Section */}
      <NavbarContent className="basis-1/5 sm:basis-1/4" justify="start">
        <NavbarBrand as="li" className="max-w-fit">
          <Link href={{ pathname: '/' }} className="flex justify-start items-center">
            {/* Mobile Logo */}
            <Image
              src="/images/logo-p.svg"
              alt="Modern Magazine Logo"
              width={60}
              height={60}
              priority
              className="block sm:hidden"
            />
            
            {/* Desktop Logo */}
            <Image
              src="/images/logo-p.svg"
              alt="Modern Magazine Logo"
              width={260}
              height={68}
              priority
              className="hidden sm:block"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Centered Menu */}
      <NavbarContent className="hidden lg:flex basis-1/5 sm:basis-1/2" justify="center">
        <ul className="flex gap-4 justify-center items-center w-full">
          {categories.map((category) => (
            <Dropdown key={category.slug}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent gap-1"
                    radius="sm"
                    variant="light"
                    endContent={<ChevronDown className="w-4 h-4" />}
                  >
                    {category.name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={`${category.name} submenu`}
                className="w-[640px] p-0"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem className="rounded-none" isReadOnly>
                  <div className="w-full px-2 py-4">
                    <div className="text-xl font-bold mb-4 px-2">{category.name}</div>
                    <div className="grid grid-cols-2 gap-4">
                      {category.subCategories.map((subCategory) => (
                        <Link
                          key={subCategory.slug}
                          href={`/articles/${category.slug}/${subCategory.slug}` as Route}
                          className="group flex flex-col gap-2 p-2 hover:bg-default-100 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-default-700">
                              {subCategory.name}
                            </span>
                            <ArrowRight className="w-4 h-4 text-default-400 group-hover:text-default-500 transition-colors" />
                          </div>
                          <span className="text-sm text-default-500">
                            {subCategory.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ))}
        </ul>
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent className="basis-1/5 sm:basis-1/4" justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
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

      {/* Mobile Menu */}
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

        <NavbarMenuItem className="sm:hidden">
          <div className="flex items-center gap-2">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </NavbarMenuItem>

        <NavbarMenuItem className="sm:hidden">
          {!session ? (
            <Button 
              variant="flat" 
              onClick={() => signIn()}
              color="primary"
              className="w-full"
            >
              Sign In
            </Button>
          ) : (
            <UserNav />
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  )
}