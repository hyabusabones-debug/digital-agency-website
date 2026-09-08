import { HeroSection } from "@/components/sections/hero"
import { ServicesStrip } from "@/components/sections/services-strip"
import { ServicesGrid } from "@/components/sections/services-grid"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { CTASection } from "@/components/sections/cta-section"
import { getHomepage, getAllServices, getAllBlogPosts } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const revalidate = 60

export default async function HomePage() {
  const [homepage, services, posts] = await Promise.all([
    getHomepage(),
    getAllServices(),
    getAllBlogPosts(),
  ])

  // Get only top 3 posts for the teaser
  const recentPosts = posts?.slice(0, 3) || []

  // Transform services for the grid component
  const transformedServices = services?.map((service) => ({
    title: service.title,
    shortDescription: service.shortDescription,
    image: service.image ? urlFor(service.image).width(800).height(600).url() : undefined,
    slug: service.slug,
  }))

  return (
    <>
      <HeroSection
        headline={homepage?.heroHeadline}
        subheadline={homepage?.heroSubheadline}
        ctaText={homepage?.heroCTAText}
        ctaLink={homepage?.heroCTALink}
        secondaryCtaText={homepage?.heroSecondaryCTAText}
        secondaryCtaLink={homepage?.heroSecondaryCTALink}
      />
      <ServicesStrip items={homepage?.servicesStripItems} />
      <ServicesGrid services={transformedServices} />
      <WhyChooseUs />
      <CTASection
        headline={homepage?.ctaSectionHeadline}
        subheadline={homepage?.ctaSectionSubheadline}
        buttonText={homepage?.ctaSectionButtonText}
        buttonLink={homepage?.ctaSectionButtonLink}
      />

      {/* Latest Blog Posts Teaser – Top 3 */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Latest <span className="text-gradient">Insights</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Stay ahead with our latest thoughts on digital trends, development, and marketing strategies.
              </p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-background border border-border rounded-full text-foreground font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm group">
              View All Posts
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recentPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group h-full">
                <article className="bg-card rounded-[2.5rem] overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500 h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage).width(800).height(500).url()}
                        alt={post.title || ""}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Image src="/placeholder.svg" alt="placeholder" width={80} height={80} />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-1.5 bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold rounded-xl uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 font-medium">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-4 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="pt-8 border-t border-border/50 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative border border-background shadow-sm">
                             {post.author?.image && <Image src={urlFor(post.author.image).width(60).height(60).url()} alt={post.author.name || ""} fill />}
                          </div>
                          <span className="text-sm font-bold text-foreground">{post.author?.name}</span>
                       </div>
                       <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-foreground group-hover:text-primary-foreground group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}