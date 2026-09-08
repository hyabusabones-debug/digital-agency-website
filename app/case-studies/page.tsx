import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllCaseStudies } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore our portfolio of successful projects and see how we have helped businesses achieve their digital goals.",
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-purple-500/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/10 via-transparent to-transparent -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              Our Success Stories
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Transforming <span className="text-gradient">Ideas</span> Into Impact
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
              Explore our portfolio of successful projects and see how we've helped businesses across industries achieve their digital goals.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {caseStudies.map((study, index) => (
              <div key={study._id} className={index % 2 === 1 ? "lg:mt-24" : ""}>
                <Link href={`/case-studies/${study.slug}`} className="group block">
                  <article className="relative bg-card rounded-[3rem] overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-700">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {study.featuredImage ? (
                        <Image
                          src={urlFor(study.featuredImage).width(1200).height(750).url()}
                          alt={study.projectName || ""}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Briefcase className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                      
                      <div className="absolute bottom-10 left-10 right-10">
                         <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-bold rounded-lg uppercase tracking-widest">
                              {study.industry}
                            </span>
                         </div>
                         <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                           {study.projectName}
                         </h2>
                         <p className="text-white/70 font-medium">{study.client}</p>
                      </div>
                    </div>
                    
                    <div className="p-10 lg:p-12">
                      <p className="text-lg text-muted-foreground leading-relaxed mb-10 line-clamp-2">
                        {study.shortDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-8 items-center justify-between">
                         <div className="flex gap-8">
                            {study.results?.slice(0, 2).map((result) => (
                              <div key={result.metric}>
                                <div className="text-2xl font-bold text-foreground tracking-tight">{result.value}</div>
                                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">{result.metric}</div>
                              </div>
                            ))}
                         </div>
                         
                         <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                            <ArrowRight className="w-6 h-6 text-foreground group-hover:text-primary-foreground group-hover:translate-x-1 transition-all" />
                         </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20 group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             
             <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to be our next <br className="hidden md:block" />
                <span className="text-black/30">success story?</span>
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto font-medium">
                Let's discuss how our expertise can help you achieve similar results and transform your digital landscape.
              </p>
              <Button asChild size="lg" className="h-16 px-12 bg-white text-primary hover:bg-white/90 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
                <Link href="/contact">
                  Start Your Project Today
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

