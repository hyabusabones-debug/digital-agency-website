"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]"
        />
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Innovation in Motion
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight text-balance"
          >
            {headline.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em]">
                {word === "Digital" ? (
                  <span className="text-gradient">{word}</span>
                ) : word}
              </span>
            ))}
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="mt-8 text-xl sm:text-2xl text-white/70 max-w-2xl leading-relaxed font-medium"
          >
            {subheadline}
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-5">
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md px-10 h-14 text-lg rounded-full transition-all hover:scale-105"
            >
              <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          </motion.div>

          {/* Trust Badge / Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 flex flex-wrap gap-10 border-t border-white/5 pt-10"
          >
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

