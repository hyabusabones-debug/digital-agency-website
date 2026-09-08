import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Zap, Shield, Target, TrendingUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServiceBySlug, getAllServices } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"
import { SanityContent } from "@/components/SanityContent"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    return { title: "Service Not Found" }
  }

  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription,
  }
}

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({ slug: service.slug }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-indigo-500/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-bl from-primary/10 via-transparent to-transparent -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 mb-10 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-widest">All Services</span>
              </Link>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                {service.title}
              </h1>
              <div className="prose prose-lg dark:prose-invert text-white/70 mb-10 max-w-2xl leading-relaxed">
                 <SanityContent value={service.description} />
              </div>
              <Button asChild size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 group">
                {service.image ? (
                  <Image
                    src={urlFor(service.image).width(1000).height(1000).url()}
                    alt={service.title || ""}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">Expert Capabilities</h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                We deliver high-impact solutions through a blend of technical mastery and creative vision.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {service.features?.map((feature: string, index: number) => (
              <div key={index} className="bg-card rounded-[2.5rem] p-12 shadow-sm border border-border/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      <Zap className="w-7 h-7 text-primary" />
                   </div>
                   <h3 className="text-2xl font-bold text-foreground mb-4">{feature}</h3>
                   <p className="text-muted-foreground leading-relaxed">
                      Tailored {service.title} expertise specifically engineered to solve your complex digital challenges.
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">Our Workflow</h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                A structured, transparent process that ensures your project is delivered on time and beyond expectations.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {service.processSteps?.map((step: { title: string; description: string }, index: number) => (
              <div key={index} className="relative group">
                {index < (service.processSteps?.length || 0) - 1 && (
                   <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-linear-to-r from-primary/30 to-transparent -translate-x-12 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto rounded-[2rem] bg-card border border-border/50 shadow-xl flex items-center justify-center text-3xl font-black text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                     {step.description || `Methodical execution to guarantee optimal project performance and quality.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-6">
                 Why Choose Us
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-8">Business Impact</h2>
              <p className="text-xl text-muted-foreground mb-12 font-medium">
                We don't just build features; we create strategic assets that drive measurable growth for your brand.
              </p>
              <ul className="space-y-6">
                {service.features?.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <Check className="w-5 h-5 text-primary group-hover:text-white" />
                    </div>
                    <span className="text-lg font-bold text-foreground/80 group-hover:text-primary transition-colors">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-first relative">
              <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl group">
                {service.image ? (
                   <Image
                    src={urlFor(service.image).width(1000).height(1000).url()}
                    alt={`${service.title} benefits`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                   <div className="w-full h-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-card border border-border p-6 rounded-3xl shadow-2xl animate-bounce-slow">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <span className="font-bold text-sm">ROI Focused</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-linear-to-br from-primary to-indigo-700 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-white.svg')] opacity-10" />
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tighter">Ready to scale your <br /><span className="text-white/80 italic">digital presence</span>?</h2>
                <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                  Join forward-thinking brands who have leveraged our {service.title} expertise to redefine their market position.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button asChild size="lg" className="h-16 px-12 bg-white text-primary hover:bg-white/90 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
                    <Link href="/contact">Book a Strategy Session</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-16 px-12 border-white/20 text-white hover:bg-white/10 text-lg font-bold rounded-2xl transition-all">
                    <Link href="/case-studies">Explore Portfolio</Link>
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

