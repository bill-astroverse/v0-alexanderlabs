import {
  Code,
  Cloud,
  Shield,
  Database,
  Cpu,
  Smartphone,
  Server,
  Monitor,
  Headphones,
  Globe,
  LineChart,
  Layers,
  FileCode,
  Wifi,
  HardDrive,
  Cog,
  BarChart2,
  Briefcase,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export function ServicesSection() {
  const serviceCategories = [
    {
      category: "Software Solutions",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YfRGfRohbRjQTYvRm1PL9iAbcfTK9x.png",
      services: [
        {
          title: "Custom Software Development",
          description: "Tailored software solutions for your unique business needs",
          icon: Code,
          href: "/services/software-development",
        },
        {
          title: "Web Application Development",
          description: "Responsive and scalable web applications",
          icon: Globe,
          href: "/services/web-development",
        },
        {
          title: "Mobile App Development",
          description: "Cross-platform mobile applications for iOS and Android",
          icon: Smartphone,
          href: "/services/mobile-development",
        },
        {
          title: "API Development & Integration",
          description: "Connect your systems and enable seamless data flow",
          icon: FileCode,
          href: "/services/api-integration",
        },
      ],
    },
    {
      category: "Infrastructure & Cloud",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NCtrSz25y4tOIdN025Qd3naGKN3TgF.png",
      services: [
        {
          title: "Cloud Solutions",
          description: "Scalable and secure cloud infrastructure and migration services",
          icon: Cloud,
          href: "/services/cloud-solutions",
        },
        {
          title: "Server Infrastructure",
          description: "Reliable and scalable server solutions for your business",
          icon: Server,
          href: "/services/server-infrastructure",
        },
        {
          title: "Networking Solutions",
          description: "Secure and efficient network design and implementation",
          icon: Wifi,
          href: "/services/networking",
        },
        {
          title: "Storage Solutions",
          description: "Efficient data storage and management systems",
          icon: HardDrive,
          href: "/services/storage",
        },
      ],
    },
    {
      category: "Security & Compliance",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BSkfRQ9ns1WCBEbYZQ2pzOTAmbXOI6.png",
      services: [
        {
          title: "Cybersecurity",
          description: "Protect your business with advanced security solutions",
          icon: Shield,
          href: "/services/cybersecurity",
        },
        {
          title: "Compliance & Risk Management",
          description: "Meet regulatory requirements and manage IT risks",
          icon: Briefcase,
          href: "/services/compliance",
        },
        {
          title: "Security Audits & Testing",
          description: "Identify vulnerabilities and strengthen your defenses",
          icon: Cog,
          href: "/services/security-audits",
        },
        {
          title: "Disaster Recovery",
          description: "Ensure business continuity with robust recovery plans",
          icon: Layers,
          href: "/services/disaster-recovery",
        },
      ],
    },
    {
      category: "Data & Intelligence",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BkX5LPl0nnzVl2w18NdHfByg3IvQXQ.png",
      services: [
        {
          title: "Data Analytics",
          description: "Turn your data into actionable insights",
          icon: BarChart2,
          href: "/services/data-analytics",
        },
        {
          title: "Business Intelligence",
          description: "Make data-driven decisions with powerful BI tools",
          icon: LineChart,
          href: "/services/business-intelligence",
        },
        {
          title: "Database Management",
          description: "Optimize your database performance and reliability",
          icon: Database,
          href: "/services/database-management",
        },
        {
          title: "AI & Machine Learning",
          description: "Intelligent solutions to automate and optimize processes",
          icon: Cpu,
          href: "/services/ai-ml",
        },
      ],
    },
    {
      category: "Support & Management",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hmHjLs4wzFS46Aiz7x8ja46oHLDvE5.png",
      services: [
        {
          title: "IT Consulting",
          description: "Strategic technology guidance and planning",
          icon: Users,
          href: "/services/consultancy",
        },
        {
          title: "Managed IT Services",
          description: "Comprehensive IT management and support",
          icon: Cog,
          href: "/services/managed-services",
        },
        {
          title: "Hardware Solutions",
          description: "Quality hardware products and maintenance services",
          icon: Monitor,
          href: "/services/hardware",
        },
        {
          title: "IT Support",
          description: "24/7 technical support and maintenance services",
          icon: Headphones,
          href: "/services/it-support",
        },
      ],
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 green-gradient-text">Our Services</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            We offer a comprehensive range of IT services to help your business thrive in the digital age
          </p>
        </div>

        <div className="space-y-12">
          {serviceCategories.map((category) => (
            <div key={category.category} className="relative">
              <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.category}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-green-900/50 to-blue-900/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">{category.category}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.services.map((service) => (
                  <Link href={service.href} key={service.title} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-lg group-hover:border-green-500">
                      <CardHeader className="pb-2">
                        <div className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                          <service.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm text-black">{service.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="text-green-600 hover:text-green-800 font-medium">
            View all services →
          </Link>
        </div>
      </div>
    </section>
  )
}
