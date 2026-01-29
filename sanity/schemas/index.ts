import { homepage } from "./homepage"
import { service } from "./service"
import { blogPost } from "./blogPost"
import { author } from "./author"
import { caseStudy } from "./caseStudy"
import { aboutPage } from "./aboutPage"
import { globalSettings } from "./globalSettings"
import { faq } from "./faq"

export const schemaTypes = [
  // Singleton pages
  homepage,
  aboutPage,
  globalSettings,
  // Collections
  service,
  blogPost,
  author,
  caseStudy,
  faq,
]
