import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore our portfolio of successful projects and see how we have helped businesses achieve their digital goals.",
}

const caseStudies = [
  {
    title: "E-Commerce Platform Redesign",
    client: "FashionHub",
    category: "E-Commerce",
    description: "Complete redesign and development of an online fashion retailer, resulting in a 150% increase in conversions.",
    image: "/images/case-studies/ecommerce-platform.jpg",
    slug: "fashionhub-ecommerce",
    results: [
      { metric: "150%", label: "Conversion Increase" },
      { metric: "3x", label: "Page Speed" },
    ],
  },
  {
    title: "SaaS Marketing Campaign",
    client: "CloudSync",
    category: "Digital Marketing",
    description: "Comprehensive digital marketing strategy that drove qualified leads and reduced customer acquisition cost.",
    image: "/images/case-studies/saas-marketing.jpg",
    slug: "cloudsync-marketing",
    results: [
      { metric: "200%", label: "Lead Growth" },
      { metric: "40%", label: "Lower CAC" },
    ],
  },
  {
    title: "Healthcare App Development",
    client: "MedConnect",
    category: "Mobile Development",
    description: "Patient-facing mobile app for appointment scheduling, telehealth, and health tracking.",
    image: "/images/case-studies/healthcare-app.jpg",
    slug: "medconnect-app",
    results: [
      { metric: "50K+", label: "Downloads" },
      { metric: "4.8", label: "App Rating" },
    ],
  },
  {
    title: "Corporate Website Overhaul",
    client: "TechVentures",
    category: "Web Development",
    description: "Modern, responsive corporate website with advanced CMS capabilities and lead generation features.",
    image: "/images/case-studies/corporate-website.jpg",
    slug: "techventures-website",
    results: [
      { metric: "80%", label: "More Inquiries" },
      { metric: "2.5s", label: "Load Time" },
    ],
  },
  {
    title: "Brand Identity & UX Design",
    client: "StartupX",
    category: "UI/UX Design",
    description: "Complete brand identity and user experience design for an innovative fintech startup.",
    image: "/images/case-studies/brand-identity.jpg",
    slug: "startupx-design",
    results: [
      { metric: "95%", label: "User Satisfaction" },
      { metric: "60%", label: "Task Completion" },
    ],
  },
  {
    title: "Multi-Channel Marketing",
    client: "GreenLife",
    category: "Digital Marketing",
    description: "Integrated marketing campaign across social, search, and email for a sustainable products brand.",
    image: "/images/case-studies/multichannel.jpg",
    slug: "greenlife-marketing",
    results: [
      { metric: "300%", label: "ROAS" },
      { metric: "25K", label: "New Customers" },
    ],
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Case Studies</h1>
            <p className="mt-4 text-lg text-white/80">
              Discover how we have helped businesses transform their digital presence and achieve remarkable results.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group"
              >
                <article className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground">{study.client}</p>
                    <h2 className="mt-1 text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {study.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground text-sm flex-1">
                      {study.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex gap-6">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <div className="text-lg font-bold text-primary">{result.metric}</div>
                          <div className="text-xs text-muted-foreground">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Let us help you achieve similar results for your business.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
