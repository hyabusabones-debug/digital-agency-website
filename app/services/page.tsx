import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllServices } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our comprehensive digital solutions including web development, digital marketing, UI/UX design, e-commerce, and mobile app development.",
}

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-purple-500/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/10 via-transparent to-transparent -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              Our Expertise
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Digital Solutions <br />
              <span className="text-gradient">Engineered</span> for Growth
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
              We combine strategy, design, and technology to deliver comprehensive digital solutions that help your business thrive in the modern marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-24 lg:gap-40">
            {services?.map((service, index) => (
              <div
                key={service._id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : "relative"}>
                   <div className="aspect-[4/3] relative rounded-[3rem] overflow-hidden shadow-2xl border border-border/50 group">
                    {service.image ? (
                      <Image
                        src={urlFor(service.image).width(1000).height(750).url()}
                        alt={service.title || ""}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  {/* Decorative background blur */}
                  <div className={`absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full ${index % 2 === 1 ? "left-auto -right-10" : "right-auto -left-10"}`} />
                </div>
                
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="text-5xl font-black text-primary/10 tracking-tighter">0{index + 1}</span>
                     <div className="h-px flex-1 bg-primary/20" />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                    {service.shortDescription}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {service.features?.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild size="lg" className="h-14 px-8 bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-2xl font-bold transition-all group">
                    <Link href={`/services/${service.slug}`}>
                      Discover More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-6xl mx-auto bg-card border border-border/50 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight">
                  Need a custom <span className="text-primary">solution</span>?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                  We specialize in crafting tailored digital experiences that solve unique business challenges. Let's discuss your next breakthrough.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button asChild size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
                    <Link href="/contact">Get a Free Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-16 px-12 border-border text-foreground hover:bg-muted text-lg font-bold rounded-2xl transition-all">
                    <Link href="/case-studies">View Case Studies</Link>
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

