"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-24 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-24 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-4"
          >
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Our expertise at your <span className="text-gradient">service</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We combine technical excellence with strategic thinking to deliver 
            impactful digital solutions that drive growth and engagement.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full"
              >
                <div className="relative h-full bg-card rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-2xl text-card-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-foreground group-hover:text-primary-foreground"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}