"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  headline?: string
  subheadline?: string
  buttonText?: string
  buttonLink?: string
}

const defaultProps = {
  headline: "Ready to Grow Your Business?",
  subheadline: "Get in touch with us today to discuss your project.",
  buttonText: "Get a Free Consultation",
  buttonLink: "/contact",
}

export function CTASection(props: CTASectionProps) {
  const {
    headline = defaultProps.headline,
    subheadline = defaultProps.subheadline,
    buttonText = defaultProps.buttonText,
    buttonLink = defaultProps.buttonLink,
  } = props

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as any }}
          className="relative bg-[#0a0a0a] rounded-[3rem] p-12 lg:p-20 overflow-hidden text-center shadow-2xl border border-white/5"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-indigo-500/10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
              Ready to <span className="text-gradient">transform</span> your digital presence?
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed font-medium">
              Join hundreds of successful businesses that have scaled with our 
              strategic digital solutions. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105"
              >
                <Link href={buttonLink}>
                  {buttonText}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 bg-white/5 backdrop-blur-sm px-10 h-14 text-lg rounded-full transition-all hover:scale-105"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Trust markers or small stats could go here */}
              <div className="text-white/60 text-sm font-medium tracking-widest uppercase">Trusted by 50+ Global Brands</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

