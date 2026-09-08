import { defineField, defineType } from "sanity"
import { Info } from "lucide-react"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: Info,
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "companyStory",
      title: "Company Story",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "vision",
      title: "Vision Statement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "values",
      title: "Company Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Value Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "icon", type: "string", title: "Icon Name" },
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Company Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "role", type: "string", title: "Role" },
            {
              name: "image",
              type: "image",
              title: "Photo",
              options: { hotspot: true },
            },
            { name: "bio", type: "text", title: "Bio" },
            {
              name: "socialLinks",
              type: "object",
              title: "Social Links",
              fields: [
                { name: "linkedin", type: "url", title: "LinkedIn" },
                { name: "twitter", type: "url", title: "Twitter" },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
      }
    },
  },
})
