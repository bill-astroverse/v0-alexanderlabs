import { createClient } from "@supabase/supabase-js"

// This script would be run separately to populate the database with more products
// You would need to set these environment variables or replace with actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Generate a large number of products
async function seedProducts() {
  console.log("Starting to seed products...")

  const laptopBrands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "Microsoft", "Samsung", "MSI", "Gigabyte"]
  const desktopBrands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI", "Alienware", "CyberPower", "iBuyPower"]
  const accessoryBrands = [
    "Logitech",
    "Microsoft",
    "Razer",
    "Corsair",
    "SteelSeries",
    "HyperX",
    "Anker",
    "Belkin",
    "JBL",
    "Sony",
  ]

  const laptopModels = [
    "XPS",
    "Inspiron",
    "Latitude",
    "Precision",
    "Pavilion",
    "Envy",
    "Spectre",
    "EliteBook",
    "ThinkPad",
    "IdeaPad",
    "Yoga",
    "Legion",
    "MacBook Pro",
    "MacBook Air",
    "ZenBook",
    "VivoBook",
    "ROG",
    "TUF",
    "Aspire",
    "Swift",
    "Predator",
    "Nitro",
    "Surface Laptop",
    "Surface Book",
    "Surface Pro",
    "Galaxy Book",
    "Notebook",
    "GS Series",
    "GL Series",
    "GE Series",
    "Aero",
    "Aorus",
  ]

  const desktopModels = [
    "OptiPlex",
    "Precision Tower",
    "XPS Desktop",
    "Alienware",
    "Pavilion Desktop",
    "OMEN",
    "ENVY Desktop",
    "ThinkCentre",
    "IdeaCentre",
    "Legion Tower",
    "Mac Mini",
    "iMac",
    "Mac Studio",
    "Mac Pro",
    "ROG Desktop",
    "TUF Gaming Desktop",
    "Aspire Desktop",
    "Predator Orion",
    "Surface Studio",
    "Trident",
    "Infinite",
    "Aegis",
  ]

  const accessoryTypes = [
    "Mouse",
    "Keyboard",
    "Headset",
    "Monitor",
    "Webcam",
    "External Hard Drive",
    "SSD",
    "USB Hub",
    "Docking Station",
    "Graphics Tablet",
    "Printer",
    "Scanner",
    "Router",
    "Switch",
    "UPS",
    "Power Strip",
    "Speakers",
    "Microphone",
  ]

  const useCases = [
    "gaming",
    "office",
    "business",
    "graphics",
    "programming",
    "3d",
    "education",
    "home",
    "content-creation",
    "streaming",
  ]

  const products = []

  // Generate laptops
  for (let i = 0; i < 30; i++) {
    const brand = laptopBrands[Math.floor(Math.random() * laptopBrands.length)]
    const model = laptopModels[Math.floor(Math.random() * laptopModels.length)]
    const ram = [8, 16, 32][Math.floor(Math.random() * 3)]
    const storage = [256, 512, 1024, 2048][Math.floor(Math.random() * 4)]
    const processor =
      Math.random() > 0.5
        ? `Intel Core i${[5, 7, 9][Math.floor(Math.random() * 3)]}`
        : `AMD Ryzen ${[5, 7, 9][Math.floor(Math.random() * 3)]}`

    const selectedUseCases = []
    const numUseCases = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < numUseCases; j++) {
      const useCase = useCases[Math.floor(Math.random() * useCases.length)]
      if (!selectedUseCases.includes(useCase)) {
        selectedUseCases.push(useCase)
      }
    }

    const basePrice = Math.floor(Math.random() * 200000) + 50000
    const price = Math.round(basePrice / 1000) * 1000 // Round to nearest thousand

    products.push({
      name: `${brand} ${model} ${ram}GB RAM ${storage}GB SSD Laptop`,
      description: `${processor} processor, ${ram}GB RAM, ${storage}GB SSD storage, ideal for ${selectedUseCases.join(", ")} use.`,
      price,
      image: "/placeholder.svg?height=300&width=300",
      category: "laptops",
      brand: brand.toLowerCase(),
      use_cases: selectedUseCases,
      specs: {
        processor,
        memory: `${ram}GB DDR4`,
        storage: `${storage}GB SSD`,
        display: `${[13, 14, 15, 16, 17][Math.floor(Math.random() * 5)]}-inch ${Math.random() > 0.5 ? "FHD" : "4K"}`,
      },
      stock: Math.floor(Math.random() * 20) + 1,
      featured: Math.random() < 0.2, // 20% chance of being featured
    })
  }

  // Generate desktops
  for (let i = 0; i < 30; i++) {
    const brand = desktopBrands[Math.floor(Math.random() * desktopBrands.length)]
    const model = desktopModels[Math.floor(Math.random() * desktopModels.length)]
    const ram = [8, 16, 32, 64][Math.floor(Math.random() * 4)]
    const storage = [512, 1024, 2048, 4096][Math.floor(Math.random() * 4)]
    const processor =
      Math.random() > 0.5
        ? `Intel Core i${[5, 7, 9][Math.floor(Math.random() * 3)]}`
        : `AMD Ryzen ${[5, 7, 9][Math.floor(Math.random() * 3)]}`
    const graphics =
      Math.random() > 0.3
        ? `NVIDIA RTX ${[3060, 3070, 3080, 4070, 4080][Math.floor(Math.random() * 5)]}`
        : `AMD Radeon RX ${[6700, 6800, 6900, 7700, 7800][Math.floor(Math.random() * 5)]}`

    const selectedUseCases = []
    const numUseCases = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < numUseCases; j++) {
      const useCase = useCases[Math.floor(Math.random() * useCases.length)]
      if (!selectedUseCases.includes(useCase)) {
        selectedUseCases.push(useCase)
      }
    }

    const basePrice = Math.floor(Math.random() * 300000) + 80000
    const price = Math.round(basePrice / 1000) * 1000 // Round to nearest thousand

    products.push({
      name: `${brand} ${model} ${ram}GB RAM ${storage}GB Desktop`,
      description: `${processor} processor, ${ram}GB RAM, ${storage}GB storage, ${graphics} graphics card, ideal for ${selectedUseCases.join(", ")} use.`,
      price,
      image: "/placeholder.svg?height=300&width=300",
      category: "desktops",
      brand: brand.toLowerCase(),
      use_cases: selectedUseCases,
      specs: {
        processor,
        memory: `${ram}GB DDR4`,
        storage: `${storage}GB ${Math.random() > 0.5 ? "SSD" : "SSD + HDD"}`,
        graphics,
      },
      stock: Math.floor(Math.random() * 15) + 1,
      featured: Math.random() < 0.2, // 20% chance of being featured
    })
  }

  // Generate accessories
  for (let i = 0; i < 40; i++) {
    const brand = accessoryBrands[Math.floor(Math.random() * accessoryBrands.length)]
    const type = accessoryTypes[Math.floor(Math.random() * accessoryTypes.length)]

    const selectedUseCases = []
    const numUseCases = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < numUseCases; j++) {
      const useCase = useCases[Math.floor(Math.random() * useCases.length)]
      if (!selectedUseCases.includes(useCase)) {
        selectedUseCases.push(useCase)
      }
    }

    const basePrice = Math.floor(Math.random() * 50000) + 1000
    const price = Math.round(basePrice / 100) * 100 // Round to nearest hundred

    let specs = {}
    if (type === "Mouse") {
      specs = {
        connectivity: Math.random() > 0.7 ? "Wireless" : "Wired",
        dpi: `${[800, 1600, 3200, 6400, 12800][Math.floor(Math.random() * 5)]}`,
        buttons: `${Math.floor(Math.random() * 10) + 2}`,
      }
    } else if (type === "Keyboard") {
      specs = {
        type: Math.random() > 0.5 ? "Mechanical" : "Membrane",
        layout: Math.random() > 0.2 ? "Full-size" : "TKL",
        connectivity: Math.random() > 0.7 ? "Wireless" : "Wired",
      }
    } else if (type === "Monitor") {
      specs = {
        size: `${[24, 27, 32, 34][Math.floor(Math.random() * 4)]}-inch`,
        resolution: Math.random() > 0.5 ? "1920x1080" : "2560x1440",
        refresh_rate: `${[60, 75, 144, 165, 240][Math.floor(Math.random() * 5)]} Hz`,
      }
    } else {
      specs = {
        connectivity: Math.random() > 0.5 ? "Wireless" : "Wired",
        compatibility: "Windows, macOS",
      }
    }

    products.push({
      name: `${brand} ${type} ${Math.random() > 0.5 ? "Pro" : "Elite"}`,
      description: `High-quality ${type.toLowerCase()} from ${brand}, perfect for ${selectedUseCases.join(", ")} use.`,
      price,
      image: "/placeholder.svg?height=300&width=300",
      category: "accessories",
      brand: brand.toLowerCase(),
      use_cases: selectedUseCases,
      specs,
      stock: Math.floor(Math.random() * 30) + 5,
      featured: Math.random() < 0.1, // 10% chance of being featured
    })
  }

  // Insert products in batches
  const batchSize = 20
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize)
    const { error } = await supabase.from("products").insert(batch)

    if (error) {
      console.error("Error inserting batch:", error)
    } else {
      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(products.length / batchSize)}`)
    }
  }

  console.log(`Seeded ${products.length} products successfully!`)
}

seedProducts()
  .catch(console.error)
  .finally(() => {
    console.log("Seed script completed")
    process.exit(0)
  })
