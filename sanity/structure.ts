import React from "react"
import type { StructureBuilder } from "sanity/structure"
import { Home, Layers, FileText, Briefcase, Info, Settings, HelpCircle, Users } from "lucide-react"

// Singleton document types
const singletonTypes = new Set(["homepage", "aboutPage", "globalSettings"])

// Define singleton list items
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon: React.ComponentType
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName))

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Singleton pages
      singletonListItem(S, "homepage", "Homepage", Home),
      singletonListItem(S, "aboutPage", "About Page", Info),
      singletonListItem(S, "globalSettings", "Global Settings", Settings),

      S.divider(),

      // Collections
      S.listItem()
        .title("Services")
        .icon(Layers)
        .child(S.documentTypeList("service").title("Services")),

      S.listItem()
        .title("Blog Posts")
        .icon(FileText)
        .child(S.documentTypeList("blogPost").title("Blog Posts")),

      S.listItem()
        .title("Authors")
        .icon(Users)
        .child(S.documentTypeList("author").title("Authors")),

      S.listItem()
        .title("Case Studies")
        .icon(Briefcase)
        .child(S.documentTypeList("caseStudy").title("Case Studies")),

      S.listItem()
        .title("FAQs")
        .icon(HelpCircle)
        .child(S.documentTypeList("faq").title("FAQs")),
    ])
