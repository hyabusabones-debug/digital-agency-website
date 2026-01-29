import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudiesData: Record<string, {
  title: string
  client: string
  category: string
  description: string
  image: string
  challenge: string
  solution: string
  results: { metric: string; label: string }[]
  technologies: string[]
  testimonial?: { quote: string; author: string; role: string }
}> = {
  "fashionhub-ecommerce": {
    title: "E-Commerce Platform Redesign",
    client: "FashionHub",
    category: "E-Commerce",
    description: "Complete redesign and development of an online fashion retailer, resulting in a 150% increase in conversions.",
    image: "/images/case-studies/ecommerce-platform.jpg",
    challenge: "FashionHub was struggling with an outdated e-commerce platform that suffered from slow load times, poor mobile experience, and a complicated checkout process. Their conversion rate was declining, and customer complaints about the shopping experience were increasing.",
    solution: "We conducted extensive user research to understand pain points and redesigned the entire shopping experience from the ground up. The new platform features a modern, responsive design, streamlined checkout process, personalized product recommendations, and advanced search functionality. We also implemented performance optimizations that reduced page load times by 70%.",
    results: [
      { metric: "150%", label: "Conversion Increase" },
      { metric: "3x", label: "Page Speed Improvement" },
      { metric: "45%", label: "Cart Abandonment Reduction" },
      { metric: "200%", label: "Mobile Revenue Growth" },
    ],
    technologies: ["Next.js", "Shopify", "Tailwind CSS", "Algolia", "Stripe"],
    testimonial: {
      quote: "The team transformed our online store completely. Our customers love the new experience, and our sales have never been better.",
      author: "Jessica Martinez",
      role: "CEO, FashionHub",
    },
  },
  "cloudsync-marketing": {
    title: "SaaS Marketing Campaign",
    client: "CloudSync",
    category: "Digital Marketing",
    description: "Comprehensive digital marketing strategy that drove qualified leads and reduced customer acquisition cost.",
    image: "/images/case-studies/saas-marketing.jpg",
    challenge: "CloudSync, a B2B SaaS company, was struggling to generate qualified leads at a sustainable cost. Their existing marketing efforts were producing low-quality leads that rarely converted to paying customers.",
    solution: "We developed an integrated marketing strategy combining content marketing, SEO optimization, targeted PPC campaigns, and marketing automation. We created detailed buyer personas and tailored messaging for each stage of the customer journey.",
    results: [
      { metric: "200%", label: "Lead Growth" },
      { metric: "40%", label: "Lower CAC" },
      { metric: "65%", label: "Lead Quality Improvement" },
      { metric: "3x", label: "Marketing ROI" },
    ],
    technologies: ["HubSpot", "Google Ads", "SEMrush", "Intercom"],
    testimonial: {
      quote: "Our lead generation has completely transformed. We are now getting the right leads at the right cost.",
      author: "David Kim",
      role: "VP Marketing, CloudSync",
    },
  },
  "medconnect-app": {
    title: "Healthcare App Development",
    client: "MedConnect",
    category: "Mobile Development",
    description: "Patient-facing mobile app for appointment scheduling, telehealth, and health tracking.",
    image: "/images/case-studies/healthcare-app.jpg",
    challenge: "MedConnect needed a patient-facing mobile application that could handle appointment scheduling, telehealth consultations, and health data tracking while maintaining strict HIPAA compliance.",
    solution: "We built a comprehensive mobile application for both iOS and Android using React Native. The app includes secure video consultations, appointment management, prescription tracking, and integration with wearable devices for health monitoring.",
    results: [
      { metric: "50K+", label: "Downloads" },
      { metric: "4.8", label: "App Store Rating" },
      { metric: "75%", label: "Appointment No-Show Reduction" },
      { metric: "60%", label: "Patient Satisfaction Increase" },
    ],
    technologies: ["React Native", "Node.js", "AWS", "Twilio", "HealthKit"],
    testimonial: {
      quote: "The app has revolutionized how we interact with our patients. It is intuitive, secure, and our patients love it.",
      author: "Dr. Sarah Thompson",
      role: "Chief Medical Officer, MedConnect",
    },
  },
  "techventures-website": {
    title: "Corporate Website Overhaul",
    client: "TechVentures",
    category: "Web Development",
    description: "Modern, responsive corporate website with advanced CMS capabilities and lead generation features.",
    image: "/images/case-studies/corporate-website.jpg",
    challenge: "TechVentures corporate website was outdated, slow, and difficult to update. The marketing team struggled to make content changes, and the site was not generating the leads the business needed.",
    solution: "We redesigned and rebuilt the website using modern technologies with a focus on performance and ease of use. The new site features a headless CMS for easy content management, integrated lead capture forms, and analytics tracking.",
    results: [
      { metric: "80%", label: "More Inquiries" },
      { metric: "2.5s", label: "Average Load Time" },
      { metric: "90%", label: "Content Update Time Reduction" },
      { metric: "120%", label: "Organic Traffic Growth" },
    ],
    technologies: ["Next.js", "Sanity CMS", "Vercel", "HubSpot"],
    testimonial: {
      quote: "Our new website is fast, beautiful, and our marketing team can finally make updates without developer help.",
      author: "Michael Roberts",
      role: "CMO, TechVentures",
    },
  },
  "startupx-design": {
    title: "Brand Identity & UX Design",
    client: "StartupX",
    category: "UI/UX Design",
    description: "Complete brand identity and user experience design for an innovative fintech startup.",
    image: "/images/case-studies/brand-identity.jpg",
    challenge: "StartupX, a new fintech startup, needed a complete brand identity and user experience design for their mobile-first banking platform that would appeal to younger demographics while building trust.",
    solution: "We created a comprehensive brand identity including logo, color palette, typography, and visual language. The UX design focused on simplicity and transparency, making complex financial information easy to understand.",
    results: [
      { metric: "95%", label: "User Satisfaction" },
      { metric: "60%", label: "Task Completion Rate Increase" },
      { metric: "40%", label: "Support Ticket Reduction" },
      { metric: "4.9", label: "User Experience Score" },
    ],
    technologies: ["Figma", "Principle", "Maze", "Hotjar"],
    testimonial: {
      quote: "They perfectly captured our vision and created a brand that resonates with our target audience.",
      author: "Emma Chen",
      role: "Founder, StartupX",
    },
  },
  "greenlife-marketing": {
    title: "Multi-Channel Marketing",
    client: "GreenLife",
    category: "Digital Marketing",
    description: "Integrated marketing campaign across social, search, and email for a sustainable products brand.",
    image: "/images/case-studies/multichannel.jpg",
    challenge: "GreenLife, a sustainable products brand, wanted to scale their customer acquisition while maintaining their values-driven messaging across all channels.",
    solution: "We developed an integrated multi-channel marketing strategy that maintained brand consistency while optimizing for each platform. This included social media content creation, influencer partnerships, SEO content, and email automation.",
    results: [
      { metric: "300%", label: "ROAS" },
      { metric: "25K", label: "New Customers" },
      { metric: "150%", label: "Social Engagement" },
      { metric: "45%", label: "Email Open Rate" },
    ],
    technologies: ["Meta Ads", "Klaviyo", "Shopify", "CreatorIQ"],
    testimonial: {
      quote: "They understood our brand values and helped us reach a much wider audience while staying true to who we are.",
      author: "Alex Green",
      role: "Founder, GreenLife",
    },
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudiesData[slug]
  
  if (!study) {
    return { title: "Case Study Not Found" }
  }

  return {
    title: `${study.title} | ${study.client}`,
    description: study.description,
  }
}

export function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }))
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = caseStudiesData[slug]

  if (!study) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
          <div className="max-w-3xl">
            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
              {study.category}
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-white">{study.title}</h1>
            <p className="mt-2 text-lg text-white/60">Client: {study.client}</p>
            <p className="mt-4 text-lg text-white/80">{study.description}</p>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={study.image || "/placeholder.svg"}
              alt={study.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {study.results.map((result) => (
              <div key={result.label} className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{result.metric}</div>
                <div className="mt-2 text-sm text-muted-foreground">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground">The Challenge</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Our Solution</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{study.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center">Technologies Used</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-12 h-12 mx-auto text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="mt-6 text-xl lg:text-2xl text-foreground font-medium leading-relaxed">
                {study.testimonial.quote}
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-foreground">{study.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{study.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Achieve Similar Results?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Let us help you transform your business with our proven strategies and expertise.
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
