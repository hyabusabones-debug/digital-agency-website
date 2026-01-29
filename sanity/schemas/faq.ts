import { defineField, defineType } from "sanity"
import { HelpCircle } from "lucide-react"

export const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  icon: () => HelpCircle,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "General" },
          { title: "Services", value: "Services" },
          { title: "Pricing", value: "Pricing" },
          { title: "Process", value: "Process" },
          { title: "Support", value: "Support" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
})
