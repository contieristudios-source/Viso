"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface WhatWeOfferProps {
  isFormOpen: boolean
  setIsFormOpen: (open: boolean) => void
}

const services = [
  {
    title: "Aceleração de audiência",
    description:
      "através da produção de conteúdo nichado, criamos uma comunidade para engajamento e fidelização da sua marca, tornando-a autoridade no mercado.",
    align: "left",
  },
  {
    title: "Estratégia de marca",
    description: "entendemos o conceito da marca e polimos sua mensagem.",
    align: "right",
  },
  {
    title: "Novo conceito",
    description:
      "criamos e exploramos novas formas de inserção da sua marca através de canais de comunicação e experiential marketing.",
    align: "center",
  },
  {
    title: "Siga crescendo",
    description: "gestão de marketing voltada para crescimento a longo prazo.",
    align: "left",
  },
]

export function WhatWeOffer({ isFormOpen, setIsFormOpen }: WhatWeOfferProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".fade-item")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-fade-in-up")
              }, index * 150)
            })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsFormOpen(false)
    setFormData({ name: "", email: "", phone: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <section
        id="what-we-offer"
        ref={sectionRef}
        className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-32 fade-item opacity-0">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">Services</h2>
          </div>

          <div className="space-y-32 mb-32">
            {services.map((service, index) => (
              <div
                key={index}
                className={`fade-item opacity-0 group ${
                  service.align === "right"
                    ? "text-right ml-auto"
                    : service.align === "center"
                      ? "text-center mx-auto"
                      : "text-left"
                }`}
              >
                <div className="space-y-6">
                  <h3
                    className={`font-bold text-balance leading-tight transition-all duration-700 hover:scale-105 hover:tracking-wider cursor-default ${
                      index === 0
                        ? "text-6xl md:text-7xl"
                        : index === 1
                          ? "text-5xl md:text-6xl"
                          : index === 2
                            ? "text-7xl md:text-8xl"
                            : "text-5xl md:text-6xl"
                    }`}
                    style={{
                      animation: `slideInFromSide 1s ease-out ${index * 0.2}s both`,
                      animationName: service.align === "right" ? "slideInFromRight" : "slideInFromLeft",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty transition-all duration-700 group-hover:translate-x-2 group-hover:text-foreground max-w-4xl ${
                      service.align === "right" ? "ml-auto" : service.align === "center" ? "mx-auto" : ""
                    }`}
                  >
                    {service.description}
                  </p>
                  <div
                    className={`h-px bg-gradient-to-r ${
                      service.align === "right"
                        ? "from-transparent via-secondary/70 to-secondary/50"
                        : "from-secondary/50 via-secondary/70 to-transparent"
                    } w-full group-hover:w-3/4 transition-all duration-1000 group-hover:shadow-[0_0_20px_rgba(232,167,46,0.3)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="fade-item opacity-0 py-32 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight tracking-tight transition-all duration-500 hover:scale-105">
                Pronto para construir
                <br />
                uma comunidade?
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
                vamos desenvolver juntos uma estratégia que faça sentido para você.
              </p>
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 text-base md:text-lg px-10 py-6 mt-8 shadow-lg hover:shadow-2xl"
              >
                fale conosco
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-2xl font-bold mb-6">Fale Conosco</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail Corporativo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Enviar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
