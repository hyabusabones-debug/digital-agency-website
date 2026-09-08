'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { urlFor } from "@/sanity/lib/client"
import type { BlogPost } from "@/sanity/types"

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(posts.map(post => post.category).filter(Boolean)))]

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const featuredPost = filteredPosts[0]
  const otherPosts = filteredPosts.slice(1)

  return (
    <div className="bg-background">
      {/* Categories */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as string)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  category === selectedCategory
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {featuredPost ? (
              <motion.div
                key={featuredPost._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="aspect-[16/10] relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                      {featuredPost.featuredImage ? (
                        <Image
                          src={urlFor(featuredPost.featuredImage).width(1200).height(750).url()}
                          alt={featuredPost.title || ""}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Image src="/placeholder.svg" alt="placeholder" width={100} height={100} />
                        </div>
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                          Featured Article
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-sm text-muted-foreground font-medium">{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-6 tracking-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-8 border-t border-border/50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden relative border-2 border-background">
                            {featuredPost.author?.image ? (
                              <Image src={urlFor(featuredPost.author.image).width(100).height(100).url()} alt={featuredPost.author.name || ""} fill />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-muted-foreground" /></div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{featuredPost.author?.name}</p>
                            <p className="text-sm text-muted-foreground">{featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <ArrowRight className="w-6 h-6 text-foreground group-hover:text-primary-foreground group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                No articles found in this category.
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Latest Articles</h2>
            <div className="h-px flex-1 bg-border/50 mx-8 hidden sm:block" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <article className="bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {post.featuredImage ? (
                        <Image
                          src={urlFor(post.featuredImage).width(800).height(500).url()}
                          alt={post.title || ""}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <div className="absolute top-4 right-4">
                         <span className="px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold rounded-lg uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight mb-4 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                        {post.excerpt}
                      </p>
                      <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden relative">
                               {post.author?.image && <Image src={urlFor(post.author.image).width(50).height(50).url()} alt="" fill />}
                            </div>
                            <span className="text-sm font-bold text-foreground">{post.author?.name}</span>
                         </div>
                         <div className="text-primary group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                         </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}