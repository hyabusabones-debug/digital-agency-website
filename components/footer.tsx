import Link from "next/link"
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { getGlobalSettings } from "@/sanity/lib/fetch"

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
]

const resources = [
  { name: "FAQs", href: "/faqs" },
  { name: "Support", href: "/contact" },
]

const socialIconMap: Record<string, any> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
}

export async function Footer() {
  const settings = await getGlobalSettings()
  
  const socialLinks = settings?.socialLinks ? Object.entries(settings.socialLinks)
    .filter(([_, href]) => !!href)
    .map(([name, href]) => ({
      name,
      href,
      icon: socialIconMap[name.toLowerCase()] || Linkedin
    })) : []

  return (
    <footer className="bg-background border-t border-border/50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary rounded-lg rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-primary-foreground relative z-10"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {settings?.siteName || "ICTSERVE"}
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {settings?.footerText || "We're a team of creative minds and technical experts dedicated to building digital experiences that define the future."}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-8 uppercase tracking-widest text-sm">Company</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-8 uppercase tracking-widest text-sm">Resources</h3>
            <ul className="space-y-4">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-8 uppercase tracking-widest text-sm">Get in Touch</h3>
            <ul className="space-y-5">
              {settings?.contactInfo?.email && (
                <li>
                  <a
                    href={`mailto:${settings.contactInfo.email}`}
                    className="flex items-start gap-4 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground/50 uppercase">Email</span>
                      <span className="break-all">{settings.contactInfo.email}</span>
                    </div>
                  </a>
                </li>
              )}
              {settings?.contactInfo?.phone && (
                <li>
                  <a
                    href={`tel:${settings.contactInfo.phone.replace(/\s+/g, '')}`}
                    className="flex items-start gap-4 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground/50 uppercase">Phone</span>
                      <span>{settings.contactInfo.phone}</span>
                    </div>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {settings?.siteName || "ICTSERVE"}. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


