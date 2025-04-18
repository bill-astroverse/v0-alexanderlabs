"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Info, Plus, X } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

type PCPart = {
  id: string
  name: string
  price: number
  image: string
  category: string
  selected?: boolean
}

export default function PCBuilderPage() {
  const { addItem } = useCart()
  const [activeTab, setActiveTab] = useState("prebuilt")
  const [selectedParts, setSelectedParts] = useState<Record<string, PCPart | null>>({
    cpu: null,
    motherboard: null,
    memory: null,
    storage: null,
    gpu: null,
    case: null,
    psu: null,
    cooling: null,
  })

  const prebuiltSystems = [
    {
      id: "gaming-pro",
      name: "Gaming Pro PC",
      description: "High-end gaming PC with RTX 4070 and Intel Core i7",
      price: 249999,
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
      specs: [
        "Intel Core i7-13700K",
        "NVIDIA RTX 4070 12GB",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "750W Gold PSU",
        "RGB Cooling",
      ],
    },
    {
      id: "creator-studio",
      name: "Creator Studio PC",
      description: "Powerful workstation for content creators and professionals",
      price: 329999,
      image:
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      specs: [
        "AMD Ryzen 9 7950X",
        "NVIDIA RTX 4080 16GB",
        "64GB DDR5 RAM",
        "2TB NVMe SSD + 4TB HDD",
        "850W Platinum PSU",
        "Liquid Cooling",
      ],
    },
    {
      id: "budget-gamer",
      name: "Budget Gamer PC",
      description: "Affordable gaming PC with great 1080p performance",
      price: 129999,
      image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
      specs: [
        "AMD Ryzen 5 7600X",
        "NVIDIA RTX 3060 8GB",
        "16GB DDR4 RAM",
        "512GB NVMe SSD",
        "550W Bronze PSU",
        "Air Cooling",
      ],
    },
  ]

  const partCategories = [
    { id: "cpu", name: "Processor (CPU)" },
    { id: "motherboard", name: "Motherboard" },
    { id: "memory", name: "Memory (RAM)" },
    { id: "storage", name: "Storage" },
    { id: "gpu", name: "Graphics Card (GPU)" },
    { id: "case", name: "Case" },
    { id: "psu", name: "Power Supply (PSU)" },
    { id: "cooling", name: "CPU Cooling" },
  ]

  const sampleParts: Record<string, PCPart[]> = {
    cpu: [
      {
        id: "cpu1",
        name: "Intel Core i9-14900K",
        price: 59999,
        image:
          "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "cpu",
      },
      {
        id: "cpu2",
        name: "AMD Ryzen 9 7950X",
        price: 54999,
        image:
          "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "cpu",
      },
      {
        id: "cpu3",
        name: "Intel Core i7-14700K",
        price: 44999,
        image:
          "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "cpu",
      },
      {
        id: "cpu4",
        name: "AMD Ryzen 7 7800X3D",
        price: 42999,
        image:
          "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "cpu",
      },
    ],
    motherboard: [
      {
        id: "mb1",
        name: "ASUS ROG Maximus Z790",
        price: 39999,
        image:
          "https://images.pexels.com/photos/163140/technology-computer-motherboard-chips-163140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "motherboard",
      },
      {
        id: "mb2",
        name: "MSI MPG X670E Carbon",
        price: 34999,
        image:
          "https://images.pexels.com/photos/163140/technology-computer-motherboard-chips-163140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "motherboard",
      },
      {
        id: "mb3",
        name: "Gigabyte Z790 Aorus Elite",
        price: 29999,
        image:
          "https://images.pexels.com/photos/163140/technology-computer-motherboard-chips-163140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "motherboard",
      },
      {
        id: "mb4",
        name: "ASRock B650 Steel Legend",
        price: 19999,
        image:
          "https://images.pexels.com/photos/163140/technology-computer-motherboard-chips-163140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "motherboard",
      },
    ],
    memory: [
      {
        id: "ram1",
        name: "Corsair Vengeance 32GB DDR5-6000",
        price: 19999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "memory",
      },
      {
        id: "ram2",
        name: "G.Skill Trident Z5 32GB DDR5-6400",
        price: 22999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "memory",
      },
      {
        id: "ram3",
        name: "Kingston Fury 16GB DDR5-5600",
        price: 12999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "memory",
      },
      {
        id: "ram4",
        name: "Crucial 32GB DDR4-3600",
        price: 14999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "memory",
      },
    ],
    storage: [
      {
        id: "ssd1",
        name: "Samsung 990 Pro 2TB NVMe SSD",
        price: 24999,
        image:
          "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "storage",
      },
      {
        id: "ssd2",
        name: "WD Black SN850X 1TB NVMe SSD",
        price: 14999,
        image:
          "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "storage",
      },
      {
        id: "ssd3",
        name: "Crucial P3 Plus 1TB NVMe SSD",
        price: 9999,
        image:
          "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "storage",
      },
      {
        id: "hdd1",
        name: "Seagate Barracuda 4TB HDD",
        price: 8999,
        image:
          "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "storage",
      },
    ],
    gpu: [
      {
        id: "gpu1",
        name: "NVIDIA RTX 4090 24GB",
        price: 179999,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
      },
      {
        id: "gpu2",
        name: "AMD Radeon RX 7900 XTX",
        price: 109999,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
      },
      {
        id: "gpu3",
        name: "NVIDIA RTX 4070 Ti 12GB",
        price: 89999,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
      },
      {
        id: "gpu4",
        name: "AMD Radeon RX 6800 XT",
        price: 69999,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
      },
    ],
    case: [
      {
        id: "case1",
        name: "Lian Li O11 Dynamic EVO",
        price: 17999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
      },
      {
        id: "case2",
        name: "Corsair 5000D Airflow",
        price: 14999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
      },
      {
        id: "case3",
        name: "NZXT H7 Flow",
        price: 12999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
      },
      {
        id: "case4",
        name: "Fractal Design Meshify 2",
        price: 13999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
      },
    ],
    psu: [
      {
        id: "psu1",
        name: "Corsair RM1000x 1000W Gold",
        price: 19999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "psu",
      },
      {
        id: "psu2",
        name: "EVGA SuperNOVA 850 G6",
        price: 14999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "psu",
      },
      {
        id: "psu3",
        name: "Seasonic Focus GX-750",
        price: 12999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "psu",
      },
      {
        id: "psu4",
        name: "be quiet! Straight Power 11 650W",
        price: 11999,
        image:
          "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "psu",
      },
    ],
    cooling: [
      {
        id: "cool1",
        name: "NZXT Kraken X73 RGB 360mm AIO",
        price: 19999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
      },
      {
        id: "cool2",
        name: "Corsair iCUE H150i Elite 360mm AIO",
        price: 18999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
      },
      {
        id: "cool3",
        name: "Noctua NH-D15 Air Cooler",
        price: 10999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
      },
      {
        id: "cool4",
        name: "be quiet! Dark Rock Pro 4",
        price: 9999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
      },
    ],
  }

  const selectPart = (category: string, part: PCPart) => {
    setSelectedParts({
      ...selectedParts,
      [category]: part,
    })
  }

  const removePart = (category: string) => {
    setSelectedParts({
      ...selectedParts,
      [category]: null,
    })
  }

  const calculateTotal = () => {
    return Object.values(selectedParts)
      .filter((part) => part !== null)
      .reduce((total, part) => total + (part?.price || 0), 0)
  }

  const addToCart = (system: any) => {
    addItem({
      id: system.id,
      name: system.name,
      price: system.price,
      quantity: 1,
      image: system.image,
    })

    toast({
      title: "Added to cart",
      description: `${system.name} has been added to your cart.`,
    })
  }

  const addCustomBuildToCart = () => {
    // Check if all required parts are selected
    const requiredParts = ["cpu", "motherboard", "memory", "storage", "case", "psu"]
    const missingParts = requiredParts.filter((part) => !selectedParts[part])

    if (missingParts.length > 0) {
      toast({
        title: "Missing parts",
        description: `Please select all required parts before adding to cart.`,
        variant: "destructive",
      })
      return
    }

    addItem({
      id: "custom-pc-" + Date.now(),
      name: "Custom Built PC",
      price: calculateTotal(),
      quantity: 1,
      image: selectedParts.case?.image || "/placeholder.svg",
    })

    toast({
      title: "Added to cart",
      description: `Your custom PC build has been added to your cart.`,
    })
  }

  // Format price in KES with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Custom PC Builder</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prebuilt">Pre-built Systems</TabsTrigger>
          <TabsTrigger value="custom">Custom Build</TabsTrigger>
        </TabsList>

        <TabsContent value="prebuilt" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prebuiltSystems.map((system) => (
              <Card key={system.id} className="newegg-card overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={system.image || "/placeholder.svg"} alt={system.name} fill className="object-cover p-4" />
                  <div className="deal-badge">Best Seller</div>
                </div>
                <CardHeader>
                  <CardTitle>{system.name}</CardTitle>
                  <CardDescription>{system.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 mb-4">
                    {system.specs.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                        <span className="text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="price-tag text-2xl">{formatPrice(system.price)}</p>
                      <p className="price-tag-original">{formatPrice(system.price * 1.15)}</p>
                    </div>
                    <div className="rating-stars">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full newegg-button" onClick={() => addToCart(system)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {partCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="newegg-section-title">{category.name}</h3>

                    {selectedParts[category.id] ? (
                      <div className="pc-builder-part selected">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                              <Image
                                src={selectedParts[category.id]?.image || "/placeholder.svg"}
                                alt={selectedParts[category.id]?.name || ""}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{selectedParts[category.id]?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(selectedParts[category.id]?.price || 0)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => removePart(category.id)}>
                              <X className="h-4 w-4 mr-1" /> Remove
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                document
                                  .getElementById(`${category.id}-section`)
                                  ?.scrollIntoView({ behavior: "smooth" })
                              }
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="pc-builder-part-empty"
                        onClick={() =>
                          document.getElementById(`${category.id}-section`)?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Select {category.name}</span>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                    )}

                    <div id={`${category.id}-section`} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {sampleParts[category.id]?.map((part) => (
                        <Card
                          key={part.id}
                          className={`cursor-pointer transition-all hover:border-blue-500 ${selectedParts[category.id]?.id === part.id ? "border-blue-500 bg-blue-50" : ""}`}
                          onClick={() => selectPart(category.id, part)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                                <Image
                                  src={part.image || "/placeholder.svg"}
                                  alt={part.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{part.name}</h4>
                                <p className="text-sm price-tag">{formatPrice(part.price)}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Build Summary</CardTitle>
                  <CardDescription>Your custom PC configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(selectedParts).map(
                    ([category, part]) =>
                      part && (
                        <div key={category} className="flex justify-between">
                          <span className="text-sm">{partCategories.find((c) => c.id === category)?.name}</span>
                          <span className="text-sm font-medium">{formatPrice(part.price)}</span>
                        </div>
                      ),
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full newegg-button" onClick={addCustomBuildToCart}>
                    Add to Cart
                  </Button>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      All custom builds include free assembly and testing before shipping.
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
