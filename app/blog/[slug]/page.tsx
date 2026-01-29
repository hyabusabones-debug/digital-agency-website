import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from "lucide-react"

const blogPostsData: Record<string, {
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: { name: string; role: string; image: string }
  date: string
  readTime: string
}> = {
  "web-design-trends-2026": {
    title: "10 Web Design Trends to Watch in 2026",
    excerpt: "Discover the latest design trends that are shaping the future of web experiences and how to implement them in your projects.",
    image: "/images/blog/design-trends.jpg",
    category: "Design",
    author: { name: "Emily Davis", role: "Creative Director", image: "/images/team/emily.jpg" },
    date: "January 15, 2026",
    readTime: "8 min read",
    content: `
The world of web design is constantly evolving, and 2026 brings exciting new trends that are reshaping how we create digital experiences. From AI-powered personalization to immersive 3D elements, here are the top trends you need to know.

## 1. AI-Powered Personalization

Artificial intelligence is revolutionizing how websites adapt to individual users. Modern sites can now analyze user behavior in real-time and adjust layouts, content, and calls-to-action to maximize engagement and conversions.

## 2. Immersive 3D Elements

With WebGL and three.js becoming more accessible, 3D elements are moving beyond simple animations to create truly immersive experiences. From interactive product viewers to full 3D environments, the web is becoming more dimensional.

## 3. Sustainable Web Design

As environmental consciousness grows, designers are focusing on creating websites that minimize energy consumption. This includes optimized images, efficient code, and dark mode options that reduce screen energy usage.

## 4. Micro-Interactions and Motion

Subtle animations and micro-interactions continue to enhance user experience. These small details provide feedback, guide users, and add personality to interfaces without overwhelming them.

## 5. Bold Typography

Typography is taking center stage with oversized fonts, creative layouts, and variable fonts that respond to user interactions. Text is no longer just content—it is a design element in its own right.

## 6. Glassmorphism Evolution

The frosted glass effect has evolved beyond simple panels to more sophisticated applications. Combined with gradients and subtle shadows, glassmorphism creates depth and hierarchy in modern interfaces.

## 7. Asymmetric Layouts

Breaking away from traditional grid systems, asymmetric layouts create visual interest and guide the user's eye through content in unexpected ways.

## 8. Voice User Interfaces

As voice assistants become ubiquitous, websites are incorporating voice navigation and interaction, making digital experiences more accessible and hands-free.

## 9. Dark Mode as Default

Many users prefer dark interfaces, and designers are now creating dark-mode-first designs that maintain excellent readability and visual appeal.

## 10. Inclusive Design

Accessibility is no longer an afterthought. Inclusive design practices are being built into the foundation of web projects, ensuring everyone can access and enjoy digital experiences.

## Conclusion

Staying current with design trends helps create websites that feel modern and relevant. However, remember that trends should serve your users and business goals—not the other way around. Choose the trends that make sense for your specific project and audience.
    `,
  },
  "complete-seo-guide-2026": {
    title: "The Complete Guide to SEO in 2026",
    excerpt: "Everything you need to know about search engine optimization, from technical SEO to content strategy and beyond.",
    image: "/images/blog/seo-guide.jpg",
    category: "Marketing",
    author: { name: "James Wilson", role: "Marketing Lead", image: "/images/team/james.jpg" },
    date: "January 10, 2026",
    readTime: "12 min read",
    content: `
Search engine optimization continues to evolve, and 2026 brings new challenges and opportunities for marketers. This comprehensive guide covers everything you need to know to succeed in the modern SEO landscape.

## Understanding Modern Search

Search engines have become incredibly sophisticated, using AI to understand user intent, context, and the quality of content. Gone are the days of keyword stuffing—today's SEO requires a holistic approach.

## Technical SEO Fundamentals

### Core Web Vitals

Page experience signals remain crucial for rankings. Focus on:
- **Largest Contentful Paint (LCP)**: Load main content within 2.5 seconds
- **First Input Delay (FID)**: Ensure interactivity within 100ms
- **Cumulative Layout Shift (CLS)**: Minimize visual instability

### Mobile-First Indexing

Google primarily uses the mobile version of your site for indexing. Ensure your mobile experience is flawless.

### Structured Data

Implement schema markup to help search engines understand your content and earn rich snippets.

## Content Strategy

### E-E-A-T Principles

- **Experience**: Demonstrate firsthand knowledge
- **Expertise**: Show deep understanding of topics
- **Authoritativeness**: Build credibility in your niche
- **Trustworthiness**: Maintain accuracy and transparency

### Content Depth vs. Breadth

Focus on creating comprehensive, authoritative content rather than churning out thin articles. One excellent piece outperforms ten mediocre ones.

## Link Building in 2026

Quality over quantity remains the rule for backlinks. Focus on:
- Creating linkable assets
- Building genuine relationships
- Guest posting on relevant, high-quality sites
- Digital PR and brand mentions

## Local SEO

For businesses with physical locations:
- Optimize your Google Business Profile
- Gather and respond to reviews
- Ensure NAP consistency across directories
- Create location-specific content

## Measuring Success

Track metrics that matter:
- Organic traffic growth
- Keyword rankings for target terms
- Conversion rates from organic traffic
- Page experience scores
- Backlink quality and growth

## Conclusion

SEO success in 2026 requires a balanced approach combining technical excellence, high-quality content, and strategic promotion. Stay updated with algorithm changes, but focus on providing genuine value to your audience.
    `,
  },
  "scalable-react-applications": {
    title: "Building Scalable React Applications",
    excerpt: "Best practices and patterns for building React applications that scale with your business needs.",
    image: "/images/blog/react-scalable.jpg",
    category: "Development",
    author: { name: "Michael Chen", role: "Technical Director", image: "/images/team/michael.jpg" },
    date: "January 5, 2026",
    readTime: "10 min read",
    content: `
Building React applications that scale requires careful planning and adherence to best practices. In this guide, we'll explore patterns and strategies that will help your application grow with your business.

## Project Structure

A well-organized project structure is the foundation of scalability. Consider organizing by feature rather than file type:

\`\`\`
src/
  features/
    auth/
      components/
      hooks/
      services/
      types/
    dashboard/
    settings/
  shared/
    components/
    hooks/
    utils/
\`\`\`

## State Management

### When to Use Global State

Not everything needs to be in global state. Consider:
- **Local state**: UI state, form inputs
- **Server state**: API data (use React Query or SWR)
- **Global state**: User session, theme, app-wide settings

### State Management Solutions

Choose based on your needs:
- **Context + useReducer**: Simple apps
- **Zustand**: Lightweight, minimal boilerplate
- **Redux Toolkit**: Complex state with time-travel debugging

## Performance Optimization

### Code Splitting

Use dynamic imports to split your code:
\`\`\`javascript
const Dashboard = lazy(() => import('./features/dashboard'))
\`\`\`

### Memoization

Use React.memo, useMemo, and useCallback judiciously. Profile before optimizing—premature optimization can hurt readability.

### Virtual Lists

For long lists, use virtualization libraries like react-window or react-virtual.

## Testing Strategy

### Test Pyramid

- **Unit tests**: Individual functions and hooks
- **Integration tests**: Component interactions
- **E2E tests**: Critical user flows

### Testing Library Best Practices

Test behavior, not implementation. Query by accessible attributes like role and label text.

## Type Safety

TypeScript is essential for large applications. Define strict types for:
- API responses
- Component props
- State shapes
- Event handlers

## Error Handling

Implement error boundaries at strategic points:
- Route level
- Feature level
- Critical component level

## Documentation

Document as you build:
- Component props with JSDoc or TypeScript
- Complex logic with inline comments
- Architecture decisions with ADRs

## Conclusion

Scalable React applications result from consistent patterns, careful state management, and continuous attention to performance. Start with these foundations, and your app will be ready to grow.
    `,
  },
  "ux-research-methods": {
    title: "UX Research Methods Every Designer Should Know",
    excerpt: "A comprehensive overview of user research methods and when to use each one for maximum impact.",
    image: "/images/blog/ux-research.jpg",
    category: "Design",
    author: { name: "Emily Davis", role: "Creative Director", image: "/images/team/emily.jpg" },
    date: "December 28, 2025",
    readTime: "7 min read",
    content: `
Great design starts with understanding your users. UX research provides the insights needed to create products that truly meet user needs. Here's your guide to essential research methods.

## Qualitative vs. Quantitative

### Qualitative Research
Explores the "why" behind user behavior through methods like interviews and observations. Best for understanding motivations and discovering new insights.

### Quantitative Research
Measures behavior through metrics and statistics. Best for validating hypotheses and tracking changes over time.

## Discovery Methods

### User Interviews
One-on-one conversations to understand user goals, pain points, and contexts. Tips for success:
- Prepare open-ended questions
- Listen more than you talk
- Follow interesting threads
- Record with permission

### Contextual Inquiry
Observe users in their natural environment. See how they actually work, not just how they say they work.

### Surveys
Gather data from many users quickly. Keep surveys focused and short—aim for 5-10 minutes maximum.

## Evaluation Methods

### Usability Testing
Watch users attempt tasks with your product. Even 5 users can reveal most usability issues.

### A/B Testing
Compare two versions to see which performs better. Requires significant traffic for statistical validity.

### Heuristic Evaluation
Expert review based on established usability principles. Quick and cost-effective for finding obvious issues.

## Synthesis and Communication

### Affinity Mapping
Group research findings into themes and patterns. Great for collaborative analysis.

### Personas
Create representative user archetypes based on research data. Keep them grounded in real insights.

### Journey Maps
Visualize the user's experience over time. Identify pain points and opportunities.

## When to Use Each Method

| Method | Best For |
|--------|----------|
| Interviews | Early discovery, deep insights |
| Surveys | Broad feedback, validation |
| Usability Testing | Evaluating designs |
| A/B Testing | Optimizing conversions |
| Analytics | Understanding behavior patterns |

## Conclusion

Mix methods to get a complete picture of your users. Research is an ongoing process—continue learning throughout the product lifecycle.
    `,
  },
  "ecommerce-conversion-optimization": {
    title: "E-Commerce Conversion Optimization Strategies",
    excerpt: "Proven strategies to increase your online store conversion rates and boost revenue.",
    image: "/images/blog/ecommerce-conversion.jpg",
    category: "E-Commerce",
    author: { name: "Sarah Johnson", role: "CEO & Founder", image: "/images/team/sarah.jpg" },
    date: "December 20, 2025",
    readTime: "9 min read",
    content: `
Conversion rate optimization can dramatically impact your e-commerce revenue. A small improvement in conversion rate can mean significant revenue growth. Here are proven strategies to optimize your online store.

## Understanding Your Funnel

Map your customer journey from landing to purchase. Identify where users drop off and prioritize improvements there.

## Product Pages That Convert

### High-Quality Images
Use multiple angles, zoom functionality, and lifestyle shots. Consider 360-degree views or video for complex products.

### Compelling Descriptions
Write benefits-focused copy. Address common questions and objections. Use bullet points for scannability.

### Social Proof
Display reviews prominently. Show star ratings, review count, and verified purchase badges.

### Clear CTAs
Make the add-to-cart button prominent. Use action-oriented language. Test button colors and text.

## Checkout Optimization

### Reduce Friction
- Offer guest checkout
- Minimize form fields
- Auto-fill where possible
- Show progress indicators

### Build Trust
- Display security badges
- Show accepted payment methods
- Offer multiple shipping options
- Clear return policy

### Recover Abandoned Carts
- Send reminder emails
- Offer incentives to complete
- Make it easy to return

## Site Speed Matters

Every second of delay costs conversions. Optimize:
- Image compression
- Code minification
- CDN usage
- Server response time

## Mobile Experience

Most e-commerce traffic is mobile. Ensure:
- Thumb-friendly navigation
- Easy-to-tap buttons
- Simplified checkout
- Fast load times

## Personalization

Use data to personalize:
- Product recommendations
- Email content
- Homepage displays
- Search results

## Testing Framework

Don't guess—test. Implement:
- A/B testing for major changes
- Multivariate testing for optimization
- Regular analysis of results
- Continuous iteration

## Key Metrics to Track

- Conversion rate by source
- Average order value
- Cart abandonment rate
- Customer lifetime value
- Return on ad spend

## Conclusion

Conversion optimization is an ongoing process. Start with high-impact areas, test systematically, and keep learning from your customers.
    `,
  },
  "ai-digital-marketing-future": {
    title: "The Future of AI in Digital Marketing",
    excerpt: "How artificial intelligence is transforming digital marketing and what it means for your business.",
    image: "/images/blog/ai-marketing.jpg",
    category: "Marketing",
    author: { name: "James Wilson", role: "Marketing Lead", image: "/images/team/james.jpg" },
    date: "December 15, 2025",
    readTime: "11 min read",
    content: `
Artificial intelligence is revolutionizing digital marketing. From content creation to customer insights, AI is changing how businesses connect with their audiences. Here's what you need to know.

## Current AI Applications

### Content Generation
AI can now create first drafts of blog posts, social media content, and ad copy. While human oversight remains essential, AI dramatically speeds up content production.

### Predictive Analytics
Machine learning models can predict customer behavior, churn risk, and lifetime value with increasing accuracy.

### Chatbots and Customer Service
AI-powered chatbots handle routine inquiries 24/7, freeing human agents for complex issues.

### Ad Optimization
Platforms like Google and Meta use AI to optimize ad delivery, bidding, and creative selection.

## Personalization at Scale

AI enables true 1:1 personalization:
- Dynamic content based on user behavior
- Personalized product recommendations
- Individualized email timing and content
- Custom landing pages

## Voice and Visual Search

Prepare for voice and visual search:
- Optimize for conversational queries
- Use descriptive image alt text
- Implement structured data
- Consider voice app development

## Ethical Considerations

### Privacy
Be transparent about data collection. Give users control over their information.

### Bias
AI can perpetuate or amplify biases. Audit your algorithms regularly.

### Authenticity
Disclose AI-generated content when appropriate. Maintain human oversight.

## Practical Implementation

### Start Small
- Implement AI-powered email send time optimization
- Use chatbots for FAQs
- Try AI-assisted content tools

### Build Data Foundation
AI needs data to work. Ensure you're collecting and organizing data effectively.

### Upskill Your Team
Train marketers to work alongside AI tools. Human creativity + AI efficiency = powerful results.

## The Human Element

AI won't replace marketers—it will augment them. Focus on:
- Strategic thinking
- Creative direction
- Emotional intelligence
- Brand voice
- Ethical oversight

## Looking Ahead

The next few years will bring:
- More sophisticated personalization
- Better predictive capabilities
- Improved content generation
- Deeper customer insights

## Conclusion

AI is a powerful tool for digital marketers, but it's not magic. Success requires strategic implementation, quality data, and human oversight. Start exploring AI tools now to stay competitive in the evolving landscape.
    `,
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostsData[slug]
  
  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return Object.keys(blogPostsData).map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPostsData[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-primary">{post.category}</span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-foreground">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto aspect-[21/9] relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">{paragraph.replace('## ', '')}</h2>
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3">{paragraph.replace('### ', '')}</h3>
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={index} className="text-muted-foreground ml-4">{paragraph.replace('- ', '')}</li>
                }
                if (paragraph.trim()) {
                  return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
                }
                return null
              })}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">Share this article</p>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Want to learn more?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Subscribe to our newsletter for the latest insights delivered to your inbox.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
      </section>
    </div>
  )
}
