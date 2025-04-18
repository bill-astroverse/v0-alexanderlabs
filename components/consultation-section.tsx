import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lightbulb, Users, LineChart, Presentation, Briefcase, CheckCircle, Clock, Shield, Zap } from "lucide-react"
import Image from "next/image"

export function ConsultationSection() {
  const consultationFeatures = [
    {
      title: "Strategic IT Planning",
      description: "Align your technology with business goals",
      icon: Lightbulb,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7qpyvL8w3A7AOJASDregXhAMhv9FdC.png",
    },
    {
      title: "Expert Consultation",
      description: "Access to industry specialists and certified professionals",
      icon: Users,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rgrJ3vhv8zUMJ4QL1qqVdM717zoSS2.png",
    },
    {
      title: "Performance Analysis",
      description: "Identify bottlenecks and optimize your IT infrastructure",
      icon: LineChart,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hmHjLs4wzFS46Aiz7x8ja46oHLDvE5.png",
    },
    {
      title: "Technology Roadmapping",
      description: "Plan your digital transformation journey",
      icon: Presentation,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-99WIx14F9DHBAH0jWwtP7CY66LTF1h.png",
    },
  ]

  const consultationBenefits = [
    {
      title: "Reduced IT Costs",
      description: "Optimize spending and maximize ROI",
      icon: Briefcase,
    },
    {
      title: "Improved Efficiency",
      description: "Streamline operations and enhance productivity",
      icon: CheckCircle,
    },
    {
      title: "Faster Time-to-Market",
      description: "Accelerate project delivery and implementation",
      icon: Clock,
    },
    {
      title: "Enhanced Security",
      description: "Protect your business from cyber threats",
      icon: Shield,
    },
    {
      title: "Competitive Advantage",
      description: "Stay ahead with cutting-edge technology solutions",
      icon: Zap,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 rounded-xl mb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 green-gradient-text">IT Consultation Services</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Professional IT consultancy to help your business thrive in the digital age
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {consultationFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="border-2 hover:border-green-500 transition-all duration-300 tech-card overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              <CardHeader className="pb-2 relative">
                <div className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-black">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-12 green-accent-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-black">How Our Consultation Process Works</h3>
            <p className="text-black">Our streamlined approach ensures maximum value for your business</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">1</span>
              </div>
              <h4 className="font-bold mb-2 text-black">Discovery & Assessment</h4>
              <p className="text-sm text-black">We analyze your current IT infrastructure and business needs</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">2</span>
              </div>
              <h4 className="font-bold mb-2 text-black">Strategy Development</h4>
              <p className="text-sm text-black">We create a tailored roadmap aligned with your business goals</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">3</span>
              </div>
              <h4 className="font-bold mb-2 text-black">Implementation & Support</h4>
              <p className="text-sm text-black">We execute the strategy and provide ongoing guidance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {consultationBenefits.map((benefit) => (
            <Card key={benefit.title} className="border hover:shadow-md transition-all duration-300 green-accent-bg">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <benefit.icon className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-bold mb-1 text-black">{benefit.title}</h4>
                <p className="text-xs text-black">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 hover:from-blue-700 hover:via-green-700 hover:to-blue-700"
          >
            <Link href="/services/consultancy">Learn More About Our Consultation Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
