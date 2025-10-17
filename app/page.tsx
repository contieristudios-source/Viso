import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhoWeAre } from "@/components/who-we-are"
import { WhatWeOffer } from "@/components/what-we-offer"
import { OurTeam } from "@/components/our-team"
import { Footer } from "@/components/footer"
import { PortfolioCollage } from "@/components/portfolio-collage"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <PortfolioCollage />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <WhoWeAre />
        <WhatWeOffer />
        <OurTeam />
        <Footer />
      </div>
    </main>
  )
}
