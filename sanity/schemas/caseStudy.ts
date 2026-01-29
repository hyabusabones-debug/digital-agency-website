import { defineField, defineType } from "sanity"
import { Briefcase } from "lucide-react"

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  icon: () => Briefcase,
  fields: [
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "projectName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      options: {
        list: [
          { title: "E-Commerce", value: "E-Commerce" },
          { title: "Technology", value: "Technology" },
          { title: "Healthcare", value: "Healthcare" },
          { title: "Finance", value: "Finance" },
          { title: "Education", value: "Education" },
          { title: "Real Estate", value: "Real Estate" },
          { title: "Food & Beverage", value: "Food & Beverage" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief description for cards",
    }),
    defineField({
      name: "problem",
      title: "The Problem",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "solution",
      title: "Our Solution",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "metric", type: "string", title: "Metric Name" },
            { name: "value", type: "string", title: "Value" },
            { name: "description", type: "string", title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
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
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
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
    defineField({
      name: "services",
      title: "Services Provided",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Web Development", value: "Web Development" },
          { title: "Digital Marketing", value: "Digital Marketing" },
          { title: "UI/UX Design", value: "UI/UX Design" },
          { title: "E-Commerce Solutions", value: "E-Commerce Solutions" },
          { title: "Mobile App Development", value: "Mobile App Development" },
          { title: "Brand Identity", value: "Brand Identity" },
        ],
      },
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      fields: [
        { name: "quote", type: "text", title: "Quote" },
        { name: "author", type: "string", title: "Author Name" },
        { name: "role", type: "string", title: "Author Role" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "projectName",
      subtitle: "client",
      media: "featuredImage",
    },
  },
})
