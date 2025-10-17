"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const team = [
  {
    name: "Lara Ceretta",
    position: "Diretora de Arte",
    image: "/team-lara.jpg",
  },
  {
    name: "Enzo Contieri",
    position: "Estrategista de Marca",
    image: "/team-enzo.jpg",
  },
  {
    name: "Luca Duarte",
    position: "Diretor Operacional",
    image: "/team-luca.jpg",
  },
]

export function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const sectionTop = rect.top
      const startTransition = windowHeight * 0.8
      const endTransition = windowHeight * 0.2

      let progress = 0

      if (sectionTop <= startTransition && sectionTop >= endTransition) {
        const rawProgress = (startTransition - sectionTop) / (startTransition - endTransition)
        progress = rawProgress * rawProgress * (3 - 2 * rawProgress)
        progress = Math.max(0, Math.min(1, progress))
      } else if (sectionTop < endTransition) {
        progress = 1
      }

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % team.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % team.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + team.length) % team.length)
  }

  return (
    <section
      id="our-team"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative transition-all duration-500"
      style={{
        backgroundColor: `rgb(${10 + (245 - 10) * (1 - scrollProgress)}, ${10 + (241 - 10) * (1 - scrollProgress)}, ${10 + (230 - 10) * (1 - scrollProgress)})`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-[800px] h-[800px] rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, rgba(232, 167, 46, ${0.08 + scrollProgress * 0.06}) 0%, rgba(232, 167, 46, ${0.04 + scrollProgress * 0.03}) 40%, transparent 70%)`,
            opacity: 0.5 + scrollProgress * 0.2,
            transform: `scale(${1 + scrollProgress * 0.2})`,
          }}
        />

        <div
          className="absolute top-1/3 -left-32 w-[600px] h-[700px] rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse, rgba(20, 59, 92, ${0.08 + scrollProgress * 0.05}) 0%, transparent 60%)`,
            opacity: 0.4 + scrollProgress * 0.15,
            transform: `rotate(${-30 + scrollProgress * 10}deg)`,
          }}
        />

        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse, rgba(232, 167, 46, ${0.06 + scrollProgress * 0.05}) 0%, rgba(20, 59, 92, ${0.03 + scrollProgress * 0.02}) 50%, transparent 70%)`,
            opacity: 0.4 + scrollProgress * 0.2,
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-24 text-center space-y-4 font-sans">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-500"
            style={{
              color: `rgb(${10 + (245 - 10) * scrollProgress}, ${10 + (241 - 10) * scrollProgress}, ${10 + (230 - 10) * scrollProgress})`,
            }}
          >
            Our Team
          </h2>
          <p
            className="text-lg md:text-xl font-light tracking-wide transition-colors duration-500"
            style={{
              color: `rgba(${10 + (245 - 10) * scrollProgress}, ${10 + (241 - 10) * scrollProgress}, ${10 + (230 - 10) * scrollProgress}, ${0.7 + scrollProgress * 0.1})`,
            }}
          >
            uma equipe pensando em você
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="group font-sans"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              <Card
                className="overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-0 relative"
                style={{
                  backgroundColor: `rgba(${245 + (20 - 245) * (1 - scrollProgress)}, ${241 + (30 - 241) * (1 - scrollProgress)}, ${230 + (30 - 230) * (1 - scrollProgress)}, ${0.05 + scrollProgress * 0.05})`,
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="aspect-[3/4] max-h-[310px] overflow-hidden relative">
                  <div
                    className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 50%, rgba(${10 + (245 - 10) * (1 - scrollProgress)}, ${10 + (241 - 10) * (1 - scrollProgress)}, ${10 + (230 - 10) * (1 - scrollProgress)}, 0.2))`,
                    }}
                  />
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 space-y-2 relative">
                  <h3
                    className="text-xl font-semibold tracking-tight transition-colors duration-500"
                    style={{
                      color: `rgb(${10 + (245 - 10) * scrollProgress}, ${10 + (241 - 10) * scrollProgress}, ${10 + (230 - 10) * scrollProgress})`,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-light tracking-wide uppercase transition-colors duration-500"
                    style={{
                      color: `rgba(${232}, ${167}, ${46}, ${0.85})`,
                    }}
                  >
                    {member.position}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="md:hidden relative max-w-sm mx-auto font-sans">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {team.map((member, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <Card
                    className="overflow-hidden shadow-xl border-0 relative"
                    style={{
                      backgroundColor: `rgba(${245 + (20 - 245) * (1 - scrollProgress)}, ${241 + (30 - 241) * (1 - scrollProgress)}, ${230 + (30 - 230) * (1 - scrollProgress)}, ${0.06 + scrollProgress * 0.06})`,
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="aspect-[3/4] max-h-[400px] overflow-hidden relative">
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          background: `linear-gradient(to bottom, transparent 50%, rgba(${10 + (245 - 10) * (1 - scrollProgress)}, ${10 + (241 - 10) * (1 - scrollProgress)}, ${10 + (230 - 10) * (1 - scrollProgress)}, 0.2))`,
                        }}
                      />
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 text-center space-y-2 relative">
                      <h3
                        className="text-xl font-semibold tracking-tight transition-colors duration-500"
                        style={{
                          color: `rgb(${10 + (245 - 10) * scrollProgress}, ${10 + (241 - 10) * scrollProgress}, ${10 + (230 - 10) * scrollProgress})`,
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-sm font-light tracking-wide uppercase"
                        style={{
                          color: `rgba(${232}, ${167}, ${46}, ${0.85})`,
                        }}
                      >
                        {member.position}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full transition-all duration-300 hover:scale-110 bg-transparent"
              style={{
                backgroundColor: `rgba(${245 + (20 - 245) * scrollProgress}, ${241 + (59 - 241) * scrollProgress}, ${230 + (92 - 230) * scrollProgress}, 0.1)`,
                borderColor: `rgba(${232}, ${167}, ${46}, 0.3)`,
                color: `rgb(${10 + (245 - 10) * scrollProgress}, ${10 + (241 - 10) * scrollProgress}, ${10 + (230 - 10) * scrollProgress})`,
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: index === currentIndex ? "#e8a72e" : `rgba(232, 167, 46, 0.3)`,
                    width: index === currentIndex ? "32px" : "8px",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full transition-all duration-300 hover:scale-110 bg-transparent"
              style={{
                backgroundColor: `rgba(${245 + (20 - 245) * scrollProgress}, ${241 + (59 - 241) * scrollProgress}, ${230 + (92 - 230) * scrollProgress}, 0.1)`,
                borderColor: `rgba(${232}, ${167}, ${46}, 0.3)`,
                color: `rgb(${10 + (245 - 10) * scrollProgress}, ${10 + (241 - 10) * scrollProgress}, ${10 + (230 - 10) * scrollProgress})`,
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
