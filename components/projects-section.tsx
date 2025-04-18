import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function ProjectsSection() {
  const projects = [
    {
      title: "Healthcare Management System",
      description: "A comprehensive system for managing patient records, appointments, and billing",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Healthcare", "Web Application", "Cloud"],
      href: "/projects/healthcare-management-system",
    },
    {
      title: "Financial Analytics Platform",
      description: "Real-time analytics and reporting platform for financial institutions",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Finance", "Data Analytics", "Dashboard"],
      href: "/projects/financial-analytics-platform",
    },
    {
      title: "Government Portal",
      description: "Citizen services portal for government agencies with secure authentication",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Government", "Web Portal", "Security"],
      href: "/projects/government-portal",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore some of our successful implementations across different industries
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link href={project.href} key={project.title} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg group-hover:border-blue-500">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
