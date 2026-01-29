import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our comprehensive digital solutions including web development, digital marketing, UI/UX design, e-commerce, and mobile app development.",
}

const services = [
  {
    title: "Web Development",
    description: "We build responsive, scalable websites and web applications tailored to your business needs. From corporate sites to complex web platforms, our expert developers create solutions that drive results.",
    image: "/images/services/web-development.jpg",
    href: "/services/web-development",
    features: ["Custom Development", "CMS Solutions", "E-commerce Integration", "Performance Optimization"],
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence with our comprehensive digital marketing services. We create data-driven strategies to increase your visibility and drive qualified traffic to your business.",
    image: "/images/services/digital-marketing.jpg",
    href: "/services/digital-marketing",
    features: ["SEO Optimization", "PPC Campaigns", "Social Media Marketing", "Content Strategy"],
  },
  {
    title: "UI/UX Design",
    description: "Create engaging user experiences that convert. Our design team crafts intuitive interfaces that delight users and achieve your business objectives.",
    image: "/images/services/ui-ux-design.jpg",
    href: "/services/ui-ux-design",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
  },
  {
    title: "E-Commerce Solutions",
    description: "Launch and grow your online store with our e-commerce expertise. We build secure, scalable platforms that provide seamless shopping experiences.",
    image: "/images/services/ecommerce.jpg",
    href: "/services/ecommerce",
    features: ["Store Development", "Payment Integration", "Inventory Management", "Analytics Setup"],
  },
  {
    title: "Mobile App Development",
    description: "Reach your customers on any device with custom mobile applications. We develop native and cross-platform apps for iOS and Android.",
    image: "/images/services/mobile-app.jpg",
    href: "/services/mobile-app-development",
    features: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Store Optimization"],
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Our Services</h1>
            <p className="mt-4 text-lg text-white/80">
              Comprehensive digital solutions to help your business thrive in the modern marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Contact us today to discuss how we can help transform your digital presence.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
