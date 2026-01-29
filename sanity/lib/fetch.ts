import { client, previewClient } from "./client"
import * as queries from "./queries"
import type {
  Homepage,
  Service,
  BlogPost,
  CaseStudy,
  AboutPage,
  GlobalSettings,
  FAQ,
} from "@/sanity/types"

// Revalidation times
const REVALIDATE_TIME = 60 // 1 minute for ISR

function getClient(preview = false) {
  return preview ? previewClient : client
}

// Homepage
export async function getHomepage(preview = false): Promise<Homepage | null> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(queries.homepageQuery, {}, { next: { revalidate: REVALIDATE_TIME } })
}

// Services
export async function getAllServices(preview = false): Promise<Service[]> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(queries.allServicesQuery, {}, { next: { revalidate: REVALIDATE_TIME } })
}

export async function getServiceBySlug(slug: string, preview = false): Promise<Service | null> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(
    queries.serviceBySlugQuery,
    { slug },
    { next: { revalidate: REVALIDATE_TIME } }
  )
}

// Blog Posts
export async function getAllBlogPosts(preview = false): Promise<BlogPost[]> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(queries.allBlogPostsQuery, {}, { next: { revalidate: REVALIDATE_TIME } })
}

export async function getBlogPostBySlug(slug: string, preview = false): Promise<BlogPost | null> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(
    queries.blogPostBySlugQuery,
    { slug },
    { next: { revalidate: REVALIDATE_TIME } }
  )
}

// Case Studies
export async function getAllCaseStudies(preview = false): Promise<CaseStudy[]> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(
    queries.allCaseStudiesQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  )
}

export async function getCaseStudyBySlug(
  slug: string,
  preview = false
): Promise<CaseStudy | null> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(
    queries.caseStudyBySlugQuery,
    { slug },
    { next: { revalidate: REVALIDATE_TIME } }
  )
}

// About Page
export async function getAboutPage(preview = false): Promise<AboutPage | null> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(queries.aboutPageQuery, {}, { next: { revalidate: REVALIDATE_TIME } })
}

// Global Settings
export async function getGlobalSettings(preview = false): Promise<GlobalSettings | null> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(
    queries.globalSettingsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  )
}

// FAQs
export async function getFAQs(preview = false): Promise<FAQ[]> {
  const sanityClient = getClient(preview)
  return sanityClient.fetch(queries.faqsQuery, {}, { next: { revalidate: REVALIDATE_TIME } })
}
