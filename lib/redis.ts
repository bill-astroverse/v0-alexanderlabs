import { Redis } from "@upstash/redis"

// Create a Redis client using environment variables
export const redis = Redis.fromEnv()

// Helper functions for cart management
export async function getUserCart(userId: string) {
  try {
    const cart = await redis.get(`cart:${userId}`)
    return cart || { items: [], totalItems: 0, totalPrice: 0 }
  } catch (error) {
    console.error("Error getting user cart from Redis:", error)
    return { items: [], totalItems: 0, totalPrice: 0 }
  }
}

export async function setUserCart(userId: string, cart: any) {
  try {
    await redis.set(`cart:${userId}`, cart)
    return true
  } catch (error) {
    console.error("Error setting user cart in Redis:", error)
    return false
  }
}

export async function clearUserCart(userId: string) {
  try {
    await redis.del(`cart:${userId}`)
    return true
  } catch (error) {
    console.error("Error clearing user cart in Redis:", error)
    return false
  }
}
