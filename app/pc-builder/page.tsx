"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Info, X } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

type PCPart = {
  id: string
  name: string
  price: number
  image: string
  category: string
  specs?: string
  brand?: string
  tdp?: string
  formFactor?: string
  voltage?: string
  color?: string
  warranty?: string
  noise?: string
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
    {
      id: "compact-powerhouse",
      name: "Compact Powerhouse",
      description: "Small form factor PC with high-end components",
      price: 219999,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2942&auto=format&fit=crop",
      specs: [
        "Intel Core i7-13700K",
        "NVIDIA RTX 4070 Ti 12GB",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "750W SFX PSU",
        "240mm AIO Cooling",
      ],
    },
    {
      id: "ultimate-gaming",
      name: "Ultimate Gaming Rig",
      description: "No-compromise gaming PC for 4K and high refresh rate gaming",
      price: 399999,
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
      specs: [
        "Intel Core i9-14900K",
        "NVIDIA RTX 4090 24GB",
        "64GB DDR5 RAM",
        "2TB NVMe SSD + 2TB SSD",
        "1200W Platinum PSU",
        "360mm AIO Cooling",
      ],
    },
    {
      id: "productivity-master",
      name: "Productivity Master",
      description: "Optimized for multitasking and office productivity",
      price: 169999,
      image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2942&auto=format&fit=crop",
      specs: [
        "AMD Ryzen 7 7700X",
        "NVIDIA RTX 4060 8GB",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "650W Gold PSU",
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
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "24 cores (8P+16E), 5.8GHz max, 36MB cache, DDR5-5600",
        brand: "Intel",
        tdp: "125W",
      },
      {
        id: "cpu2",
        name: "AMD Ryzen 9 7950X",
        price: 54999,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop",
        category: "cpu",
        specs: "16 cores, 32 threads, 5.7GHz max, 64MB cache, DDR5-5200",
        brand: "AMD",
        tdp: "170W",
      },
      {
        id: "cpu3",
        name: "Intel Core i7-14700K",
        price: 44999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "20 cores (8P+12E), 5.6GHz max, 33MB cache, DDR5-5600",
        brand: "Intel",
        tdp: "125W",
      },
      {
        id: "cpu4",
        name: "AMD Ryzen 7 7800X3D",
        price: 42999,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop",
        category: "cpu",
        specs: "8 cores, 16 threads, 5.0GHz max, 96MB 3D V-Cache, DDR5-5200",
        brand: "AMD",
        tdp: "120W",
      },
      {
        id: "cpu5",
        name: "Intel Core i5-14600K",
        price: 32999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "14 cores (6P+8E), 5.3GHz max, 24MB cache, DDR5-5600",
        brand: "Intel",
        tdp: "125W",
      },
      {
        id: "cpu6",
        name: "AMD Ryzen 5 7600X",
        price: 27999,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop",
        category: "cpu",
        specs: "6 cores, 12 threads, 5.3GHz max, 32MB cache, DDR5-5200",
        brand: "AMD",
        tdp: "105W",
      },
      {
        id: "cpu7",
        name: "Intel Core i9-13900K",
        price: 49999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "24 cores (8P+16E), 5.8GHz max, 36MB cache, DDR5-5600",
        brand: "Intel",
        tdp: "125W",
      },
      {
        id: "cpu8",
        name: "AMD Ryzen 9 7900X",
        price: 44999,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop",
        category: "cpu",
        specs: "12 cores, 24 threads, 5.6GHz max, 64MB cache, DDR5-5200",
        brand: "AMD",
        tdp: "170W",
      },
      {
        id: "cpu9",
        name: "Intel Core i5-13600K",
        price: 29999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "14 cores (6P+8E), 5.1GHz max, 24MB cache, DDR5-5600",
        brand: "Intel",
        tdp: "125W",
      },
      {
        id: "cpu10",
        name: "AMD Ryzen 7 7700X",
        price: 39999,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop",
        category: "cpu",
        specs: "8 cores, 16 threads, 5.4GHz max, 32MB cache, DDR5-5200",
        brand: "AMD",
        tdp: "105W",
      },
      {
        id: "cpu11",
        name: "Intel Core i3-14100F",
        price: 14999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "4 cores, 8 threads, 4.7GHz max, 12MB cache, DDR5-5600",
        brand: "Intel",
        tdp: "65W",
      },
      {
        id: "cpu12",
        name: "AMD Ryzen 5 5600X",
        price: 19999,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop",
        category: "cpu",
        specs: "6 cores, 12 threads, 4.6GHz max, 32MB cache, DDR4-3200",
        brand: "AMD",
        tdp: "65W",
      },
      {
        id: "cpu13",
        name: "Intel Core i9-12900K",
        price: 44999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "cpu",
        specs: "16 cores (8P+8E), 5.2GHz max, 30MB cache, DDR5-4800",
        brand: "Intel",
        tdp: "125W",
      },
    ],
    motherboard: [
      {
        id: "mb1",
        name: "ASUS ROG Maximus Z790 Hero",
        price: 59999,
        image: "https://images.unsplash.com/photo-1563770660941-10971f2c6326?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel Z790, DDR5, PCIe 5.0, WiFi 6E, 2.5G LAN, Thunderbolt 4",
        brand: "ASUS",
        formFactor: "ATX",
      },
      {
        id: "mb2",
        name: "MSI MPG X670E Carbon WiFi",
        price: 44999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "AMD X670E, DDR5, PCIe 5.0, WiFi 6E, 2.5G LAN, USB4",
        brand: "MSI",
        formFactor: "ATX",
      },
      {
        id: "mb3",
        name: "Gigabyte Z790 Aorus Elite AX",
        price: 34999,
        image: "https://images.unsplash.com/photo-1563770660941-10971f2c6326?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel Z790, DDR5, PCIe 5.0, WiFi 6E, 2.5G LAN",
        brand: "Gigabyte",
        formFactor: "ATX",
      },
      {
        id: "mb4",
        name: "ASRock B650 Steel Legend WiFi",
        price: 24999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "AMD B650, DDR5, PCIe 4.0, WiFi 6E, 2.5G LAN",
        brand: "ASRock",
        formFactor: "ATX",
      },
      {
        id: "mb5",
        name: "ASUS ROG Strix B760-I Gaming WiFi",
        price: 29999,
        image: "https://images.unsplash.com/photo-1563770660941-10971f2c6326?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel B760, DDR5, PCIe 4.0, WiFi 6E, 2.5G LAN",
        brand: "ASUS",
        formFactor: "Mini-ITX",
      },
      {
        id: "mb6",
        name: "MSI MAG B650 Tomahawk WiFi",
        price: 22999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "AMD B650, DDR5, PCIe 4.0, WiFi 6E, 2.5G LAN",
        brand: "MSI",
        formFactor: "ATX",
      },
      {
        id: "mb7",
        name: "Gigabyte B760M Aorus Elite AX",
        price: 19999,
        image: "https://images.unsplash.com/photo-1563770660941-10971f2c6326?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel B760, DDR5, PCIe 4.0, WiFi 6E, 2.5G LAN",
        brand: "Gigabyte",
        formFactor: "Micro-ATX",
      },
      {
        id: "mb8",
        name: "ASRock X670E Taichi",
        price: 49999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "AMD X670E, DDR5, PCIe 5.0, WiFi 6E, 10G LAN, USB4",
        brand: "ASRock",
        formFactor: "ATX",
      },
      {
        id: "mb9",
        name: "MSI MPG Z690 Gaming Edge WiFi",
        price: 29999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel Z690, DDR5, PCIe 5.0, WiFi 6E, 2.5G LAN",
        brand: "MSI",
        formFactor: "ATX",
      },
      {
        id: "mb10",
        name: "ASUS TUF Gaming B550M-Plus WiFi",
        price: 17999,
        image: "https://images.unsplash.com/photo-1563770660941-10971f2c6326?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "AMD B550, DDR4, PCIe 4.0, WiFi 6, 2.5G LAN",
        brand: "ASUS",
        formFactor: "Micro-ATX",
      },
      {
        id: "mb11",
        name: "Gigabyte Z790 Aorus Master",
        price: 49999,
        image: "https://images.unsplash.com/photo-1563770660941-10971f2c6326?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel Z790, DDR5, PCIe 5.0, WiFi 6E, 10G LAN, Thunderbolt 4",
        brand: "Gigabyte",
        formFactor: "E-ATX",
      },
      {
        id: "mb12",
        name: "ASRock X670E PG Lightning",
        price: 32999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "AMD X670E, DDR5, PCIe 5.0, WiFi 6E, 2.5G LAN",
        brand: "ASRock",
        formFactor: "ATX",
      },
      {
        id: "mb13",
        name: "MSI MEG Z790 Unify-X",
        price: 54999,
        image: "https://images.unsplash.com/photo-1518770660840-4636190af475?q=80&w=2940&auto=format&fit=crop",
        category: "motherboard",
        specs: "Intel Z790, DDR5, PCIe 5.0, WiFi 6E, 10G LAN, Thunderbolt 4",
        brand: "MSI",
        formFactor: "ATX",
      },
    ],
    memory: [
      {
        id: "ram1",
        name: "Corsair Vengeance RGB 32GB DDR5-6000",
        price: 24999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR5-6000, CL36, RGB",
        brand: "Corsair",
        voltage: "1.35V",
      },
      {
        id: "ram2",
        name: "G.Skill Trident Z5 RGB 32GB DDR5-6400",
        price: 27999,
        image: "https://images.unsplash.com/photo-1541029071515-84cc54089a9a?q=80&w=2940&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR5-6400, CL32, RGB",
        brand: "G.Skill",
        voltage: "1.40V",
      },
      {
        id: "ram3",
        name: "Kingston Fury Beast 16GB DDR5-5600",
        price: 14999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "16GB (2x8GB), DDR5-5600, CL40",
        brand: "Kingston",
        voltage: "1.25V",
      },
      {
        id: "ram4",
        name: "Crucial 32GB DDR4-3600",
        price: 17999,
        image: "https://images.unsplash.com/photo-1541029071515-84cc54089a9a?q=80&w=2940&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR4-3600, CL16",
        brand: "Crucial",
        voltage: "1.35V",
      },
      {
        id: "ram5",
        name: "TeamGroup T-Force Delta RGB 32GB DDR5-6200",
        price: 25999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR5-6200, CL38, RGB",
        brand: "TeamGroup",
        voltage: "1.35V",
      },
      {
        id: "ram6",
        name: "Corsair Dominator Platinum RGB 64GB DDR5-5600",
        price: 44999,
        image: "https://images.unsplash.com/photo-1541029071515-84cc54089a9a?q=80&w=2940&auto=format&fit=crop",
        category: "memory",
        specs: "64GB (2x32GB), DDR5-5600, CL36, RGB",
        brand: "Corsair",
        voltage: "1.35V",
      },
      {
        id: "ram7",
        name: "G.Skill Ripjaws S5 32GB DDR5-5200",
        price: 19999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR5-5200, CL42",
        brand: "G.Skill",
        voltage: "1.25V",
      },
      {
        id: "ram8",
        name: "Kingston Fury Renegade RGB 32GB DDR4-3600",
        price: 19999,
        image: "https://images.unsplash.com/photo-1541029071515-84cc54089a9a?q=80&w=2940&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR4-3600, CL16, RGB",
        brand: "Kingston",
        voltage: "1.35V",
      },
      {
        id: "ram9",
        name: "Crucial Ballistix RGB 32GB DDR4-3600",
        price: 18999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR4-3600, CL16, RGB",
        brand: "Crucial",
        voltage: "1.35V",
      },
      {
        id: "ram10",
        name: "G.Skill Trident Z5 RGB 64GB DDR5-6000",
        price: 49999,
        image: "https://images.unsplash.com/photo-1541029071515-84cc54089a9a?q=80&w=2940&auto=format&fit=crop",
        category: "memory",
        specs: "64GB (2x32GB), DDR5-6000, CL36, RGB",
        brand: "G.Skill",
        voltage: "1.35V",
      },
      {
        id: "ram11",
        name: "Corsair Vengeance LPX 16GB DDR4-3200",
        price: 9999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "16GB (2x8GB), DDR4-3200, CL16, Low Profile",
        brand: "Corsair",
        voltage: "1.35V",
      },
      {
        id: "ram12",
        name: "Kingston Fury Beast 64GB DDR5-5200",
        price: 39999,
        image: "https://images.unsplash.com/photo-1541029071515-84cc54089a9a?q=80&w=2940&auto=format&fit=crop",
        category: "memory",
        specs: "64GB (2x32GB), DDR5-5200, CL40",
        brand: "Kingston",
        voltage: "1.25V",
      },
      {
        id: "ram13",
        name: "TeamGroup Elite Plus 32GB DDR4-3200",
        price: 14999,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2592&auto=format&fit=crop",
        category: "memory",
        specs: "32GB (2x16GB), DDR4-3200, CL22",
        brand: "TeamGroup",
        voltage: "1.35V",
      },
    ],
    storage: [
      {
        id: "ssd1",
        name: "Samsung 990 Pro 2TB NVMe SSD",
        price: 29999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2835&auto=format&fit=crop",
        category: "storage",
        specs: "2TB, PCIe 4.0 x4, 7,450/6,900 MB/s read/write",
        brand: "Samsung",
        formFactor: "M.2 2280",
      },
      {
        id: "ssd2",
        name: "WD Black SN850X 1TB NVMe SSD",
        price: 17999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "1TB, PCIe 4.0 x4, 7,300/6,600 MB/s read/write",
        brand: "Western Digital",
        formFactor: "M.2 2280",
      },
      {
        id: "ssd3",
        name: "Crucial P3 Plus 1TB NVMe SSD",
        price: 12999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2835&auto=format&fit=crop",
        category: "storage",
        specs: "1TB, PCIe 4.0 x4, 5,000/4,200 MB/s read/write",
        brand: "Crucial",
        formFactor: "M.2 2280",
      },
      {
        id: "hdd1",
        name: "Seagate Barracuda 4TB HDD",
        price: 9999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "4TB, 5400 RPM, 256MB cache, SATA 6Gb/s",
        brand: "Seagate",
        formFactor: "3.5-inch",
      },
      {
        id: "ssd5",
        name: "Samsung 870 EVO 2TB SATA SSD",
        price: 19999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2835&auto=format&fit=crop",
        category: "storage",
        specs: "2TB, SATA 6Gb/s, 560/530 MB/s read/write",
        brand: "Samsung",
        formFactor: "2.5-inch",
      },
      {
        id: "ssd6",
        name: "Sabrent Rocket 4 Plus 2TB NVMe SSD",
        price: 24999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "2TB, PCIe 4.0 x4, 7,100/6,600 MB/s read/write",
        brand: "Sabrent",
        formFactor: "M.2 2280",
      },
      {
        id: "ssd7",
        name: "Kingston KC3000 1TB NVMe SSD",
        price: 16999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2835&auto=format&fit=crop",
        category: "storage",
        specs: "1TB, PCIe 4.0 x4, 7,000/6,000 MB/s read/write",
        brand: "Kingston",
        formFactor: "M.2 2280",
      },
      {
        id: "hdd2",
        name: "WD Red Plus 6TB NAS HDD",
        price: 17999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "6TB, 5640 RPM, 128MB cache, SATA 6Gb/s, CMR",
        brand: "Western Digital",
        formFactor: "3.5-inch",
      },
      {
        id: "ssd9",
        name: "Crucial P5 Plus 2TB NVMe SSD",
        price: 22999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2835&auto=format&fit=crop",
        category: "storage",
        specs: "2TB, PCIe 4.0 x4, 6,600/5,000 MB/s read/write",
        brand: "Crucial",
        formFactor: "M.2 2280",
      },
      {
        id: "ssd10",
        name: "Samsung 980 Pro 1TB NVMe SSD",
        price: 19999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "1TB, PCIe 4.0 x4, 7,000/5,000 MB/s read/write",
        brand: "Samsung",
        formFactor: "M.2 2280",
      },
      {
        id: "ssd11",
        name: "WD Black SN770 1TB NVMe SSD",
        price: 14999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2835&auto=format&fit=crop",
        category: "storage",
        specs: "1TB, PCIe 4.0 x4, 5,150/4,900 MB/s read/write",
        brand: "Western Digital",
        formFactor: "M.2 2280",
      },
      {
        id: "ssd12",
        name: "Seagate FireCuda 530 2TB NVMe SSD",
        price: 29999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "2TB, PCIe 4.0 x4, 7,300/6,900 MB/s read/write",
        brand: "Seagate",
        formFactor: "M.2 2280",
      },
      {
        id: "hdd3",
        name: "WD Black 8TB HDD",
        price: 24999,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=2865&auto=format&fit=crop",
        category: "storage",
        specs: "8TB, 7200 RPM, 256MB cache, SATA 6Gb/s",
        brand: "Western Digital",
        formFactor: "3.5-inch",
      },
    ],
    gpu: [
      {
        id: "gpu1",
        name: "NVIDIA GeForce RTX 4090 24GB",
        price: 199999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "24GB GDDR6X, 16384 CUDA cores, 2.52 GHz boost",
        brand: "NVIDIA",
        tdp: "450W",
      },
      {
        id: "gpu2",
        name: "AMD Radeon RX 7900 XTX 24GB",
        price: 119999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
        specs: "24GB GDDR6, 12288 stream processors, 2.5 GHz boost",
        brand: "AMD",
        tdp: "355W",
      },
      {
        id: "gpu3",
        name: "NVIDIA GeForce RTX 4070 Ti 12GB",
        price: 99999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "12GB GDDR6X, 7680 CUDA cores, 2.61 GHz boost",
        brand: "NVIDIA",
        tdp: "285W",
      },
      {
        id: "gpu4",
        name: "AMD Radeon RX 6800 XT 16GB",
        price: 79999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
        specs: "16GB GDDR6, 4608 stream processors, 2.25 GHz boost",
        brand: "AMD",
        tdp: "300W",
      },
      {
        id: "gpu5",
        name: "NVIDIA GeForce RTX 4080 16GB",
        price: 149999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "16GB GDDR6X, 9728 CUDA cores, 2.51 GHz boost",
        brand: "NVIDIA",
        tdp: "320W",
      },
      {
        id: "gpu6",
        name: "AMD Radeon RX 7800 XT 16GB",
        price: 89999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
        specs: "16GB GDDR6, 3840 stream processors, 2.43 GHz boost",
        brand: "AMD",
        tdp: "263W",
      },
      {
        id: "gpu7",
        name: "NVIDIA GeForce RTX 4070 12GB",
        price: 79999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "12GB GDDR6X, 5888 CUDA cores, 2.48 GHz boost",
        brand: "NVIDIA",
        tdp: "200W",
      },
      {
        id: "gpu8",
        name: "AMD Radeon RX 7700 XT 12GB",
        price: 69999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
        specs: "12GB GDDR6, 3456 stream processors, 2.54 GHz boost",
        brand: "AMD",
        tdp: "245W",
      },
      {
        id: "gpu9",
        name: "NVIDIA GeForce RTX 4060 Ti 8GB",
        price: 59999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "8GB GDDR6, 4352 CUDA cores, 2.54 GHz boost",
        brand: "NVIDIA",
        tdp: "160W",
      },
      {
        id: "gpu10",
        name: "AMD Radeon RX 6750 XT 12GB",
        price: 59999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
        specs: "12GB GDDR6, 2560 stream processors, 2.6 GHz boost",
        brand: "AMD",
        tdp: "250W",
      },
      {
        id: "gpu11",
        name: "NVIDIA GeForce RTX 3080 10GB",
        price: 89999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "10GB GDDR6X, 8704 CUDA cores, 1.71 GHz boost",
        brand: "NVIDIA",
        tdp: "320W",
      },
      {
        id: "gpu12",
        name: "AMD Radeon RX 6950 XT 16GB",
        price: 109999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "gpu",
        specs: "16GB GDDR6, 5120 stream processors, 2.31 GHz boost",
        brand: "AMD",
        tdp: "335W",
      },
      {
        id: "gpu13",
        name: "NVIDIA GeForce RTX 3060 12GB",
        price: 49999,
        image: "https://images.unsplash.com/photo-1627064626943-6e3e05d8fd99?q=80&w=2940&auto=format&fit=crop",
        category: "gpu",
        specs: "12GB GDDR6, 3584 CUDA cores, 1.78 GHz boost",
        brand: "NVIDIA",
        tdp: "170W",
      },
    ],
    case: [
      {
        id: "case1",
        name: "Lian Li O11 Dynamic EVO",
        price: 19999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, tempered glass, supports ATX/mATX/ITX",
        brand: "Lian Li",
        color: "Black",
      },
      {
        id: "case2",
        name: "Corsair 5000D Airflow",
        price: 17999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, high airflow, supports ATX/mATX/ITX",
        brand: "Corsair",
        color: "White",
      },
      {
        id: "case3",
        name: "NZXT H7 Flow",
        price: 15999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, high airflow, supports ATX/mATX/ITX",
        brand: "NZXT",
        color: "Black",
      },
      {
        id: "case4",
        name: "Fractal Design Meshify 2",
        price: 16999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, mesh front panel, supports ATX/mATX/ITX",
        brand: "Fractal Design",
        color: "Black",
      },
      {
        id: "case5",
        name: "Phanteks Evolv X",
        price: 24999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, dual system capable, supports ATX/mATX/ITX",
        brand: "Phanteks",
        color: "Anthracite Grey",
      },
      {
        id: "case6",
        name: "Cooler Master NR200P",
        price: 12999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mini-ITX, tempered glass or mesh panel, SFX PSU",
        brand: "Cooler Master",
        color: "White",
      },
      {
        id: "case7",
        name: "be quiet! Pure Base 500DX",
        price: 13999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, high airflow, ARGB, supports ATX/mATX/ITX",
        brand: "be quiet!",
        color: "Black",
      },
      {
        id: "case8",
        name: "Corsair iCUE 7000X RGB",
        price: 29999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Full-tower, tempered glass, supports E-ATX/ATX/mATX/ITX",
        brand: "Corsair",
        color: "Black",
      },
      {
        id: "case9",
        name: "Fractal Design Meshify C",
        price: 12999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, mesh front panel, supports ATX/mATX/ITX",
        brand: "Fractal Design",
        color: "Black",
      },
      {
        id: "case10",
        name: "NZXT H5 Flow",
        price: 11999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, high airflow, supports ATX/mATX/ITX",
        brand: "NZXT",
        color: "White",
      },
      {
        id: "case11",
        name: "Lian Li O11 Dynamic Mini",
        price: 14999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, tempered glass, supports ATX/mATX/ITX, SFX PSU",
        brand: "Lian Li",
        color: "Snow White",
      },
      {
        id: "case12",
        name: "Corsair 4000D Airflow",
        price: 11999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, high airflow, supports ATX/mATX/ITX",
        brand: "Corsair",
        color: "Black",
      },
      {
        id: "case13",
        name: "Phanteks P500A",
        price: 13999,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop",
        category: "case",
        specs: "Mid-tower, high airflow, supports E-ATX/ATX/mATX/ITX",
        brand: "Phanteks",
        color: "Black",
      },
    ],
    psu: [
      {
        id: "psu1",
        name: "Corsair RM1000x 1000W Gold",
        price: 22999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "1000W, 80+ Gold, fully modular, 135mm fan",
        brand: "Corsair",
        warranty: "10 years",
      },
      {
        id: "psu2",
        name: "EVGA SuperNOVA 850 G6",
        price: 17999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "850W, 80+ Gold, fully modular, 135mm fan",
        brand: "EVGA",
        warranty: "10 years",
      },
      {
        id: "psu3",
        name: "Seasonic Focus GX-750",
        price: 14999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "750W, 80+ Gold, fully modular, 120mm fan",
        brand: "Seasonic",
        warranty: "10 years",
      },
      {
        id: "psu4",
        name: "be quiet! Straight Power 11 650W",
        price: 13999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "650W, 80+ Gold, fully modular, 135mm fan",
        brand: "be quiet!",
        warranty: "5 years",
      },
      {
        id: "psu5",
        name: "Corsair HX1200 1200W Platinum",
        price: 29999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "1200W, 80+ Platinum, fully modular, 140mm fan",
        brand: "Corsair",
        warranty: "10 years",
      },
      {
        id: "psu6",
        name: "Seasonic Prime TX-1000",
        price: 27999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "1000W, 80+ Titanium, fully modular, 135mm fan",
        brand: "Seasonic",
        warranty: "12 years",
      },
      {
        id: "psu7",
        name: "EVGA SuperNOVA 750 P6",
        price: 15999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "750W, 80+ Platinum, fully modular, 120mm fan",
        brand: "EVGA",
        warranty: "10 years",
      },
      {
        id: "psu8",
        name: "Cooler Master V850 Gold V2",
        price: 16999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "850W, 80+ Gold, fully modular, 135mm fan",
        brand: "Cooler Master",
        warranty: "10 years",
      },
      {
        id: "psu9",
        name: "Corsair SF750 750W Platinum",
        price: 19999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "750W, 80+ Platinum, fully modular, 92mm fan",
        brand: "Corsair",
        warranty: "7 years",
      },
      {
        id: "psu10",
        name: "be quiet! Dark Power Pro 12 1200W",
        price: 32999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "1200W, 80+ Titanium, fully modular, 135mm fan",
        brand: "be quiet!",
        warranty: "10 years",
      },
      {
        id: "psu11",
        name: "Thermaltake Toughpower GF3 850W",
        price: 18999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "850W, 80+ Gold, fully modular, 140mm fan",
        brand: "Thermaltake",
        warranty: "10 years",
      },
      {
        id: "psu12",
        name: "Silverstone SX700-PT 700W",
        price: 16999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "700W, 80+ Platinum, fully modular, 92mm fan",
        brand: "Silverstone",
        warranty: "5 years",
      },
      {
        id: "psu13",
        name: "Fractal Design Ion+ 2 Platinum 860W",
        price: 19999,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop",
        category: "psu",
        specs: "860W, 80+ Platinum, fully modular, 140mm fan",
        brand: "Fractal Design",
        warranty: "10 years",
      },
    ],
    cooling: [
      {
        id: "cool1",
        name: "NZXT Kraken X73 RGB 360mm AIO",
        price: 22999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "360mm radiator, RGB, compatible with Intel & AMD",
        brand: "NZXT",
        noise: "21-36 dBA",
      },
      {
        id: "cool2",
        name: "Corsair iCUE H150i Elite 360mm AIO",
        price: 21999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "360mm radiator, RGB, compatible with Intel & AMD",
        brand: "Corsair",
        noise: "10-36 dBA",
      },
      {
        id: "cool3",
        name: "Noctua NH-D15 Air Cooler",
        price: 12999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "Dual tower, dual fan, compatible with Intel & AMD",
        brand: "Noctua",
        noise: "24.6 dBA",
      },
      {
        id: "cool4",
        name: "be quiet! Dark Rock Pro 4",
        price: 11999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "Dual tower, dual fan, compatible with Intel & AMD",
        brand: "be quiet!",
        noise: "24.3 dBA",
      },
      {
        id: "cool5",
        name: "Arctic Liquid Freezer II 280mm AIO",
        price: 15999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "280mm radiator, VRM cooling fan, compatible with Intel & AMD",
        brand: "Arctic",
        noise: "0.5-28 dBA",
      },
      {
        id: "cool6",
        name: "Deepcool AK620 Air Cooler",
        price: 8999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "Dual tower, dual fan, compatible with Intel & AMD",
        brand: "Deepcool",
        noise: "28 dBA",
      },
      {
        id: "cool7",
        name: "Lian Li Galahad 240mm AIO",
        price: 14999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "240mm radiator, RGB, compatible with Intel & AMD",
        brand: "Lian Li",
        noise: "25 dBA",
      },
      {
        id: "cool8",
        name: "Corsair A500 Air Cooler",
        price: 9999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "Dual fan, slide-and-lock fan mounts, compatible with Intel & AMD",
        brand: "Corsair",
        noise: "36 dBA",
      },
      {
        id: "cool9",
        name: "EK-AIO Elite 360 D-RGB",
        price: 24999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "360mm radiator, D-RGB, compatible with Intel & AMD",
        brand: "EK",
        noise: "36 dBA",
      },
      {
        id: "cool10",
        name: "Scythe Fuma 2 Rev.B Air Cooler",
        price: 8999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "Dual tower, dual fan, compatible with Intel & AMD",
        brand: "Scythe",
        noise: "24.9 dBA",
      },
      {
        id: "cool11",
        name: "Corsair H115i RGB Pro XT 280mm AIO",
        price: 17999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "280mm radiator, RGB, compatible with Intel & AMD",
        brand: "Corsair",
        noise: "28 dBA",
      },
      {
        id: "cool12",
        name: "Thermalright Peerless Assassin 120 Air Cooler",
        price: 6999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "Dual tower, dual fan, compatible with Intel & AMD",
        brand: "Thermalright",
        noise: "25.6 dBA",
      },
      {
        id: "cool13",
        name: "MSI MAG CoreLiquid 360R V2 AIO",
        price: 19999,
        image: "https://images.unsplash.com/photo-1624705013726-8cb4f9415f40?q=80&w=2070&auto=format&fit=crop",
        category: "cooling",
        specs: "360mm radiator, RGB, compatible with Intel & AMD",
        brand: "MSI",
        noise: "34 dBA",
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
                            {selectedParts[category.id]?.specs && (
                              <p className="text-xs text-gray-500">{selectedParts[category.id]?.specs}</p>
                            )}
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
                              document.getElementById(`${category.id}-section`)?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>

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
