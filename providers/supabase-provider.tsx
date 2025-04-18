"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

type SupabaseContext = {
  supabase: SupabaseClient
}

// Default values as constants to ensure they're valid URLs
const DEFAULT_SUPABASE_URL = "https://tbskdfbsvxztmhpmdqoi.supabase.co"
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRic2tkZmJzdnh6dG1ocG1kcW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzc1MTAsImV4cCI6MjA1OTgxMzUxMH0.KlkXVa2dPP-DNF9mjkHNiMww53fC07X-WYjLRhFSKgI"

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => {
    // Access environment variables safely with fallbacks
    const supabaseUrl =
      typeof window !== "undefined"
        ? window.ENV?.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
        : DEFAULT_SUPABASE_URL

    const supabaseAnonKey =
      typeof window !== "undefined"
        ? window.ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
        : DEFAULT_SUPABASE_ANON_KEY

    // Ensure URL is valid before creating client
    try {
      // Test if URL is valid
      new URL(supabaseUrl)
      return createClient(supabaseUrl, supabaseAnonKey)
    } catch (error) {
      console.error("Invalid Supabase URL, using default:", error)
      return createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY)
    }
  })

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {})
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}
