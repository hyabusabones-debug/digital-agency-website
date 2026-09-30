// Content types for the git-based CMS. These mirror the old Sanity schema
// field-for-field (minus Sanity-only bits like _id and image asset refs) so
// migrating a page off Sanity is mostly just an import swap.
//
// Fields that were Sanity "Portable Text" rich text are now plain Markdown
// strings — rendered with <MarkdownContent value={...} /> instead of
// <SanityContent value={...} />.
//
// Images are now plain string URLs (upload to an image host, or drop a file
// in /public and reference it as "/images/...") instead of Sanity asset refs.

export interface Homepage {
  heroHeadline: string
  heroSubheadline: string
  heroCTAText: string
  heroCTALink: string
  heroSecondaryCTAText: string
  heroSecondaryCTALink: string
  servicesStripItems: { icon: string; title: string; description: string }[]
  ctaSectionHeadline: string
  ctaSectionSubheadline: string
  ctaSectionButtonText: string
  ctaSectionButtonLink: string
}

export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string // markdown
  icon: string
  image?: string
  features: string[]
  processSteps: { title: string; description: string }[]
  seoTitle?: string
  seoDescription?: string
  order?: number
}

export interface Author {
  id: string
  name: string
  image?: string
  role: string
  bio?: string
}

export interface BlogPostBase {
  slug: string
  title: string
  excerpt: string
  featuredImage?: string
  publishedAt: string
  category: string
  readTime: string
  content: string // markdown
  authorId: string
  seoTitle?: string
  seoDescription?: string
}

export interface BlogPost extends Omit<BlogPostBase, "authorId"> {
  author: Author | null
}

export interface CaseStudyResult {
  metric: string
  value: string
  description: string
}

export interface CaseStudy {
  slug: string
  projectName: string
  client: string
  industry: string
  shortDescription: string
  problem: string // markdown
  solution: string // markdown
  results: CaseStudyResult[]
  featuredImage?: string
  galleryImages?: string[]
  services: string[]
  testimonial?: { quote: string; author: string; role: string }
  seoTitle?: string
  seoDescription?: string
  publishedAt?: string
}

export interface AboutPage {
  heroHeadline: string
  heroSubheadline: string
  companyStory: string // markdown
  mission: string // markdown
  vision: string // markdown
  values: { title: string; description: string; icon: string }[]
  stats: { value: string; label: string }[]
  teamMembers: {
    name: string
    role: string
    image?: string
    bio?: string
    socialLinks?: Record<string, string>
  }[]
}

export interface GlobalSettings {
  siteName: string
  logo?: string
  logoDark?: string
  footerText: string
  contactInfo: { email: string; phone: string; address?: string }
  socialLinks: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  defaultSEO?: { title?: string; description?: string; image?: string }
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}