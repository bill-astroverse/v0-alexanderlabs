import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FooterSlideshow } from "@/components/footer-slideshow"

export function SiteFooter() {
  return (
    <footer className="newegg-footer relative">
      <FooterSlideshow />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Alexanderlabs Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="mb-6 text-white">
              IT consultancy company providing solutions to various industries, startups, individuals and government
              bodies.
            </p>
            <div className="flex flex-col space-y-2 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+254705065852" className="hover:underline">
                  +254 705 065 852
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@alexanderlabs.co.ke" className="hover:underline">
                  info@alexanderlabs.co.ke
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-200 bg-white/10 p-2 rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-200 bg-white/10 p-2 rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-200 bg-white/10 p-2 rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-gray-200 bg-white/10 p-2 rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="hover:text-gray-200 bg-white/10 p-2 rounded-full">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=components" className="hover:underline text-white">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/shop?category=laptops" className="hover:underline text-white">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/shop?category=desktops" className="hover:underline text-white">
                  Desktop PCs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=networking" className="hover:underline text-white">
                  Networking
                </Link>
              </li>
              <li>
                <Link href="/pc-builder" className="hover:underline text-white">
                  PC Builder
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:underline text-white">
                  Today's Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/software-development" className="hover:underline text-white">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/it-consulting" className="hover:underline text-white">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-solutions" className="hover:underline text-white">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="hover:underline text-white">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/services/data-analytics" className="hover:underline text-white">
                  Data Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Subscribe</h3>
            <p className="mb-4 text-white">Get the latest news and offers</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
            </div>
            <p className="mt-4 text-sm text-white">
              By subscribing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white">&copy; {new Date().getFullYear()} Alexanderlabs Limited. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-sm hover:underline text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm hover:underline text-white">
                Terms of Service
              </Link>
              <Link href="/returns-policy" className="text-sm hover:underline text-white">
                Returns Policy
              </Link>
              <Link href="/sitemap" className="text-sm hover:underline text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
