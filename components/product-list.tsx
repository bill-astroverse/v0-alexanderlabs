import { ProductCard } from "@/components/product-card"
import { getProducts, searchProducts } from "@/app/actions/products"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export async function ProductList({
  category,
  brand,
  processor,
  useCase,
  searchQuery,
}: {
  category?: string
  brand?: string
  processor?: string
  useCase?: string
  searchQuery?: string
}) {
  let products = []

  try {
    if (searchQuery) {
      products = await searchProducts(searchQuery)
    } else {
      products = await getProducts(category, brand, useCase)
    }
  } catch (error) {
    console.error("Error loading products:", error)
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">No products found</h2>
        <p className="text-black">Try adjusting your filters or search query</p>
      </div>
    )
  }

  // Add IT solutions images from Unsplash and Pexels
  const itSolutionImages = [
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2942&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602080858428-57174f9431cf?q=80&w=2151&auto=format&fit=crop",
    "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
    "https://images.pexels.com/photos/163140/technology-computer-motherboard-chips-163140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
    "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
    "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ]

  // Assign images to products
  const enhancedProducts = products.map((product, index) => {
    return {
      ...product,
      image: itSolutionImages[index % itSolutionImages.length],
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">{products.length} Products</h2>
        </div>

        <div className="flex gap-4 items-center">
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
            </SelectContent>
          </Select>

          <Tabs defaultValue="grid">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Using Demo Data</AlertTitle>
        <AlertDescription>
          Currently displaying mock product data. To connect to your Supabase database, please ensure your environment
          variables are correctly set up in your Vercel project settings.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {enhancedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-auto">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
