"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/providers/auth-provider"
import { getUserCart, setUserCart, clearUserCart } from "@/lib/redis"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  // Load cart from localStorage or Redis on client side
  useEffect(() => {
    async function loadCart() {
      setIsLoading(true)
      try {
        if (user) {
          // If user is logged in, get cart from Redis
          const userCart = await getUserCart(user.id)
          setItems(userCart.items || [])
        } else {
          // If not logged in, get cart from localStorage
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            setItems(JSON.parse(savedCart))
          }
        }
      } catch (error) {
        console.error("Failed to load cart:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [user])

  // Save cart to localStorage or Redis whenever it changes
  useEffect(() => {
    if (isLoading) return

    async function saveCart() {
      try {
        if (user) {
          // If user is logged in, save cart to Redis
          const totalItems = items.reduce((total, item) => total + item.quantity, 0)
          const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
          await setUserCart(user.id, { items, totalItems, totalPrice })
        } else {
          // If not logged in, save cart to localStorage
          localStorage.setItem("cart", JSON.stringify(items))
        }
      } catch (error) {
        console.error("Failed to save cart:", error)
      }
    }

    saveCart()
  }, [items, user, isLoading])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prevItems, item]
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = async () => {
    setItems([])
    if (user) {
      try {
        await clearUserCart(user.id)
      } catch (error) {
        console.error("Failed to clear user cart in Redis:", error)
      }
    }
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
