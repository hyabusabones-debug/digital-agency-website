import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tips, and trends in web development, digital marketing, UI/UX design, and technology.",
}

const blogPosts = [
  {
    title: "10 Web Design Trends to Watch in 2026",
    excerpt: "Discover the latest design trends that are shaping the future of web experiences and how to implement them in your projects.",
    image: "/images/blog/design-trends.jpg",
    category: "Design",
    author: "Emily Davis",
    date: "January 15, 2026",
    readTime: "8 min read",
    slug: "web-design-trends-2026",
  },
  {
    title: "The Complete Guide to SEO in 2026",
    excerpt: "Everything you need to know about search engine optimization, from technical SEO to content strategy and beyond.",
    image: "/images/blog/seo-guide.jpg",
    category: "Marketing",
    author: "James Wilson",
    date: "January 10, 2026",
    readTime: "12 min read",
    slug: "complete-seo-guide-2026",
  },
  {
    title: "Building Scalable React Applications",
    excerpt: "Best practices and patterns for building React applications that scale with your business needs.",
    image: "/images/blog/react-scalable.jpg",
    category: "Development",
    author: "Michael Chen",
    date: "January 5, 2026",
    readTime: "10 min read",
    slug: "scalable-react-applications",
  },
  {
    title: "UX Research Methods Every Designer Should Know",
    excerpt: "A comprehensive overview of user research methods and when to use each one for maximum impact.",
    image: "/images/blog/ux-research.jpg",
    category: "Design",
    author: "Emily Davis",
    date: "December 28, 2025",
    readTime: "7 min read",
    slug: "ux-research-methods",
  },
  {
    title: "E-Commerce Conversion Optimization Strategies",
    excerpt: "Proven strategies to increase your online store conversion rates and boost revenue.",
    image: "/images/blog/ecommerce-conversion.jpg",
    category: "E-Commerce",
    author: "Sarah Johnson",
    date: "December 20, 2025",
    readTime: "9 min read",
    slug: "ecommerce-conversion-optimization",
  },
  {
    title: "The Future of AI in Digital Marketing",
    excerpt: "How artificial intelligence is transforming digital marketing and what it means for your business.",
    image: "/images/blog/ai-marketing.jpg",
    category: "Marketing",
    author: "James Wilson",
    date: "December 15, 2025",
    readTime: "11 min read",
    slug: "ai-digital-marketing-future",
  },
]

const categories = ["All", "Design", "Development", "Marketing", "E-Commerce"]

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Blog</h1>
            <p className="mt-4 text-lg text-white/80">
              Insights, tips, and trends in web development, digital marketing, and design.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="aspect-[16/10] relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">{featuredPost.category}</span>
                <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-sm font-medium text-primary">{post.category}</span>
                    <h3 className="mt-2 text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground text-sm flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground">Subscribe to Our Newsletter</h2>
            <p className="mt-4 text-muted-foreground">
              Get the latest insights and tips delivered straight to your inbox.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
