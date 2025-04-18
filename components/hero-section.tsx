"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCLaQN1Macd5V5t2F7O4WAZjn5J98l.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7qpyvL8w3A7AOJASDregXhAMhv9FdC.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-99WIx14F9DHBAH0jWwtP7CY66LTF1h.png",
  ]

  const handleImageClick = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 green-gradient-text">
              You Dream, We Actualize
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-black">
              Alexanderlabs Limited provides cutting-edge IT consultancy services to various industries, startups,
              individuals, and government bodies.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 hover:from-blue-700 hover:via-green-700 hover:to-blue-700"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div
            className="rounded-lg overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 relative mt-6 md:mt-0"
            onClick={handleImageClick}
          >
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt="IT Solutions"
              width={600}
              height={400}
              className="w-full h-auto"
              priority={true}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-500/30"></div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              Click to change image
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
