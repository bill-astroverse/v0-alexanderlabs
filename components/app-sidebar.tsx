"use client"

import {
  Home,
  BarChart2,
  Users,
  Settings,
  Lightbulb,
  PieChart,
  User,
  ShoppingCart,
  ShoppingBag,
  Laptop,
  Monitor,
  Headphones,
  Server,
  HardDrive,
  FileCode,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const sidebarItems = [
    {
      title: "Main",
      items: [
        {
          title: "Home",
          href: "/",
          icon: Home,
        },
        {
          title: "Insights",
          href: "/insights",
          icon: Lightbulb,
        },
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: BarChart2,
        },
        {
          title: "Stats",
          href: "/stats",
          icon: PieChart,
        },
      ],
    },
    {
      title: "Shop",
      items: [
        {
          title: "All Products",
          href: "/shop",
          icon: ShoppingBag,
        },
        {
          title: "Laptops",
          href: "/shop?category=laptops",
          icon: Laptop,
        },
        {
          title: "Desktops",
          href: "/shop?category=desktops",
          icon: Monitor,
        },
        {
          title: "Accessories",
          href: "/shop?category=accessories",
          icon: Headphones,
        },
        {
          title: "Networking",
          href: "/shop?category=networking",
          icon: Server,
        },
        {
          title: "Storage",
          href: "/shop?category=storage",
          icon: HardDrive,
        },
        {
          title: "Software",
          href: "/shop?category=software",
          icon: FileCode,
        },
        {
          title: "Cart",
          href: "/cart",
          icon: ShoppingCart,
        },
      ],
    },
    {
      title: "Services",
      items: [
        {
          title: "Consultancy",
          href: "/services/consultancy",
          icon: Briefcase,
        },
        {
          title: "User Options",
          href: "/user",
          icon: User,
        },
        {
          title: "Team",
          href: "/team",
          icon: Users,
        },
        {
          title: "Settings",
          href: "/settings",
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden">
            <Image src="/images/logo.png" alt="Alexanderlabs Logo" width={32} height={32} className="object-contain" />
          </div>
          <span className="font-bold text-xl">Alexanderlabs</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Alexanderlabs Ltd.</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
