import type { Metadata } from "next"
import { BlogList } from "@/components/BlogList"
import { getAllBlogPosts } from "@/sanity/lib/fetch"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tips, and trends in web development, digital marketing, UI/UX design, and technology.",
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-indigo-500/10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              Stay Updated
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Our <span className="text-gradient">Insights</span> & Perspectives
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
              Discover the latest trends, strategies, and innovations shaping the future of the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Blog List */}
      <BlogList posts={posts} />

      {/* Newsletter */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
             <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Weekly Insights to Your Inbox</h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
                Join 5,000+ professionals who get our curated digest of digital strategy, design, and development news.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 h-14 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  type="submit"
                  className="px-10 h-14 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}