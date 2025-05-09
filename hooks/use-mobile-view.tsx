"use client"

import { useState, useEffect } from "react"

export function useMobileView(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      // Initial check
      checkMobile()

      // Add event listener
      window.addEventListener("resize", checkMobile)

      // Clean up
      return () => window.removeEventListener("resize", checkMobile)
    }
  }, [breakpoint])

  return isMobile
}
