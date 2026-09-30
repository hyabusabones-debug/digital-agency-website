"use client"

import { motion } from "framer-motion"
import { Users, Target, Headphones, Rocket, ShieldCheck, Sparkles } from "lucide-react"

const features = [
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "We value your time and ensure rapid turnaround for all our digital projects.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Solutions",
    description: "Building robust, secure applications that protect your data and user privacy.",
  },
  {
    icon: Sparkles,
    title: "Creative Edge",
    description: "Our designs aren't just functional; they're visually stunning and unique.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "A collective of industry experts dedicated to solving your complex challenges.",
  },
  {
    icon: Target,
    title: "Strategic Growth",
    description: "We don't just build; we strategize for your long-term business success.",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description: "Our commitment to you doesn't end at launch; we're here for the long haul.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-wider uppercase text-sm mb-4"
            >
              Our Value Proposition
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight"
            >
              Why partners <span className="text-gradient">choose</span> us
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            We don't just provide services; we build relationships and 
            deliver results that move the needle for your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as any }}
              whileHover={{ y: -10 }}
              className="relative bg-card rounded-[2rem] p-10 shadow-sm border border-border/50 border-t-2 border-t-transparent hover:border-t-primary hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group overflow-hidden"
            >
              {/* Large faint index number */}
              <span className="absolute top-6 right-8 text-6xl font-bold text-foreground/[0.04] font-heading select-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="relative text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}