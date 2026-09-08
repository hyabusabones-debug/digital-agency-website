import { defineField, defineType } from "sanity"
import { HomeIcon } from "lucide-react"

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
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
      name: "heroCTAText",
      title: "Hero CTA Button Text",
      type: "string",
      initialValue: "Get Started",
    }),
    defineField({
      name: "heroCTALink",
      title: "Hero CTA Button Link",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "heroSecondaryCTAText",
      title: "Hero Secondary CTA Text",
      type: "string",
      initialValue: "Our Services",
    }),
    defineField({
      name: "heroSecondaryCTALink",
      title: "Hero Secondary CTA Link",
      type: "string",
      initialValue: "/services",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
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
      name: "servicesStripItems",
      title: "Services Strip Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon Name" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "string", title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaSectionHeadline",
      title: "CTA Section Headline",
      type: "string",
      initialValue: "Ready to Grow Your Business?",
    }),
    defineField({
      name: "ctaSectionSubheadline",
      title: "CTA Section Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaSectionButtonText",
      title: "CTA Section Button Text",
      type: "string",
      initialValue: "Get a Free Consultation",
    }),
    defineField({
      name: "ctaSectionButtonLink",
      title: "CTA Section Button Link",
      type: "string",
      initialValue: "/contact",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      }
    },
  },
})
