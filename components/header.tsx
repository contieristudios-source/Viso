"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onOpenForm: () => void
}

export function Header({ onOpenForm }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = [
        { id: "hero", element: document.querySelector("#hero"), isDark: false },
        { id: "who-we-are", element: document.querySelector("#who-we-are"), isDark: false },
        { id: "what-we-offer", element: document.querySelector("#what-we-offer"), isDark: false },
        { id: "our-team", element: document.querySelector("#our-team"), isDark: true },
      ]

      let maxVisibility = 0
      let mostVisibleSection = sections[0]

      sections.forEach((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const windowHeight = window.innerHeight

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, rect.top)
          const visibleBottom = Math.min(windowHeight, rect.bottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)

          // Calculate visibility percentage
          const visibility = visibleHeight / windowHeight

          if (visibility > maxVisibility) {
            maxVisibility = visibility
            mostVisibleSection = section
          }
        }
      })

      setIsDarkTheme(mostVisibleSection.isDark)
      // </CHANGE>
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? isDarkTheme
            ? "rgba(10, 10, 10, 0.95)"
            : "rgba(245, 241, 230, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled && !isDarkTheme ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tight transition-colors duration-500"
            style={{
              color: isDarkTheme ? "rgb(245, 241, 230)" : "rgb(10, 10, 10)",
            }}
          >
            VISO
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#who-we-are"
              className="text-sm font-medium hover:text-secondary transition-colors duration-500"
              style={{
                color: isDarkTheme ? "rgb(245, 241, 230)" : "rgb(10, 10, 10)",
              }}
            >
              Who We Are
            </a>
            <a
              href="#what-we-offer"
              className="text-sm font-medium hover:text-secondary transition-colors duration-500"
              style={{
                color: isDarkTheme ? "rgb(245, 241, 230)" : "rgb(10, 10, 10)",
              }}
            >
              Services
            </a>
            <a
              href="#our-team"
              className="text-sm font-medium hover:text-secondary transition-colors duration-500"
              style={{
                color: isDarkTheme ? "rgb(245, 241, 230)" : "rgb(10, 10, 10)",
              }}
            >
              Team
            </a>
            <Button
              onClick={onOpenForm}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300"
            >
              Contact
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
