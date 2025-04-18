"use client"

import { useState } from "react"
import { Headset, Phone, Mail, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    // Update the positioning for mobile
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="flex flex-col gap-2 mb-4">
          <a
            href="https://wa.me/254705065852"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all touch-target"
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">WhatsApp</span>
          </a>
          <a
            href="tel:+254705065852"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all touch-target"
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Call</span>
          </a>
          <a
            href="mailto:info@alexanderlabs.co.ke"
            className="bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all touch-target"
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      ) : null}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-2 sm:p-3 shadow-lg touch-target ${isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-gradient-to-r from-green-600 via-blue-600 to-red-600 hover:from-green-700 hover:via-blue-700 hover:to-red-700"}`}
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Headset className="h-5 w-5 sm:h-6 sm:w-6" />}
        <span className="sr-only">{isOpen ? "Close contact options" : "Open contact options"}</span>
      </Button>
    </div>
  )
}
