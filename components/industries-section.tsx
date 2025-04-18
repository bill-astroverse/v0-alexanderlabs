import { Card, CardContent, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import {
  Building2,
  Stethoscope,
  Landmark,
  GraduationCap,
  Factory,
  ShoppingBag,
  Plane,
  Truck,
  Home,
  Leaf,
} from "lucide-react"
import Image from "next/image"

export function IndustriesSection() {
  const industries = [
    {
      name: "Healthcare",
      description: "Digital solutions for healthcare providers and organizations",
      icon: Stethoscope,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rgrJ3vhv8zUMJ4QL1qqVdM717zoSS2.png",
      href: "/industries/healthcare",
    },
    {
      name: "Finance",
      description: "Secure and efficient systems for financial institutions",
      icon: Landmark,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BSkfRQ9ns1WCBEbYZQ2pzOTAmbXOI6.png",
      href: "/industries/finance",
    },
    {
      name: "Education",
      description: "Technology solutions for schools, universities and e-learning",
      icon: GraduationCap,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YfRGfRohbRjQTYvRm1PL9iAbcfTK9x.png",
      href: "/industries/education",
    },
    {
      name: "Government",
      description: "Digital transformation for government agencies and services",
      icon: Building2,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BkX5LPl0nnzVl2w18NdHfByg3IvQXQ.png",
      href: "/industries/government",
    },
    {
      name: "Manufacturing",
      description: "Smart factory solutions and industrial automation",
      icon: Factory,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hmHjLs4wzFS46Aiz7x8ja46oHLDvE5.png",
      href: "/industries/manufacturing",
    },
    {
      name: "Retail",
      description: "E-commerce and in-store technology solutions",
      icon: ShoppingBag,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCLaQN1Macd5V5t2F7O4WAZjn5J98l.png",
      href: "/industries/retail",
    },
    {
      name: "Transportation",
      description: "Logistics and fleet management solutions",
      icon: Truck,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NCtrSz25y4tOIdN025Qd3naGKN3TgF.png",
      href: "/industries/transportation",
    },
    {
      name: "Travel & Hospitality",
      description: "Guest experience and operational efficiency solutions",
      icon: Plane,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7qpyvL8w3A7AOJASDregXhAMhv9FdC.png",
      href: "/industries/hospitality",
    },
    {
      name: "Real Estate",
      description: "Property management and smart building solutions",
      icon: Home,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-99WIx14F9DHBAH0jWwtP7CY66LTF1h.png",
      href: "/industries/real-estate",
    },
    {
      name: "Energy & Utilities",
      description: "Smart grid and resource management solutions",
      icon: Leaf,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W0xBX5HP9haaH4XNZenFeeX6ZLCYGK.png",
      href: "/industries/energy",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 green-gradient-text">Industries We Serve</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            We provide specialized IT solutions across various industries
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {industries.map((industry) => (
            <Link href={industry.href} key={industry.name} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg group-hover:border-green-500">
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2 text-white">
                      <industry.icon className="h-5 w-5 text-green-400" />
                      <h3 className="font-bold">{industry.name}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <CardDescription className="text-base text-black">{industry.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/industries" className="text-green-600 hover:text-green-800 font-medium">
            View all industries →
          </Link>
        </div>
      </div>
    </section>
  )
}
