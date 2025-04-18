"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function FooterSlideshow() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rgrJ3vhv8zUMJ4QL1qqVdM717zoSS2.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NCtrSz25y4tOIdN025Qd3naGKN3TgF.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YfRGfRohbRjQTYvRm1PL9iAbcfTK9x.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BSkfRQ9ns1WCBEbYZQ2pzOTAmbXOI6.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BkX5LPl0nnzVl2w18NdHfByg3IvQXQ.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="footer-slideshow">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image || "/placeholder.svg"}
          alt={`Tech background ${index + 1}`}
          fill
          sizes="100vw"
          className={`footer-slideshow-image ${index === currentImage ? "opacity-20" : "opacity-0"}`}
          priority={index === 0}
        />
      ))}
      <div className="footer-overlay" />
    </div>
  )
}
