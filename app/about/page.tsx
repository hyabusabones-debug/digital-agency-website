import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Users, Award, Clock, ArrowRight, Shield, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAboutPage } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"
import { SanityContent } from "@/components/SanityContent"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our digital agency, our mission, values, and the expert team behind our success.",
}

const valueIcons: Record<string, any> = {
  Target, Eye, Heart, Users, Award, Clock, Shield, Zap, Sparkles
}

export default async function AboutPage() {
  const about = await getAboutPage()

  if (!about) return null

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-indigo-500/10 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              Our Agency
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              {about.heroHeadline}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
              {about.heroSubheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/30 -skew-x-12 translate-x-1/2 pointer-events-none" />
         
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-6">
                 Since 2022
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 tracking-tight">Our Story</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                 <SanityContent value={about.companyStory} />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-background relative z-10">
                {about.heroImage ? (
                  <Image
                    src={urlFor(about.heroImage).width(1000).height(1000).url()}
                    alt="About our agency"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-primary text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('/grid-white.svg')] opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {about.stats?.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl lg:text-7xl font-bold mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-card rounded-[3rem] p-12 lg:p-16 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
              <div className="text-lg text-muted-foreground leading-relaxed">
                 <SanityContent value={about.mission} />
              </div>
            </div>
            <div className="bg-card rounded-[3rem] p-12 lg:p-16 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Our Vision</h3>
              <div className="text-lg text-muted-foreground leading-relaxed">
                 <SanityContent value={about.vision} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight">Our Core Values</h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              The principles that define our culture and drive our pursuit of excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {about.values?.map((value) => {
               const Icon = valueIcons[value.icon as string] || Heart
               return (
                  <div key={value.title} className="bg-card rounded-[2.5rem] p-10 shadow-sm border border-border/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
               )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight">Meet the Experts</h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              A diverse team of designers, developers, and strategists committed to your success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {about.teamMembers?.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-xl mb-6 border border-border/50">
                   {member.image ? (
                      <Image
                        src={urlFor(member.image).width(600).height(750).url()}
                        alt={member.name || ""}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                   ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Users className="w-12 h-12 text-muted-foreground" />
                      </div>
                   )}
                   <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-xs font-medium leading-relaxed line-clamp-3">
                         {member.bio}
                      </p>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-[#0a0a0a] rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-indigo-500/20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-7xl font-bold mb-10 tracking-tighter leading-tight">
                  Ready to build the <br />
                  <span className="text-gradient">future</span> together?
                </h2>
                <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                  Whether you're a startup or an established enterprise, we're here to help you scale your digital impact.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button asChild size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-16 px-12 border-white/20 text-white hover:bg-white/10 text-lg font-bold rounded-2xl transition-all">
                    <Link href="/case-studies">View Our Work</Link>
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

