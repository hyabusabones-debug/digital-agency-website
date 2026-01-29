import type { PortableTextBlock, Image } from "sanity"

export interface SanityImage extends Image {
  alt?: string
}

export interface Homepage {
  heroHeadline: string
  heroSubheadline: string
  heroCTAText: string
  heroCTALink: string
  heroSecondaryCTAText?: string
  heroSecondaryCTALink?: string
  heroImage?: SanityImage
  servicesStripItems: {
    icon: string
    title: string
    description: string
  }[]
  ctaSectionHeadline: string
  ctaSectionSubheadline: string
  ctaSectionButtonText: string
  ctaSectionButtonLink: string
}

export interface Service {
  _id: string
  title: string
  slug: string
  description?: PortableTextBlock[]
  shortDescription: string
  icon: string
  image?: SanityImage
  features: string[]
  processSteps?: {
    title: string
    description: string
  }[]
  seoTitle?: string
  seoDescription?: string
  order?: number
}

export interface Author {
  name: string
  image?: SanityImage
  role: string
  bio?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: SanityImage
  publishedAt: string
  category: string
  readTime: string
  content?: PortableTextBlock[]
  author?: Author
  seoTitle?: string
  seoDescription?: string
  relatedPosts?: BlogPost[]
}

export interface CaseStudyResult {
  metric: string
  value: string
  description?: string
}

export interface CaseStudy {
  _id: string
  projectName: string
  slug: string
  client: string
  industry: string
  shortDescription?: string
  problem?: PortableTextBlock[]
  solution?: PortableTextBlock[]
  results?: CaseStudyResult[]
  featuredImage?: SanityImage
  galleryImages?: SanityImage[]
  services: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  seoTitle?: string
  seoDescription?: string
}

export interface TeamMember {
  name: string
  role: string
  image?: SanityImage
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}

export interface AboutPage {
  heroHeadline: string
  heroSubheadline?: string
  heroImage?: SanityImage
  companyStory?: PortableTextBlock[]
  mission: string
  vision: string
  values: {
    title: string
    description: string
    icon: string
  }[]
  stats: {
    value: string
    label: string
  }[]
  teamMembers: TeamMember[]
}

export interface GlobalSettings {
  siteName: string
  logo?: SanityImage
  logoDark?: SanityImage
  footerText: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  socialLinks: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  defaultSEO: {
    title: string
    description: string
    image?: SanityImage
  }
}

export interface FAQ {
  _id: string
  question: string
  answer: PortableTextBlock[]
  category?: string
  order?: number
}
