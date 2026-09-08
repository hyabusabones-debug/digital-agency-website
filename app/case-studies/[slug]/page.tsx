import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Quote, Globe, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCaseStudyBySlug, getAllCaseStudies } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"
import { SanityContent } from "@/components/SanityContent"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  
  if (!study) {
    return { title: "Case Study Not Found" }
  }

  return {
    title: study.seoTitle || `${study.projectName} | ${study.client}`,
    description: study.seoDescription || study.shortDescription,
  }
}

export async function generateStaticParams() {
  const studies = await getAllCaseStudies()
  return studies.map((study) => ({ slug: study.slug }))
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground mb-12 transition-all group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Back to Portfolio</span>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">
                {study.industry}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="text-sm text-muted-foreground font-medium">{study.client}</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-10 tracking-tight">
              {study.projectName}
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {study.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto aspect-21/9 relative rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border/50">
            {study.featuredImage ? (
              <Image
                src={urlFor(study.featuredImage).width(1600).height(700).url()}
                alt={study.projectName || ""}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
        </div>
      </section>

      {/* Stats / Results */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {study.results?.map((result, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-[2rem] p-10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-tight group-hover:scale-105 transition-transform">{result.value}</div>
                <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{result.metric}</div>
                {result.description && (
                   <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed">{result.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="pb-24 lg:pb-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                 <div>
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                          <Target className="w-6 h-6 text-orange-500" />
                       </div>
                       <h2 className="text-3xl font-bold tracking-tight">The Challenge</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert">
                       <SanityContent value={study.problem} />
                    </div>
                 </div>
                 
                 <div>
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                          < Globe className="w-6 h-6 text-primary" />
                       </div>
                       <h2 className="text-3xl font-bold tracking-tight">Our Solution</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert">
                       <SanityContent value={study.solution} />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl relative">
              <Quote className="w-16 h-16 mx-auto text-primary/20 mb-10" />
              <blockquote className="text-2xl lg:text-3xl text-foreground font-bold leading-tight mb-10 tracking-tight italic">
                "{study.testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="text-left">
                  <p className="font-bold text-foreground text-lg">{study.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground font-medium">{study.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Used */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12 tracking-tight">Services Delivered</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {study.services?.map((service) => (
              <span
                key={service}
                className="px-6 py-3 bg-muted/50 rounded-2xl text-sm font-bold text-foreground border border-border/50"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto bg-linear-to-r from-primary to-indigo-600 rounded-[3rem] p-12 lg:p-24 text-center text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-white.svg')] opacity-10" />
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight">Ready for your own results?</h2>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                   Join our portfolio of success stories. Let's build something extraordinary together.
                </p>
                <Button asChild size="lg" className="h-16 px-12 bg-white text-primary hover:bg-white/90 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
                  <Link href="/contact">
                    Let's Talk Business
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </Button>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

