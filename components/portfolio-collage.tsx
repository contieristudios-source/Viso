"use client"

import { useEffect, useRef, useState } from "react"

const portfolioImages = [
  {
    src: "/portfolio-work-1.jpg",
    alt: "Portfolio work 1",
    position: "top-8 left-8",
    size: "w-48 h-64",
    hideOnMobile: false,
  },
  {
    src: "/portfolio-work-2.jpg",
    alt: "Portfolio work 2",
    position: "top-16 right-[15%]",
    size: "w-56 h-40",
    hideOnMobile: true,
  },
  {
    src: "/portfolio-work-3.jpg",
    alt: "Portfolio work 3",
    position: "top-[70%] left-[5%]",
    size: "w-40 h-56",
    hideOnMobile: false,
  },
  {
    src: "/portfolio-work-4.jpg",
    alt: "Portfolio work 4",
    position: "top-[15%] right-[25%]",
    size: "w-52 h-52",
    hideOnMobile: true,
  },
  {
    src: "/portfolio-work-5.jpg",
    alt: "Portfolio work 5",
    position: "bottom-16 right-8",
    size: "w-44 h-60",
    hideOnMobile: false,
  },
  {
    src: "/portfolio-architecture.jpg",
    alt: "Architecture work",
    position: "top-[55%] left-4",
    size: "w-64 h-48",
    hideOnMobile: true,
  },
  {
    src: "/portfolio-fitness.jpg",
    alt: "Fitness work",
    position: "top-[80%] right-[12%]",
    size: "w-48 h-64",
    hideOnMobile: true,
  },
  {
    src: "/portfolio-animal.jpg",
    alt: "Animal work",
    position: "bottom-[25%] left-[15%]",
    size: "w-56 h-56",
    hideOnMobile: true,
  },
  { src: "/team-lara.jpg", alt: "Team work", position: "top-[8%] right-[8%]", size: "w-40 h-52", hideOnMobile: true },
  {
    src: "/team-enzo.jpg",
    alt: "Event work",
    position: "bottom-[15%] right-[28%]",
    size: "w-52 h-64",
    hideOnMobile: true,
  },
  {
    src: "/abstract-colorful-shapes.png",
    alt: "Creative work 1",
    position: "top-[12%] left-[20%]",
    size: "w-48 h-56",
    hideOnMobile: true,
  },
  {
    src: "/abstract-colorful-shapes.png",
    alt: "Creative work 2",
    position: "top-[65%] right-[5%]",
    size: "w-44 h-44",
    hideOnMobile: true,
  },
  {
    src: "/abstract-colorful-shapes.png",
    alt: "Creative work 3",
    position: "bottom-[30%] left-[2%]",
    size: "w-40 h-56",
    hideOnMobile: true,
  },
  {
    src: "/creative-work-4.jpg",
    alt: "Creative work 4",
    position: "top-[5%] left-[40%]",
    size: "w-52 h-40",
    hideOnMobile: true,
  },
  {
    src: "/creative-work-5.jpg",
    alt: "Creative work 5",
    position: "bottom-[8%] left-[30%]",
    size: "w-36 h-48",
    hideOnMobile: true,
  },
]

export function PortfolioCollage() {
  const collageRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      if (!collageRef.current) return

      const images = collageRef.current.querySelectorAll(".portfolio-image")
      const scrollY = window.scrollY

      const heroHeight = window.innerHeight
      const fadeStart = heroHeight * 0.7
      const fadeEnd = heroHeight * 1.2
      const newOpacity = Math.max(0, Math.min(1, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)))
      setOpacity(newOpacity)

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
    <div
      ref={collageRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity }}
    >
      {portfolioImages.map((image, index) => (
        <div
          key={index}
          className={`portfolio-image absolute ${image.position} ${image.size} opacity-0 animate-fade-in ${image.hideOnMobile ? "hidden md:block" : ""}`}
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
