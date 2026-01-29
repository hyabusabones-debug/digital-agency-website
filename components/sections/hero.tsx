"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

const defaultProps = {
  headline: "Empowering Your Business in the Digital Era",
  subheadline: "Innovative solutions to help you grow and succeed online.",
  ctaText: "Get Started",
  ctaLink: "/contact",
  secondaryCtaText: "Our Services",
  secondaryCtaLink: "/services",
}

export function HeroSection(props: HeroSectionProps) {
  const {
    headline = defaultProps.headline,
    subheadline = defaultProps.subheadline,
    ctaText = defaultProps.ctaText,
    ctaLink = defaultProps.ctaLink,
    secondaryCtaText = defaultProps.secondaryCtaText,
    secondaryCtaLink = defaultProps.secondaryCtaLink,
  } = props

  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      )
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        {/* Animated Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-40 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Geometric Shapes */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <polygon points="800,0 1000,0 1000,400 600,200" fill="white" />
          <polygon points="900,200 1000,300 1000,600 700,400" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance"
          >
            {headline}
          </h1>
          <p
            ref={subheadlineRef}
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl"
          >
            {subheadline}
          </p>
          <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base"
            >
              <Link href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 h-12 text-base"
            >
              <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
