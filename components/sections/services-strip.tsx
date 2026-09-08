"use client"

import { motion } from "framer-motion"
import { Code2, Megaphone, Palette, ShoppingCart, Smartphone, Type as type, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Megaphone,
  Palette,
  ShoppingCart,
  Smartphone,
}

const defaultServices = [
  {
    icon: "Code2",
    title: "Web Development",
    description: "Custom websites & web apps",
  },
  {
    icon: "Megaphone",
    title: "Digital Marketing",
    description: "SEO, PPC & social media",
  },
  {
    icon: "Palette",
    title: "UI/UX Design",
    description: "User-friendly interfaces",
  },
]

interface ServicesStripItem {
  icon: string
  title: string
  description: string
}

interface ServicesStripProps {
  items?: ServicesStripItem[]
}

export function ServicesStrip({ items }: ServicesStripProps) {
  const services = items && items.length > 0 ? items : defaultServices
  return (
    <section className="relative z-20 -mt-20 lg:-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/10 dark:border-white/5 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code2
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98] as any
                  }}
                  whileHover={{ backgroundColor: "rgba(var(--primary), 0.02)" }}
                  className="p-8 lg:p-10 flex items-center gap-6 cursor-pointer group transition-all"
                >
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300" />
                    <IconComponent className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

