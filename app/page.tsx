import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { IndustriesSection } from "@/components/industries-section"
import { ConsultationSection } from "@/components/consultation-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <ConsultationSection />
      <IndustriesSection />
      <ServicesSection />
      <ContactSection />
    </div>
  )
}
