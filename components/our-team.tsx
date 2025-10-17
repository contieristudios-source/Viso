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

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % team.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + team.length) % team.length)
  }

  return (
    <section id="our-team" ref={sectionRef} className="min-h-screen py-24 px-6 bg-card opacity-0">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">uma equipe pensando em você</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {team.map((member, index) => (
                <div key={index} className="w-full flex-shrink-0 px-6">
                  <Card className="overflow-hidden border-border bg-background shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{member.name}</h3>
                      <p className="text-muted-foreground text-sm">{member.position}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-transparent hover:bg-secondary/10 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex ? "bg-secondary w-8" : "bg-border w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-transparent hover:bg-secondary/10 transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
