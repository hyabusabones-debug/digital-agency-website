import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook, User, ArrowRight } from "lucide-react"
import { getBlogPostBySlug, getAllBlogPosts } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"
import { SanityContent } from "@/components/SanityContent"
import { Button } from "@/components/ui/button"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-20 bg-background">
      {/* Article Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/10 via-transparent to-transparent -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground mb-12 transition-all group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Back to Articles</span>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">
                {post.category}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="text-sm text-muted-foreground font-medium">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-10 tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 pt-10 border-t border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 relative rounded-2xl overflow-hidden shadow-lg border-2 border-background">
                  {post.author?.image ? (
                    <Image
                      src={urlFor(post.author.image).width(150).height(150).url()}
                      alt={post.author.name || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center"><User className="w-6 h-6 text-muted-foreground" /></div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg leading-none mb-1">{post.author?.name}</p>
                  <p className="text-sm text-muted-foreground font-medium">{post.author?.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Published</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                    <Calendar className="w-4 h-4" />
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                 <button className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto aspect-21/9 relative rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border/50">
            {post.featuredImage ? (
              <Image
                src={urlFor(post.featuredImage).width(1600).height(700).url()}
                alt={post.title || ""}
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

      {/* Article Content */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar Left - Placeholder for future nav/toc */}
            <div className="hidden lg:block lg:col-span-1" />
            
            {/* Main Content */}
            <div className="lg:col-span-8">
               <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-3xl">
                <SanityContent value={post.content} />
               </article>

               {/* Tags/Categories */}
               <div className="mt-16 pt-10 border-t border-border/50 flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-muted/50 text-foreground text-sm font-bold rounded-xl"># {post.category}</span>
                  <span className="px-4 py-2 bg-muted/50 text-foreground text-sm font-bold rounded-xl"># DigitalStrategy</span>
                  <span className="px-4 py-2 bg-muted/50 text-foreground text-sm font-bold rounded-xl"># Innovation</span>
               </div>
            </div>

            {/* Sidebar Right */}
            <div className="lg:col-span-3 space-y-12">
               {/* Share Widget */}
               <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-primary/5">
                  <h3 className="font-bold text-lg mb-6 tracking-tight">Share Article</h3>
                  <div className="flex flex-col gap-3">
                    <button className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 hover:bg-[#1DA1F2] hover:text-white transition-all font-bold text-sm group">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-white/20">
                        <Twitter className="w-5 h-5" />
                      </div>
                      Twitter
                    </button>
                    <button className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 hover:bg-[#0A66C2] hover:text-white transition-all font-bold text-sm group">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-white/20">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      LinkedIn
                    </button>
                    <button className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 hover:bg-[#1877F2] hover:text-white transition-all font-bold text-sm group">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-white/20">
                        <Facebook className="w-5 h-5" />
                      </div>
                      Facebook
                    </button>
                  </div>
               </div>

               {/* Related Articles could go here */}
               <div className="sticky top-32">
                 <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl shadow-primary/20 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">Need expert help with your project?</h3>
                    <p className="text-primary-foreground/80 mb-8 relative z-10 leading-relaxed font-medium">
                      Let's discuss how we can transform your digital presence together.
                    </p>
                    <Button asChild className="w-full bg-white text-primary hover:bg-white/90 font-bold h-14 rounded-2xl relative z-10 transition-transform group-hover:scale-105">
                       <Link href="/contact">Get in Touch <ArrowRight className="ml-2 w-5 h-5" /></Link>
                    </Button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
