"use client"

import { useEffect, useRef } from "react"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const handleScroll = () => {
      if (!titleRef.current) return
      const scrollY = window.scrollY
      const opacity = Math.max(1 - scrollY / 500, 0)
      const translateY = scrollY * 0.5
      titleRef.current.style.opacity = opacity.toString()
      titleRef.current.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 pt-24 opacity-0">
      <div className="container mx-auto max-w-6xl text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-balance mb-8 transition-all duration-300"
        >
          Viso
        </h1>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary text-balance leading-tight">
          além do que se vê
        </p>
      </div>
    </section>
  )
}
