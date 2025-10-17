"use client"

import { useEffect, useRef } from "react"

const portfolioImages = [
  { src: "/portfolio-work-1.jpg", alt: "Portfolio work 1", position: "top-16 left-8", size: "w-48 h-64" },
  { src: "/portfolio-work-2.jpg", alt: "Portfolio work 2", position: "top-32 right-16", size: "w-56 h-40" },
  { src: "/portfolio-work-3.jpg", alt: "Portfolio work 3", position: "top-[60%] left-[15%]", size: "w-40 h-56" },
  { src: "/portfolio-work-4.jpg", alt: "Portfolio work 4", position: "top-[35%] right-[25%]", size: "w-52 h-52" },
  { src: "/portfolio-work-5.jpg", alt: "Portfolio work 5", position: "bottom-24 right-12", size: "w-44 h-60" },
  { src: "/portfolio-architecture.jpg", alt: "Architecture work", position: "top-[45%] left-12", size: "w-64 h-48" },
  { src: "/portfolio-fitness.jpg", alt: "Fitness work", position: "top-[70%] right-[20%]", size: "w-48 h-64" },
  { src: "/portfolio-animal.jpg", alt: "Animal work", position: "bottom-[35%] left-[25%]", size: "w-56 h-56" },
  { src: "/team-lara.jpg", alt: "Team work", position: "top-[20%] right-8", size: "w-40 h-52" },
  { src: "/team-enzo.jpg", alt: "Event work", position: "bottom-[25%] right-[30%]", size: "w-52 h-64" },
]

export function PortfolioCollage() {
  const collageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!collageRef.current) return

      const images = collageRef.current.querySelectorAll(".portfolio-image")
      const scrollY = window.scrollY

      images.forEach((img, index) => {
        const speed = 0.1 + index * 0.05
        const yPos = -(scrollY * speed)
        ;(img as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={collageRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {portfolioImages.map((image, index) => (
        <div
          key={index}
          className={`portfolio-image absolute ${image.position} ${image.size} opacity-0 animate-fade-in`}
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="relative w-full h-full group">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl"
              style={{ filter: "blur(1px) grayscale(20%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
