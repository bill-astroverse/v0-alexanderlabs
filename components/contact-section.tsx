import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can help you achieve your goals
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Subject" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly through these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+254705065852" className="hover:underline">
                      +254 705 065 852
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@alexanderlabs.co.ke" className="hover:underline">
                      info@alexanderlabs.co.ke
                    </a>
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
