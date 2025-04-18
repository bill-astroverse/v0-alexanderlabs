import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingContact } from "@/components/floating-contact"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CartProvider } from "@/hooks/use-cart"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/providers/auth-provider"
import { SupabaseProvider } from "@/providers/supabase-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alexanderlabs Limited - IT Consultancy",
  description: "IT solutions for various industries, startups, individuals and government bodies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <Script id="env-script" strategy="beforeInteractive">
          {`
            window.ENV = {
              NEXT_PUBLIC_SUPABASE_URL: "${process.env.NEXT_PUBLIC_SUPABASE_URL || ""}",
              NEXT_PUBLIC_SUPABASE_ANON_KEY: "${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}"
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SupabaseProvider>
            <AuthProvider>
              <CartProvider>
                <SidebarProvider>
                  <div className="relative min-h-screen flex">
                    <AppSidebar />
                    <div className="flex flex-col flex-1">
                      <SiteHeader />
                      <main className="flex-1 container mx-auto px-4 py-6">
                        <div className="bg-card rounded-lg shadow-lg p-6">{children}</div>
                      </main>
                      <SiteFooter />
                    </div>
                  </div>
                  <FloatingContact />
                </SidebarProvider>
              </CartProvider>
            </AuthProvider>
          </SupabaseProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
