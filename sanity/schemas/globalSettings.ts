import { defineField, defineType } from "sanity"
import { Settings } from "lucide-react"

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  icon: () => Settings,
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo (Light Mode)",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "logoDark",
      title: "Logo (Dark Mode)",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Copyright Text",
      type: "string",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "address", type: "string", title: "Address" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "twitter", type: "url", title: "Twitter" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "instagram", type: "url", title: "Instagram" },
      ],
    }),
    defineField({
      name: "defaultSEO",
      title: "Default SEO Settings",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Default Title" },
        { name: "description", type: "text", title: "Default Description" },
        {
          name: "image",
          type: "image",
          title: "Default OG Image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global Settings",
      }
    },
  },
})
