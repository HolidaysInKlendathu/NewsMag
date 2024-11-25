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
import { Search, ChevronDown, ArrowRight, ChevronLeft } from 'lucide-react'
import { UserNav } from './user-nav'
import type { Route } from 'next'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [menuTransition, setMenuTransition] = useState(false)

  const handleCategoryClick = (categorySlug: string) => {
    setMenuTransition(true)
    setActiveCategory(categorySlug)
  }

  const handleBackClick = () => {
    setMenuTransition(true)
    setTimeout(() => {
      setActiveCategory(null)
      setMenuTransition(false)
    }, 300) // Match this with CSS transition duration
  }

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

      {/* Logo Section - Now with more space */}
      <NavbarContent className="basis-1/5 sm:basis-1/3" justify="start">
        <NavbarBrand as="li" className="max-w-fit">
          <Link href={{ pathname: '/' }} className="flex justify-start items-center">
            {/* Mobile Logo */}
            <Image
              src="/images/logo-p.svg"
              alt="Modern Magazine Logo"
              width={230}
              height={60}
              priority
              className="block sm:hidden w-[230px] h-[60px]"
            />
            
            {/* Desktop Logo */}
            <Image
              src="/images/logo-p.svg"
              alt="Modern Magazine Logo"
              width={230}
              height={60}
              priority
              className="hidden sm:block w-[230px] h-[60px]"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Right-aligned Menu and Actions */}
      <NavbarContent className="hidden lg:flex basis-1/5 sm:basis-2/3" justify="end">
        {/* Menu Items */}
        <ul className="flex gap-4 items-center">
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

          {/* Theme Toggle */}
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>

          {/* Sign In Button */}
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
        </ul>
      </NavbarContent>

      {/* Enhanced Mobile Menu */}
      <NavbarMenu>
        {/* Main Menu */}
        <div
          className={`transform transition-transform duration-300 ${
            activeCategory ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Parent Categories */}
          {categories.map((category) => (
            <NavbarMenuItem 
              key={category.slug}
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <span className="text-lg font-semibold">{category.name}</span>
              <ArrowRight className="w-5 h-5" />
            </NavbarMenuItem>
          ))}

          {/* Other Menu Items */}
          <NavbarMenuItem className="py-4">
            <Link href={{ pathname: '/about' }} className="text-lg">
              About
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Theme</span>
              <ThemeToggle />
            </div>
          </NavbarMenuItem>

          <NavbarMenuItem className="py-4">
            {!session ? (
              <Button 
                variant="flat" 
                onClick={() => signIn()}
                color="primary"
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
            ) : (
              <UserNav />
            )}
          </NavbarMenuItem>
        </div>

        {/* Subcategories Menu */}
        <div
          className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-300 ${
            activeCategory ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {activeCategory && (
            <>
              {/* Back Button */}
              <NavbarMenuItem 
                className="flex items-center gap-2 py-4 cursor-pointer border-b"
                onClick={handleBackClick}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-lg font-semibold">Back</span>
              </NavbarMenuItem>

              {/* Category Title */}
              <NavbarMenuItem className="py-4">
                <span className="text-xl font-bold">
                  {categories.find(cat => cat.slug === activeCategory)?.name}
                </span>
              </NavbarMenuItem>

              {/* Subcategories */}
              {categories
                .find(cat => cat.slug === activeCategory)
                ?.subCategories.map((subCategory) => (
                  <NavbarMenuItem key={subCategory.slug} className="py-4">
                    <Link
                      href={`/articles/${activeCategory}/${subCategory.slug}` as Route}
                      className="flex flex-col gap-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg font-semibold">{subCategory.name}</span>
                      <span className="text-sm text-default-500">{subCategory.description}</span>
                    </Link>
                  </NavbarMenuItem>
                ))}
            </>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}