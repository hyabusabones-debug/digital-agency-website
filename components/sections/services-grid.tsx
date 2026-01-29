"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const defaultServices = [
  {
    title: "Web Development",
    shortDescription: "Responsive & scalable websites",
    image: "/images/services/web-development.jpg",
    slug: "web-development",
  },
  {
    title: "Digital Marketing",
    shortDescription: "Boost your online presence",
    image: "/images/services/digital-marketing.jpg",
    slug: "digital-marketing",
  },
  {
    title: "UI/UX Design",
    shortDescription: "Engaging user experiences",
    image: "/images/services/ui-ux-design.jpg",
    slug: "ui-ux-design",
  },
  {
    title: "E-Commerce Solutions",
    shortDescription: "Online store development",
    image: "/images/services/ecommerce.jpg",
    slug: "ecommerce",
  },
  {
    title: "Mobile App Development",
    shortDescription: "iOS & Android apps",
    image: "/images/services/mobile-app.jpg",
    slug: "mobile-app-development",
  },
]

interface ServiceItem {
  title: string
  shortDescription: string
  image?: string
  slug: string
}

interface ServicesGridProps {
  services?: ServiceItem[]
}

export function ServicesGrid({ services: propServices }: ServicesGridProps) {
  const services = propServices && propServices.length > 0 ? propServices : defaultServices
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card")
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-foreground"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            We provide a wide range of digital solutions.
          </motion.p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.slice(0, 4).map((service) => (
            <Link
              key={service.title}
              href={`/services/${service.slug}`}
              className="service-card group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.shortDescription}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Fifth service - Mobile App - Full width on mobile, half on larger */}
        {services[4] && (
          <div className="mt-6">
            <Link
              href={`/services/${services[4].slug}`}
              className="service-card group block max-w-md mx-auto lg:max-w-none lg:w-1/4"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <Image
                    src={services[4].image || "/placeholder.svg"}
                    alt={services[4].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {services[4].title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {services[4].shortDescription}
                  </p>
                </div>
              </motion.div>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
