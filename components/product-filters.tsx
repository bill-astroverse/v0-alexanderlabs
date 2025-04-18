"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, X, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100])

  const currentCategory = searchParams.get("category") || "all"
  const currentBrand = searchParams.get("brand") || "all"
  const currentProcessor = searchParams.get("processor") || "all"
  const currentUseCase = searchParams.get("useCase") || "all"

  const categories = [
    { id: "all", name: "All Products" },
    { id: "components", name: "Components" },
    { id: "laptops", name: "Laptops" },
    { id: "desktops", name: "Desktop Computers" },
    { id: "accessories", name: "Accessories" },
    { id: "networking", name: "Networking" },
    { id: "storage", name: "Storage Solutions" },
    { id: "software", name: "Software" },
    { id: "services", name: "IT Services" },
  ]

  const brands = [
    { id: "all", name: "All Brands", logo: "/placeholder.svg?height=30&width=80" },
    { id: "dell", name: "Dell", logo: "/placeholder.svg?height=30&width=80" },
    { id: "hp", name: "HP", logo: "/placeholder.svg?height=30&width=80" },
    { id: "lenovo", name: "Lenovo", logo: "/placeholder.svg?height=30&width=80" },
    { id: "apple", name: "Apple", logo: "/placeholder.svg?height=30&width=80" },
    { id: "asus", name: "Asus", logo: "/placeholder.svg?height=30&width=80" },
    { id: "acer", name: "Acer", logo: "/placeholder.svg?height=30&width=80" },
    { id: "microsoft", name: "Microsoft", logo: "/placeholder.svg?height=30&width=80" },
    { id: "samsung", name: "Samsung", logo: "/placeholder.svg?height=30&width=80" },
    { id: "logitech", name: "Logitech", logo: "/placeholder.svg?height=30&width=80" },
    { id: "msi", name: "MSI", logo: "/placeholder.svg?height=30&width=80" },
    { id: "gigabyte", name: "Gigabyte", logo: "/placeholder.svg?height=30&width=80" },
    { id: "amd", name: "AMD", logo: "/placeholder.svg?height=30&width=80" },
    { id: "intel", name: "Intel", logo: "/placeholder.svg?height=30&width=80" },
    { id: "nvidia", name: "NVIDIA", logo: "/placeholder.svg?height=30&width=80" },
  ]

  const processors = [
    { id: "all", name: "All Processors" },
    { id: "intel-i9", name: "Intel Core i9" },
    { id: "intel-i7", name: "Intel Core i7" },
    { id: "intel-i5", name: "Intel Core i5" },
    { id: "intel-i3", name: "Intel Core i3" },
    { id: "amd-ryzen9", name: "AMD Ryzen 9" },
    { id: "amd-ryzen7", name: "AMD Ryzen 7" },
    { id: "amd-ryzen5", name: "AMD Ryzen 5" },
    { id: "amd-ryzen3", name: "AMD Ryzen 3" },
    { id: "apple-m3", name: "Apple M3" },
    { id: "apple-m2", name: "Apple M2" },
    { id: "apple-m1", name: "Apple M1" },
  ]

  const useCases = [
    { id: "all", name: "All Use Cases" },
    { id: "gaming", name: "Gaming" },
    { id: "office", name: "Office & Business" },
    { id: "3d", name: "3D Modeling & CAD" },
    { id: "graphics", name: "Graphics & Design" },
    { id: "programming", name: "Programming & Development" },
    { id: "home", name: "Home & Personal" },
    { id: "education", name: "Education" },
    { id: "streaming", name: "Streaming & Content Creation" },
  ]

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-10000", name: "Under KES 10,000" },
    { id: "10000-50000", name: "KES 10,000 - 50,000" },
    { id: "50000-100000", name: "KES 50,000 - 100,000" },
    { id: "100000-200000", name: "KES 100,000 - 200,000" },
    { id: "over-200000", name: "Over KES 200,000" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      if (searchQuery) {
        params.set("q", searchQuery)
      } else {
        params.delete("q")
      }

      router.push(`/shop?${params.toString()}`)
    })
  }

  const handleCategoryChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      if (value && value !== "all") {
        params.set("category", value)
      } else {
        params.delete("category")
      }

      router.push(`/shop?${params.toString()}`)
    })
  }

  const handleBrandChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      if (value && value !== "all") {
        params.set("brand", value)
      } else {
        params.delete("brand")
      }

      router.push(`/shop?${params.toString()}`)
    })
  }

  const handleProcessorChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      if (value && value !== "all") {
        params.set("processor", value)
      } else {
        params.delete("processor")
      }

      router.push(`/shop?${params.toString()}`)
    })
  }

  const handleUseCaseChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      if (value && value !== "all") {
        params.set("useCase", value)
      } else {
        params.delete("useCase")
      }

      router.push(`/shop?${params.toString()}`)
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    router.push("/shop")
  }

  const hasActiveFilters =
    currentCategory !== "all" ||
    currentBrand !== "all" ||
    currentProcessor !== "all" ||
    currentUseCase !== "all" ||
    searchQuery

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>
        <div className="flex gap-4">
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
              <X className="h-4 w-4" /> Clear Filters
            </Button>
          )}
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" /> {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {currentCategory === "all" ? "Category" : categories.find((c) => c.id === currentCategory)?.name}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end">
              <div className="max-h-[300px] overflow-auto">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`px-4 py-2 hover:bg-muted cursor-pointer ${currentCategory === category.id ? "bg-muted" : ""}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {showFilters && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Advanced Filters</CardTitle>
            <CardDescription>Refine your search with additional filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-medium mb-2">Brand</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="brands">
                    <AccordionTrigger>Select Brand</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map((brand) => (
                          <div
                            key={brand.id}
                            className={`flex items-center justify-center p-2 border rounded-md cursor-pointer hover:border-blue-500 ${
                              currentBrand === brand.id ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => handleBrandChange(brand.id)}
                          >
                            <div className="relative h-8 w-20">
                              <Image
                                src={brand.logo || "/placeholder.svg"}
                                alt={brand.name}
                                fill
                                className="object-contain brand-logo"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h3 className="font-medium mb-2">Processor</h3>
                <Select value={currentProcessor} onValueChange={handleProcessorChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Processor" />
                  </SelectTrigger>
                  <SelectContent>
                    {processors.map((processor) => (
                      <SelectItem key={processor.id} value={processor.id}>
                        {processor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Use Case</h3>
                <Select value={currentUseCase} onValueChange={handleUseCaseChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Use Case" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCases.map((useCase) => (
                      <SelectItem key={useCase.id} value={useCase.id}>
                        {useCase.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4 px-2">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>KES 0</span>
                    <span>KES 500,000+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-4">Popular Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-gaming" />
                  <Label htmlFor="feature-gaming">Gaming Ready</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-touchscreen" />
                  <Label htmlFor="feature-touchscreen">Touchscreen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-ssd" />
                  <Label htmlFor="feature-ssd">SSD Storage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-backlit" />
                  <Label htmlFor="feature-backlit">Backlit Keyboard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-4k" />
                  <Label htmlFor="feature-4k">4K Display</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-thunderbolt" />
                  <Label htmlFor="feature-thunderbolt">Thunderbolt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-wifi6" />
                  <Label htmlFor="feature-wifi6">WiFi 6</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-rgb" />
                  <Label htmlFor="feature-rgb">RGB Lighting</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto pb-2">
        <Tabs defaultValue={currentCategory} onValueChange={handleCategoryChange} className="mb-8">
          <TabsList className="inline-flex w-auto min-w-full md:w-full">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
