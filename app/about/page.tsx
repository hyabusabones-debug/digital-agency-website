import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Users, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our digital agency, our mission, values, and the expert team behind our success.",
}

const values = [
  {
    icon: Target,
    title: "Results-Focused",
    description: "We measure success by the results we deliver for our clients.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open communication and honest reporting at every stage.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We genuinely care about the success of every project.",
  },
]

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "150+", label: "Happy Clients" },
  { value: "25+", label: "Team Members" },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/images/team/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Technical Director",
    image: "/images/team/michael.jpg",
  },
  {
    name: "Emily Davis",
    role: "Creative Director",
    image: "/images/team/emily.jpg",
  },
  {
    name: "James Wilson",
    role: "Marketing Lead",
    image: "/images/team/james.jpg",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">About Us</h1>
            <p className="mt-4 text-lg text-white/80">
              We are a passionate team of digital experts dedicated to helping businesses succeed online.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Story</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Founded in 2014, Digital Agency started with a simple mission: to help businesses navigate the digital landscape and achieve meaningful growth. What began as a small team of passionate developers and marketers has grown into a full-service digital agency.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Over the years, we have had the privilege of working with hundreds of clients across various industries, from startups to established enterprises. Our approach combines creativity with data-driven strategies to deliver solutions that not only look great but also perform.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Today, we continue to evolve with the digital landscape, embracing new technologies and methodologies to ensure our clients stay ahead of the competition.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about/office.jpg"
                  alt="Our office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-md border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Our Mission</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value. We strive to be the partner of choice for companies seeking to thrive in the digital age.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-md border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Our Vision</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To be recognized as a leading digital agency that transforms how businesses connect with their audiences. We envision a future where every organization can harness the power of digital to achieve their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Values</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-xl p-8 shadow-md border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{value.title}</h3>
                <p className="mt-3 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Meet Our Team</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The talented people behind our success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Work Together?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Let us help you achieve your digital goals. Get in touch with our team today.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
