import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Briefcase, Network, Server, Clock, FileText, Lightbulb, Cpu, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function ConsultancyPage() {
  const consultancyServices = [
    {
      title: "IT Strategy Development",
      description: "Develop comprehensive IT strategies aligned with your business objectives",
      icon: Lightbulb,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7qpyvL8w3A7AOJASDregXhAMhv9FdC.png",
      benefits: [
        "Align IT initiatives with business goals",
        "Optimize IT investments",
        "Create roadmaps for digital transformation",
        "Identify emerging technologies relevant to your business",
      ],
    },
    {
      title: "Network Consulting",
      description: "Expert advice on network design, implementation, and optimization",
      icon: Network,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rgrJ3vhv8zUMJ4QL1qqVdM717zoSS2.png",
      benefits: [
        "Design complex networks",
        "Optimize existing network infrastructure",
        "Implement secure and scalable solutions",
        "Troubleshoot network issues",
      ],
    },
    {
      title: "Data Center Consolidation",
      description: "Streamline your data center operations for improved efficiency",
      icon: Server,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NCtrSz25y4tOIdN025Qd3naGKN3TgF.png",
      benefits: [
        "Reduce operational costs",
        "Improve resource utilization",
        "Enhance security and compliance",
        "Implement modern data center technologies",
      ],
    },
    {
      title: "Software Consulting",
      description: "Expert guidance on software selection, implementation, and customization",
      icon: Cpu,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YfRGfRohbRjQTYvRm1PL9iAbcfTK9x.png",
      benefits: [
        "Select the right software for your needs",
        "Implement software solutions efficiently",
        "Customize applications to your requirements",
        "Integrate with existing systems",
      ],
    },
    {
      title: "IT Infrastructure Solutions",
      description: "Comprehensive solutions for your IT infrastructure needs",
      icon: Layers,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BkX5LPl0nnzVl2w18NdHfByg3IvQXQ.png",
      benefits: [
        "Design scalable infrastructure",
        "Implement cloud and on-premises solutions",
        "Optimize performance and reliability",
        "Ensure security and compliance",
      ],
    },
    {
      title: "Project Management",
      description: "Professional management of your IT projects from inception to completion",
      icon: Zap,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hmHjLs4wzFS46Aiz7x8ja46oHLDvE5.png",
      benefits: [
        "Ensure projects are delivered on time and within budget",
        "Manage resources effectively",
        "Mitigate risks",
        "Ensure quality and compliance",
      ],
    },
  ]

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 text-white rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">IT Consultancy Services</h1>
            <p className="text-lg md:text-xl mb-6">
              Professional IT consultancy services to help your business thrive in the digital age
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/3 w-full">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-99WIx14F9DHBAH0jWwtP7CY66LTF1h.png"
                alt="IT Consultancy"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-500/30"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 green-accent-border pl-4">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-black">What is IT Consultancy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="mb-4 text-black">
              Consultancy services are services that involve an expert providing advice or solutions to a business or
              organization. Consultants are hired to help clients improve their performance, efficiency, or
              decision-making.
            </p>
            <p className="mb-4 text-black">
              Consultants are professionals who have spent many years in their respective fields and can provide expert
              recommendations to organizations on how to perform more effectively. From strategy consulting to legal
              consulting, there are many types of consultancy services.
            </p>
            <p className="text-black">
              IT consultancy specifically focuses on helping businesses leverage technology effectively to achieve their
              goals. This can include strategic planning, system implementation, cybersecurity, cloud migration, and
              more.
            </p>
          </div>
          <div>
            <div className="relative h-full w-full min-h-[200px] rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCLaQN1Macd5V5t2F7O4WAZjn5J98l.png"
                alt="IT Consultants"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-500/30"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-black">How do consultants help?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="green-accent-bg">
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> Identify problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black">
                Consultants help businesses identify problems and offer solutions. They bring a fresh perspective and
                specialized expertise to uncover issues that might be overlooked internally.
              </p>
            </CardContent>
          </Card>
          <Card className="green-accent-bg">
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> Provide different perspectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black">
                Consultants can offer a different perspective than the business's employees. Their external viewpoint
                and industry experience can lead to innovative solutions and approaches.
              </p>
            </CardContent>
          </Card>
          <Card className="green-accent-bg">
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> Offer solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black">
                Consultants can offer solutions or tools to help clients improve their businesses. They bring best
                practices and proven methodologies to address specific challenges.
              </p>
            </CardContent>
          </Card>
          <Card className="green-accent-bg">
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> Provide action plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black">
                Consultants can provide action plans to help clients solve issues as quickly as possible. These roadmaps
                include specific steps, timelines, and resource allocations to achieve desired outcomes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-black">IT Consultant Duties</h2>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-blue-100 p-6 rounded-lg flex flex-col items-center text-center h-full">
                <Briefcase className="h-12 w-12 text-green-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">1. Assessing client needs</h3>
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="mb-2 text-black">
                Assessing client needs helps you understand their specific requirements, challenges, and objectives so
                you can propose customized solutions. This may involve:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-black">
                  Conducting thorough analysis of the client's current IT systems and infrastructure
                </li>
                <li className="text-black">Assessing the projects' feasibility to identify potential challenges</li>
                <li className="text-black">Identifying gaps and areas for improvements</li>
                <li className="text-black">Understanding the client's business objectives and challenges</li>
                <li className="text-black">
                  Evaluating the client's IT needs and aligning them with industry best practices
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-green-100 p-6 rounded-lg flex flex-col items-center text-center h-full">
                <Lightbulb className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">2. Develop IT strategies</h3>
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="mb-2 text-black">
                A well-defined IT strategy comprises tools, technology, and processes to help a company fulfill its
                short- and long-term IT goals and objectives. Some relevant duties include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-black">Collaborating with clients to define IT goals and objectives</li>
                <li className="text-black">
                  Researching emerging technology and industry trends to incorporate them into solutions
                </li>
                <li className="text-black">
                  Developing IT roadmaps and milestones that align with business objectives to track progress
                </li>
                <li className="text-black">
                  Defining the necessary budget and resources for different projects that are part of the IT strategy
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-blue-100 p-6 rounded-lg flex flex-col items-center text-center h-full">
                <Clock className="h-12 w-12 text-green-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">3. Manage IT Projects</h3>
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="mb-2 text-black">
                IT project management involves project initiation, planning, execution, monitoring, and closure. This
                ensures the project's timely completion within the allotted budget.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-black">Define the project scope, objectives, and deliverables</li>
                <li className="text-black">Develop project plans and timelines</li>
                <li className="text-black">Allocate resources and manage project budgets</li>
                <li className="text-black">
                  Coordinate and collaborate with internal teams to ensure they have the necessary resources to complete
                  their tasks
                </li>
                <li className="text-black">
                  Hold periodic meetings to monitor progress, address concerns, and incorporate client feedback
                </li>
                <li className="text-black">
                  Motivate team members by celebrating milestones, providing incentives, and encouraging them to work
                  towards a common goal
                </li>
                <li className="text-black">
                  Conduct one-on-one meetings to understand employee concerns and incorporate feedback into subsequent
                  phases
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-green-100 p-6 rounded-lg flex flex-col items-center text-center h-full">
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">4. Implement IT Solutions</h3>
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="mb-2 text-black">
                Planning, design, implementation, testing, and maintenance are integral to executing an IT solution from
                beginning to end. The relevant duties can include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-black">Design and configure IT Systems based on client requirements</li>
                <li className="text-black">
                  Coordinate with vendors to set up the necessary hardware and software for implementation and deploy
                  the application
                </li>
                <li className="text-black">Oversee new technologies' installations and deployment</li>
                <li className="text-black">
                  Test and troubleshoot the application to ensure it is functional and works properly
                </li>
                <li className="text-black">
                  Optimize the application through code refactoring, system design changes, or algorithmic optimization
                </li>
                <li className="text-black">Incorporate client feedback to improve the application</li>
                <li className="text-black">Provide training and support to end users</li>
                <li className="text-black">
                  Prepare comprehensive documentation including user manuals, system guides, and readme files for future
                  development, testing, and maintenance activities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-black">Our Consultancy Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultancyServices.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-green-900/50 to-blue-900/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-black">{service.title}</CardTitle>
                <CardDescription className="text-black">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2 text-black">Key Benefits:</h4>
                <ul className="space-y-1">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-black">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Ready to transform your IT infrastructure?</h2>
          <p className="mb-6 max-w-2xl mx-auto text-black">
            Contact us today to discuss how our consultancy services can help your business achieve its technology goals
            and gain a competitive edge in your industry.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 hover:from-blue-700 hover:via-green-700 hover:to-blue-700"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
