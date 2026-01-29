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
    <section className="relative z-20 -mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code2
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                  className="p-6 lg:p-8 flex items-center gap-4 cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
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
