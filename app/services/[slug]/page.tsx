import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const servicesData: Record<string, {
  title: string
  description: string
  longDescription: string
  image: string
  features: { title: string; description: string }[]
  process: { step: number; title: string; description: string }[]
  benefits: string[]
}> = {
  "web-development": {
    title: "Web Development",
    description: "Custom websites and web applications built to scale",
    longDescription: "We create powerful, scalable web solutions that drive business growth. Our development team combines cutting-edge technologies with proven methodologies to deliver websites and applications that exceed expectations.",
    image: "/images/services/web-development.jpg",
    features: [
      { title: "Custom Development", description: "Tailored solutions built from the ground up to match your unique requirements." },
      { title: "Responsive Design", description: "Websites that look and function perfectly on all devices and screen sizes." },
      { title: "CMS Integration", description: "Easy-to-use content management systems for seamless updates." },
      { title: "Performance Optimization", description: "Fast-loading pages optimized for search engines and user experience." },
    ],
    process: [
      { step: 1, title: "Discovery", description: "We analyze your requirements, goals, and target audience." },
      { step: 2, title: "Planning", description: "Creating detailed project roadmap and technical specifications." },
      { step: 3, title: "Development", description: "Building your solution with clean, maintainable code." },
      { step: 4, title: "Launch & Support", description: "Deploying your project and providing ongoing maintenance." },
    ],
    benefits: ["Increased online visibility", "Better user engagement", "Higher conversion rates", "Scalable architecture", "SEO-friendly structure"],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence",
    longDescription: "Our digital marketing services help you reach your target audience and convert them into loyal customers. We use data-driven strategies and proven techniques to maximize your ROI.",
    image: "/images/services/digital-marketing.jpg",
    features: [
      { title: "SEO Optimization", description: "Improve your search rankings and drive organic traffic." },
      { title: "PPC Campaigns", description: "Targeted advertising that delivers measurable results." },
      { title: "Social Media Marketing", description: "Build brand awareness and engage with your audience." },
      { title: "Content Strategy", description: "Compelling content that attracts and retains customers." },
    ],
    process: [
      { step: 1, title: "Audit", description: "Comprehensive analysis of your current digital presence." },
      { step: 2, title: "Strategy", description: "Developing a customized marketing plan aligned with your goals." },
      { step: 3, title: "Execution", description: "Implementing campaigns across selected channels." },
      { step: 4, title: "Optimization", description: "Continuous monitoring and improvement for best results." },
    ],
    benefits: ["Increased brand awareness", "Higher quality leads", "Better ROI", "Data-driven decisions", "Competitive advantage"],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description: "User-centered design that drives engagement",
    longDescription: "We create intuitive, visually stunning interfaces that users love. Our design process is rooted in research and focused on delivering experiences that achieve your business objectives.",
    image: "/images/services/ui-ux-design.jpg",
    features: [
      { title: "User Research", description: "Understanding your users through interviews, surveys, and analytics." },
      { title: "Wireframing", description: "Creating blueprint layouts to plan the user journey." },
      { title: "Prototyping", description: "Interactive mockups to test and refine designs before development." },
      { title: "Visual Design", description: "Beautiful, on-brand interfaces that delight users." },
    ],
    process: [
      { step: 1, title: "Research", description: "Deep dive into user needs and business requirements." },
      { step: 2, title: "Ideation", description: "Brainstorming and exploring design concepts." },
      { step: 3, title: "Design", description: "Creating high-fidelity designs and prototypes." },
      { step: 4, title: "Testing", description: "Validating designs with real users and iterating." },
    ],
    benefits: ["Improved user satisfaction", "Higher conversion rates", "Reduced development costs", "Stronger brand identity", "Competitive differentiation"],
  },
  "ecommerce": {
    title: "E-Commerce Solutions",
    description: "Online stores built to sell and scale",
    longDescription: "Launch and grow your online business with our comprehensive e-commerce solutions. We build secure, scalable platforms that provide seamless shopping experiences and drive sales.",
    image: "/images/services/ecommerce.jpg",
    features: [
      { title: "Store Development", description: "Custom e-commerce platforms tailored to your business model." },
      { title: "Payment Integration", description: "Secure payment processing with multiple gateway options." },
      { title: "Inventory Management", description: "Efficient systems to track and manage your products." },
      { title: "Analytics & Reporting", description: "Insights to understand customer behavior and optimize sales." },
    ],
    process: [
      { step: 1, title: "Analysis", description: "Understanding your products, market, and competition." },
      { step: 2, title: "Design", description: "Creating a shopping experience that converts visitors." },
      { step: 3, title: "Development", description: "Building a secure, scalable e-commerce platform." },
      { step: 4, title: "Launch & Growth", description: "Going live and implementing growth strategies." },
    ],
    benefits: ["24/7 sales capability", "Global market reach", "Automated operations", "Customer insights", "Scalable growth"],
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    description: "Native and cross-platform apps for iOS and Android",
    longDescription: "Reach your customers wherever they are with powerful mobile applications. We develop high-performance native and cross-platform apps that deliver exceptional user experiences.",
    image: "/images/services/mobile-app.jpg",
    features: [
      { title: "iOS Development", description: "Native apps optimized for iPhone and iPad." },
      { title: "Android Development", description: "Apps that work flawlessly across Android devices." },
      { title: "Cross-Platform", description: "Cost-effective solutions that work on both platforms." },
      { title: "App Store Optimization", description: "Strategies to improve visibility and downloads." },
    ],
    process: [
      { step: 1, title: "Concept", description: "Defining app features and target audience." },
      { step: 2, title: "Design", description: "Creating intuitive mobile-first user interfaces." },
      { step: 3, title: "Development", description: "Building performant, reliable mobile applications." },
      { step: 4, title: "Launch", description: "Publishing to app stores and gathering user feedback." },
    ],
    benefits: ["Direct customer engagement", "Enhanced brand presence", "Offline functionality", "Push notifications", "Revenue opportunities"],
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]
  
  if (!service) {
    return { title: "Service Not Found" }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white">{service.title}</h1>
              <p className="mt-4 text-lg text-white/80">{service.longDescription}</p>
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center">What We Offer</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Comprehensive solutions tailored to your specific needs.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-xl p-6 shadow-md border border-border">
                <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center">Our Process</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            A proven methodology that delivers results.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Key Benefits</h2>
              <p className="mt-4 text-muted-foreground">
                Discover the advantages of working with our expert team.
              </p>
              <ul className="mt-8 space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-first">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={`${service.title} benefits`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Let us help you transform your digital presence. Contact us today for a free consultation.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
