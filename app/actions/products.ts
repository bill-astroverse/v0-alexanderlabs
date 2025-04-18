"use server"

// Mock data for products since Supabase connection is having issues
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Dell XPS 15 Laptop",
    description: "High-performance laptop for professionals with 11th Gen Intel Core i7, 16GB RAM, 512GB SSD",
    price: 185000,
    image: "/placeholder.svg?height=300&width=300",
    category: "laptops",
    brand: "dell",
    use_cases: ["office", "programming"],
    specs: {
      processor: "Intel Core i7-11800H",
      memory: "16GB DDR4",
      storage: "512GB SSD",
      display: "15.6-inch 4K UHD",
    },
    stock: 10,
    featured: true,
  },
  {
    id: "2",
    name: "HP Pavilion Gaming Desktop",
    description: "Gaming desktop with AMD Ryzen 7, 16GB RAM, 1TB SSD, NVIDIA RTX 3060",
    price: 145000,
    image: "/placeholder.svg?height=300&width=300",
    category: "desktops",
    brand: "hp",
    use_cases: ["gaming", "graphics"],
    specs: {
      processor: "AMD Ryzen 7 5700G",
      memory: "16GB DDR4",
      storage: "1TB SSD",
      graphics: "NVIDIA RTX 3060",
    },
    stock: 5,
    featured: true,
  },
  {
    id: "3",
    name: "MacBook Pro 16-inch",
    description: "Apple M1 Pro chip, 16GB RAM, 512GB SSD, 16-inch Retina display",
    price: 320000,
    image: "/placeholder.svg?height=300&width=300",
    category: "laptops",
    brand: "apple",
    use_cases: ["graphics", "programming"],
    specs: {
      processor: "Apple M1 Pro",
      memory: "16GB",
      storage: "512GB SSD",
      display: "16-inch Retina",
    },
    stock: 8,
    featured: true,
  },
  {
    id: "4",
    name: "Logitech MX Master 3 Mouse",
    description: "Advanced wireless mouse with customizable buttons and precision scrolling",
    price: 12500,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    brand: "logitech",
    use_cases: ["office", "graphics"],
    specs: {
      connectivity: "Bluetooth",
      battery: "Up to 70 days",
      buttons: "7 customizable",
    },
    stock: 20,
    featured: false,
  },
  {
    id: "5",
    name: "ASUS ROG Strix Gaming Desktop",
    description: "High-end gaming PC with Intel Core i9, 32GB RAM, 2TB SSD, NVIDIA RTX 3080",
    price: 350000,
    image: "/placeholder.svg?height=300&width=300",
    category: "desktops",
    brand: "asus",
    use_cases: ["gaming", "3d"],
    specs: {
      processor: "Intel Core i9",
      memory: "32GB DDR4",
      storage: "2TB SSD",
      graphics: "NVIDIA RTX 3080",
    },
    stock: 3,
    featured: true,
  },
  {
    id: "6",
    name: "Microsoft Surface Pro 8",
    description: "2-in-1 laptop with Intel Core i5, 8GB RAM, 256GB SSD, 13-inch touchscreen",
    price: 145000,
    image: "/placeholder.svg?height=300&width=300",
    category: "laptops",
    brand: "microsoft",
    use_cases: ["office", "education"],
    specs: {
      processor: "Intel Core i5",
      memory: "8GB",
      storage: "256GB SSD",
      display: "13-inch touchscreen",
    },
    stock: 7,
    featured: false,
  },
]

// Function to get all products with filtering
export async function getProducts(category?: string, brand?: string, useCase?: string) {
  try {
    console.log("Using mock product data due to Supabase connection issues")

    // Filter mock data based on criteria
    let filteredProducts = [...MOCK_PRODUCTS]

    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.category === category)
    }

    if (brand && brand !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.brand === brand)
    }

    if (useCase && useCase !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.use_cases && p.use_cases.includes(useCase))
    }

    return filteredProducts
  } catch (error) {
    console.error("Error in getProducts:", error)
    return MOCK_PRODUCTS
  }
}

// Function to get a single product by ID
export async function getProductById(id: string) {
  try {
    console.log("Using mock product data due to Supabase connection issues")

    // Find product in mock data
    const product = MOCK_PRODUCTS.find((p) => p.id === id)
    return product || null
  } catch (error) {
    console.error("Error in getProductById:", error)
    return null
  }
}

// Function to search products
export async function searchProducts(query: string) {
  try {
    console.log("Using mock product data due to Supabase connection issues")

    // Filter mock products based on search query
    const filteredProducts = MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()),
    )
    return filteredProducts
  } catch (error) {
    console.error("Error in searchProducts:", error)
    return []
  }
}

// Function to get featured products
export async function getFeaturedProducts(limit = 6) {
  try {
    console.log("Using mock product data due to Supabase connection issues")

    // Filter mock products to get featured ones
    const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, limit)
    return featuredProducts
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error)
    return []
  }
}
