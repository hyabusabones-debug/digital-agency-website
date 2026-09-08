import React from "react"
import { getGlobalSettings } from "@/sanity/lib/fetch"
import { ContactForm } from "@/components/ContactForm"
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Contact Us",
  description: "Ready to start your project? Get in touch with us today and let's discuss how we can help.",
}

export default async function ContactPage() {
  const settings = await getGlobalSettings()

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-indigo-500/10 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Let's build something <br />
              <span className="text-gradient">extraordinary</span>.
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
              Ready to start your project? Get in touch with us today and let's discuss how we can help your business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-bold text-foreground mb-8 tracking-tight">Contact Information</h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Whether you have a specific project in mind or just want to explore the possibilities, we're here to guide you.
              </p>

              <div className="space-y-8 mb-16">
                {settings?.contactInfo?.email && (
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Email Us</h3>
                      <a
                        href={`mailto:${settings.contactInfo.email}`}
                        className="text-xl font-bold text-foreground hover:text-primary transition-colors break-all"
                      >
                        {settings.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contactInfo?.phone && (
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                      <Phone className="w-6 h-6 text-indigo-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Call Us</h3>
                      <a
                        href={`tel:${settings.contactInfo.phone.replace(/\s+/g, '')}`}
                        className="text-xl font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {settings.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contactInfo?.address && (
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                      <MapPin className="w-6 h-6 text-purple-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Visit Us</h3>
                      <p className="text-xl font-bold text-foreground leading-tight">
                        {settings.contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Office Hours / Availability */}
              <div className="p-10 bg-muted/50 rounded-[2.5rem] border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                   <Clock className="w-5 h-5 text-primary" />
                   <h3 className="font-bold text-foreground uppercase tracking-widest text-sm">Response Time</h3>
                </div>
                <p className="text-muted-foreground font-medium mb-6">
                   We typically respond to all inquiries within 24 business hours.
                </p>
                <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   Currently Available for Projects
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
               <div className="bg-card rounded-[3rem] p-8 lg:p-16 shadow-2xl border border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                  <ContactForm />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map / Locations */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">Our Presence</h2>
              <p className="text-xl text-muted-foreground font-medium">
                 While we operate globally, we are headquartered in the heart of innovation.
              </p>
           </div>
           
           <div className="aspect-21/9 rounded-[3rem] overflow-hidden shadow-2xl bg-[#0a0a0a] relative group border border-border/50">
              <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                 {/* This would be an interactive map component normally */}
                 <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1/1200x600?access_token=YOUR_TOKEN')] bg-cover bg-center" />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex items-center gap-4 text-white">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl">
                       <Globe className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                       <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-1">Global Support</p>
                       <p className="text-2xl font-bold">24/7 Digital Operations</p>
                    </div>
                 </div>
                 <Button asChild variant="outline" className="h-14 px-10 border-white/20 text-white hover:bg-white/10 rounded-2xl font-bold backdrop-blur-md">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                       View Directions
                    </a>
                 </Button>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

