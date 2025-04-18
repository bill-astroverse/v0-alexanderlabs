import { Suspense } from "react"
import { ProductList } from "@/components/product-list"
import { ProductFilters } from "@/components/product-filters"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string; processor?: string; useCase?: string; q?: string }
}) {
  const { category, brand, processor, useCase, q } = searchParams

  const featuredCategories = [
    {
      name: "Gaming PCs",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2942&auto=format&fit=crop",
      href: "/shop?category=desktops&useCase=gaming",
    },
    {
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?q=80&w=2151&auto=format&fit=crop",
      href: "/shop?category=laptops",
    },
    {
      name: "Graphics Cards",
      image:
        "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      href: "/shop?category=components&brand=nvidia",
    },
    {
      name: "Monitors",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
      href: "/shop?category=accessories",
    },
    {
      name: "PC Components",
      image:
        "https://images.pexels.com/photos/163140/technology-computer-motherboard-chips-163140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      href: "/shop?category=components",
    },
    {
      name: "Custom PC Builder",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2070&auto=format&fit=crop",
      href: "/pc-builder",
    },
  ]

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-700 via-red-600 to-blue-700 text-white rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Shop Our Products & Services</h1>
            <p className="text-xl mb-6">
              Browse our range of computers, components, and IT services available for purchase
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-blue-700 hover:bg-gray-100">
                <Link href="/pc-builder">Build Your PC</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/deals">Today's Deals</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative h-64 w-full max-w-md">
              <Image
                src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2942&auto=format&fit=crop"
                alt="Featured Gaming PC"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {featuredCategories.map((cat) => (
          <Link href={cat.href} key={cat.name} className="category-card group">
            <div className="relative h-24 w-24 mb-2">
              <Image
                src={cat.image || "/placeholder.svg"}
                alt={cat.name}
                fill
                className="object-cover rounded-md transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>

      <ProductFilters />

      <Separator className="my-8" />

      <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
        <ProductList category={category} brand={brand} processor={processor} useCase={useCase} searchQuery={q} />
      </Suspense>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Need Help Building Your Perfect PC?</h2>
            <p className="text-gray-700 mb-4 md:mb-0">
              Our experts can help you design a custom PC that meets your specific needs and budget.
            </p>
          </div>
          <Button className="newegg-button">
            <Link href="/contact" className="flex items-center">
              Contact Our Experts <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
