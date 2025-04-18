"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Check, ArrowLeft, Truck, Shield, Clock } from "lucide-react"
import { useCart, type CartItem } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"
import { getProductById } from "@/app/actions/products"

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await getProductById(params.productId)
        setProduct(productData)
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.productId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Button asChild variant="outline">
          <a href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </a>
        </Button>
      </div>
    )
  }

  // Format price in KES with commas
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price)

  const handleAddToCart = () => {
    setIsAdding(true)

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    }

    addItem(item)

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }

  return (
    <div>
      <Button asChild variant="outline" className="mb-6">
        <a href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </a>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.brand}</Badge>
            {product.use_cases &&
              product.use_cases.map((uc: string) => (
                <Badge key={uc} variant="secondary">
                  {uc}
                </Badge>
              ))}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="text-3xl font-bold text-green-700 mb-6">{formattedPrice}</div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-green-600 via-blue-600 to-red-600 hover:from-green-700 hover:via-blue-700 hover:to-red-700"
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500">For orders over KES 50,000</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">1 Year Warranty</p>
                  <p className="text-xs text-gray-500">Official warranty</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-xs text-gray-500">Technical assistance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Tabs defaultValue="specifications">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
          <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specs &&
              Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <p className="font-medium capitalize">{key}</p>
                  <p className="text-gray-600">{value as string}</p>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="description" className="p-4 border rounded-md mt-2">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-600 mt-4">
            Experience exceptional performance with the {product.name}. This high-quality device is perfect for
            {product.use_cases && product.use_cases.join(", ")} use cases, providing reliable performance and
            durability.
          </p>
          <p className="text-gray-600 mt-4">
            Backed by a 1-year warranty and our 24/7 technical support, you can be confident in your purchase.
          </p>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
