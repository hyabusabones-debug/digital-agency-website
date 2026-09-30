import fs from "fs/promises"
import path from "path"
import type {
  Homepage,
  Service,
  BlogPost,
  BlogPostBase,
  Author,
  CaseStudy,
  AboutPage,
  GlobalSettings,
  FAQ,
} from "./content-types"

const CONTENT_DIR = path.join(process.cwd(), "content")

async function readJsonFile<T>(relativePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, relativePath), "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

async function readJsonDir<T>(relativeDir: string): Promise<T[]> {
  try {
    const dirPath = path.join(CONTENT_DIR, relativeDir)
    const files = (await fs.readdir(dirPath)).filter((f) => f.endsWith(".json"))
    const items = await Promise.all(
      files.map((f) => readJsonFile<T>(path.join(relativeDir, f)))
    )
    return items.filter((item) => item !== null) as T[]
  } catch {
    return []
  }
}

// ---- Homepage ----
export async function getHomepage(): Promise<Homepage | null> {
  return readJsonFile<Homepage>("homepage.json")
}

// ---- Global Settings ----
export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  return readJsonFile<GlobalSettings>("settings.json")
}

// ---- About Page ----
export async function getAboutPage(): Promise<AboutPage | null> {
  return readJsonFile<AboutPage>("about.json")
}

// ---- FAQs ----
export async function getFAQs(): Promise<FAQ[]> {
  const faqs = await readJsonFile<FAQ[]>("faqs.json")
  return (faqs || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

// ---- Authors ----
export async function getAllAuthors(): Promise<Author[]> {
  return (await readJsonFile<Author[]>("authors.json")) || []
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const authors = await getAllAuthors()
  return authors.find((a) => a.id === id) || null
}

// ---- Services ----
export async function getAllServices(): Promise<Service[]> {
  const services = await readJsonDir<Service>("services")
  return services.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return readJsonFile<Service>(`services/${slug}.json`)
}

// ---- Blog Posts ----
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await readJsonDir<BlogPostBase>("blog")
  const authors = await getAllAuthors()
  return posts
    .map(({ authorId, ...post }) => ({
      ...post,
      author: authors.find((a) => a.id === authorId) || null,
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getBlogPostBySlug(
  slug: string
): Promise<(BlogPost & { relatedPosts: BlogPost[] }) | null> {
  const post = await readJsonFile<BlogPostBase>(`blog/${slug}.json`)
  if (!post) return null

  const authors = await getAllAuthors()
  const { authorId, ...rest } = post
  const author = authors.find((a) => a.id === authorId) || null

  const allPosts = await readJsonDir<BlogPostBase>("blog")
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)
    .map(({ authorId: relatedAuthorId, ...p }) => ({
      ...p,
      author: authors.find((a) => a.id === relatedAuthorId) || null,
    }))

  return { ...rest, author, relatedPosts }
}

// ---- Case Studies ----
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const studies = await readJsonDir<CaseStudy>("case-studies")
  return studies.sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  )
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return readJsonFile<CaseStudy>(`case-studies/${slug}.json`)
}