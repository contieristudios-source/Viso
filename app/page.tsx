"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhoWeAre } from "@/components/who-we-are"
import { WhatWeOffer } from "@/components/what-we-offer"
import { OurTeam } from "@/components/our-team"
import { Footer } from "@/components/footer"
import { PortfolioCollage } from "@/components/portfolio-collage"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <main className="min-h-screen relative">
      <PortfolioCollage />
      <div className="relative z-10">
        <Header onOpenForm={() => setIsFormOpen(true)} />
        <div className="px-4 md:px-8 lg:px-16 xl:px-24">
          <HeroSection />
        </div>
        <div className="px-4 md:px-8 lg:px-16 xl:px-24">
          <WhoWeAre />
        </div>
        <WhatWeOffer isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        <OurTeam />
        <Footer />
      </div>
    </main>
  )
}
