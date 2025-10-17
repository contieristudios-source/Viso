"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-foreground">VISO</div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#who-we-are" className="text-sm font-medium hover:text-secondary transition-colors">
              Who We Are
            </a>
            <a href="#what-we-offer" className="text-sm font-medium hover:text-secondary transition-colors">
              Services
            </a>
            <a href="#our-team" className="text-sm font-medium hover:text-secondary transition-colors">
              Team
            </a>
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Contact
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
