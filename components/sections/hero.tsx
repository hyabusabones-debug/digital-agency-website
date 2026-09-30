"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useInView, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  accentWord?: string
}

const defaultProps = {
  headline: "Empowering Your Business in the Digital Era",
  subheadline: "Innovative solutions to help you grow and succeed online.",
  ctaText: "Get Started",
  ctaLink: "/contact",
  secondaryCtaText: "Our Services",
  secondaryCtaLink: "/services",
  accentWord: "Digital",
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let frame: number
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-4xl font-bold text-white tabular-nums">
        {display}
        {suffix}
      </div>
      <div className="text-sm text-white/50 mt-1 font-medium">{label}</div>
    </div>
  )
}

export function HeroSection(props: HeroSectionProps) {
  const {
    headline = defaultProps.headline,
    subheadline = defaultProps.subheadline,
    ctaText = defaultProps.ctaText,
    ctaLink = defaultProps.ctaLink,
    secondaryCtaText = defaultProps.secondaryCtaText,
    secondaryCtaLink = defaultProps.secondaryCtaLink,
    accentWord = defaultProps.accentWord,
  } = props

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window
    mouseX.set((e.clientX / innerWidth - 0.5) * 30)
    mouseY.set((e.clientY / innerHeight - 0.5) * 30)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
        {/* Single soft glow behind the graphic */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Faint dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Copy column */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Digital Agency</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight text-balance"
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.22em] last:mr-0">
                  {word === accentWord ? (
                    <span className="font-serif italic font-medium text-primary">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-xl text-white/70 max-w-xl leading-relaxed font-medium"
            >
              {subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center gap-8">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 border-none"
              >
                <Link href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Link
                href={secondaryCtaLink}
                className="group inline-flex items-center gap-2 text-white font-semibold text-lg"
              >
                <span className="border-b border-white/30 group-hover:border-primary transition-colors pb-0.5">
                  {secondaryCtaText}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-20 flex flex-wrap gap-10 sm:gap-14 border-t border-white/10 pt-10"
            >
              <AnimatedStat value={500} suffix="+" label="Projects Delivered" />
              <AnimatedStat value={99} suffix="%" label="Client Satisfaction" />
              <AnimatedStat value={15} suffix="+" label="Years Experience" />
            </motion.div>
          </motion.div>

          {/* Graphic column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ x: springX, y: springY }}
            className="hidden lg:block relative h-[480px]"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "200px 200px" }}
              >
                <circle cx="200" cy="200" r="160" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
                <circle cx="200" cy="40" r="6" className="fill-primary" />
              </motion.g>
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "200px 200px" }}
              >
                <circle
                  cx="200"
                  cy="200"
                  r="110"
                  stroke="white"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle cx="310" cy="200" r="4" fill="white" fillOpacity="0.6" />
              </motion.g>
              <circle cx="200" cy="200" r="60" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
              <circle cx="200" cy="200" r="3" fill="white" />
            </svg>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-0 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Avg. launch time</div>
                  <div className="text-xs text-white/50">4–6 weeks, not months</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}