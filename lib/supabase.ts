import { createClient } from "@supabase/supabase-js"

// Default values as constants to ensure they're valid URLs
const DEFAULT_SUPABASE_URL = "https://tbskdfbsvxztmhpmdqoi.supabase.co"
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRic2tkZmJzdnh6dG1ocG1kcW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzc1MTAsImV4cCI6MjA1OTgxMzUxMH0.KlkXVa2dPP-DNF9mjkHNiMww53fC07X-WYjLRhFSKgI"

// Safely get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

// Validate URL before creating client
let validSupabaseUrl = DEFAULT_SUPABASE_URL
try {
  new URL(supabaseUrl)
  validSupabaseUrl = supabaseUrl
} catch (error) {
  console.warn("Invalid Supabase URL in environment variables, using default")
}

export const supabase = createClient(validSupabaseUrl, supabaseAnonKey)
