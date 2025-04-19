"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/hooks/use-cart"
import { ShoppingCart, Check, Star, Heart } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category?: string
  brand?: string
  use_cases?: string[]
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
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

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  // Format price in KES with commas
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price)

  // Calculate discounted price (15% off)
  const originalPrice = Math.round(product.price * 1.15)
  const formattedOriginalPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(originalPrice)

  // Random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

  return (
    <Card className="newegg-card h-full overflow-hidden transition-all duration-300 hover:shadow-lg relative group">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={toggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </Button>
      </div>

      <Link href={`/shop/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          {Math.random() > 0.5 && <Badge className="absolute top-2 left-2 bg-red-600">SALE</Badge>}
        </div>
        {/* Adjust the card content padding for mobile */}
        <CardContent className="p-3 sm:p-4">
          {product.brand && <p className="text-sm text-gray-500 mb-1">{product.brand}</p>}
          <h3 className="font-medium line-clamp-2 h-12 text-sm sm:text-base">{product.name}</h3>

          <div className="flex items-center mt-2 mb-1">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    star <= Math.floor(Number.parseFloat(rating))
                      ? "fill-yellow-400"
                      : star - 0.5 <= Number.parseFloat(rating)
                        ? "fill-yellow-400/50"
                        : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-black ml-1">({Math.floor(Math.random() * 500) + 10})</span>
          </div>

          <div className="mt-2">
            <p className="text-lg sm:text-xl font-bold text-red-600">{formattedPrice}</p>
            <p className="text-xs sm:text-sm text-black line-through">{formattedOriginalPrice}</p>
          </div>

          {product.use_cases && product.use_cases.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.use_cases.slice(0, 2).map((uc) => (
                <Badge key={uc} variant="secondary" className="text-xs">
                  {uc}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full newegg-button" disabled={isAdding}>
          {isAdding ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
