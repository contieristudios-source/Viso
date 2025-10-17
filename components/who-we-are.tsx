"use client"

import { useEffect, useRef } from "react"

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section id="who-we-are" ref={sectionRef} className="min-h-screen flex items-center py-24 px-6 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="fade-item opacity-0">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Who We Are</h2>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">Our Identity</p>
            </div>

            <div className="fade-item opacity-0 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Manifesto</h3>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Nós acreditamos que toda marca tem algo a dizer, mas poucas sabem como ser ouvidas. Comunicar é ter
                    uma narrativa clara, visualmente forte e emocionalmente verdadeira.
                  </p>
                  <p>
                    Na Viso, não seguimos o ruído. o que a marca quer realmente comunicar e traduzimos isso Acreditamos
                    no poder do audiovisual como ferramenta de estratégia posicionando ideias, molando percepções, sendo
                    megafone da sua voz.
                  </p>
                  <p>
                    Cada projeto é uma construção de identidade.
                    <br />
                    Cada roteiro é uma decisão de marca.
                    <br />
                    Cada frame carrega uma intenção:
                  </p>
                  <p className="font-semibold">
                    Somos a Viso.
                    <br />a história, a estética e o significado por trás de cada frame.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-item opacity-0">
            <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
              <img
                src="/modern-office-creative-workspace.jpg"
                alt="Viso workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
