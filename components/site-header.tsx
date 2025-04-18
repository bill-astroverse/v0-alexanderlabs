"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ShoppingCart, User, Search } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/providers/auth-provider"
import { useCart } from "@/hooks/use-cart"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
// Import the MobileMenu component
import { MobileMenu } from "@/components/mobile-menu"

export function SiteHeader() {
  const { user, signOut } = useAuth()
  const { totalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const categories = [
    { name: "Components", href: "/shop?category=components" },
    { name: "Computers", href: "/shop?category=computers" },
    { name: "Peripherals", href: "/shop?category=peripherals" },
    { name: "Networking", href: "/shop?category=networking" },
    { name: "Software", href: "/shop?category=software" },
    { name: "Gaming", href: "/shop?category=gaming" },
    { name: "Office Solutions", href: "/shop?category=office" },
  ]

  const brands = [
    { name: "Intel", href: "/shop?brand=intel" },
    { name: "AMD", href: "/shop?brand=amd" },
    { name: "NVIDIA", href: "/shop?brand=nvidia" },
    { name: "ASUS", href: "/shop?brand=asus" },
    { name: "MSI", href: "/shop?brand=msi" },
    { name: "Gigabyte", href: "/shop?brand=gigabyte" },
    { name: "Dell", href: "/shop?brand=dell" },
    { name: "HP", href: "/shop?brand=hp" },
    { name: "Lenovo", href: "/shop?brand=lenovo" },
    { name: "Apple", href: "/shop?brand=apple" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="newegg-header py-2">
        <div className="container flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-32 md:w-48">
                <Image src="/images/logo.png" alt="Alexanderlabs Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-2xl">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pr-10 bg-white text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none bg-red-600 hover:bg-red-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Link href="/pc-builder" className="hidden md:block">
              <Button variant="outline" className="bg-white text-blue-700 border-blue-700 hover:bg-blue-50">
                PC Builder
              </Button>
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700">{totalItems}</Badge>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/sign-in">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/sign-up">Create Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container px-4">
          <nav className="hidden md:flex items-center gap-6 py-2 text-black">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium flex items-center gap-1 p-0">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium flex items-center gap-1 p-0">
                  Brands <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {brands.map((brand) => (
                  <DropdownMenuItem key={brand.name} asChild>
                    <Link href={brand.href}>{brand.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/shop" className="text-sm font-medium text-blue-700 font-bold">
              Shop
            </Link>

            <Link href="/pc-builder" className="text-sm font-medium">
              PC Builder
            </Link>

            <Link href="/deals" className="text-sm font-medium">
              Today's Deals
            </Link>

            <Link href="/services" className="text-sm font-medium">
              Services
            </Link>

            <Link href="/blog" className="text-sm font-medium">
              Blog
            </Link>

            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>

      <div className="md:hidden py-2 px-4">
        <form onSubmit={handleSearch} className="flex">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" className="ml-2 bg-red-600 hover:bg-red-700">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  )
}
