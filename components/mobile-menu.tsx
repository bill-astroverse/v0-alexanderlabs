"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState(false)
  const [openBrands, setOpenBrands] = useState(false)

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

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "PC Builder", href: "/pc-builder" },
    { name: "Services", href: "/services" },
    { name: "Consultancy", href: "/services/consultancy" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-2 px-3 hover:bg-gray-100 rounded-md flex items-center justify-between"
              onClick={() => setOpen(false)}
            >
              {link.name}
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Link>
          ))}

          <Collapsible open={openCategories} onOpenChange={setOpenCategories} className="w-full">
            <CollapsibleTrigger className="py-2 px-3 hover:bg-gray-100 rounded-md flex items-center justify-between w-full">
              Categories
              <ChevronDown className={`h-4 w-4 transition-transform ${openCategories ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 mt-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="py-2 px-3 hover:bg-gray-100 rounded-md block"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openBrands} onOpenChange={setOpenBrands} className="w-full">
            <CollapsibleTrigger className="py-2 px-3 hover:bg-gray-100 rounded-md flex items-center justify-between w-full">
              Brands
              <ChevronDown className={`h-4 w-4 transition-transform ${openBrands ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 mt-1">
              {brands.map((brand) => (
                <Link
                  key={brand.name}
                  href={brand.href}
                  className="py-2 px-3 hover:bg-gray-100 rounded-md block"
                  onClick={() => setOpen(false)}
                >
                  {brand.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </SheetContent>
    </Sheet>
  )
}
