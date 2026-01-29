import { groq } from "next-sanity"

// Homepage Queries
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroHeadline,
    heroSubheadline,
    heroCTAText,
    heroCTALink,
    heroSecondaryCTAText,
    heroSecondaryCTALink,
    heroImage,
    servicesStripItems[] {
      icon,
      title,
      description
    },
    ctaSectionHeadline,
    ctaSectionSubheadline,
    ctaSectionButtonText,
    ctaSectionButtonLink
  }
`

// Services Queries
export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    image,
    features
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    shortDescription,
    icon,
    image,
    features,
    processSteps[] {
      title,
      description
    },
    seoTitle,
    seoDescription
  }
`

// Blog Queries
export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    category,
    readTime,
    author-> {
      name,
      image,
      role
    }
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    category,
    readTime,
    content,
    author-> {
      name,
      image,
      role,
      bio
    },
    seoTitle,
    seoDescription,
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && category == ^.category][0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      featuredImage,
      publishedAt,
      category
    }
  }
`

// Case Studies Queries
export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    projectName,
    "slug": slug.current,
    client,
    industry,
    shortDescription,
    featuredImage,
    services
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    projectName,
    "slug": slug.current,
    client,
    industry,
    problem,
    solution,
    results[] {
      metric,
      value,
      description
    },
    featuredImage,
    galleryImages,
    services,
    testimonial {
      quote,
      author,
      role
    },
    seoTitle,
    seoDescription
  }
`

// About Page Query
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroHeadline,
    heroSubheadline,
    heroImage,
    companyStory,
    mission,
    vision,
    values[] {
      title,
      description,
      icon
    },
    stats[] {
      value,
      label
    },
    teamMembers[] {
      name,
      role,
      image,
      bio,
      socialLinks
    }
  }
`

// Global Settings Query
export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    siteName,
    logo,
    logoDark,
    footerText,
    contactInfo {
      email,
      phone,
      address
    },
    socialLinks {
      facebook,
      twitter,
      linkedin,
      instagram
    },
    defaultSEO {
      title,
      description,
      image
    }
  }
`

// FAQs Query
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`
