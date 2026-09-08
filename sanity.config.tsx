import React from "react"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { codeInput } from "@sanity/code-input"

// Dashboard and widgets
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
  sanityTutorialsWidget,
  DashboardWidget,
} from "@sanity/dashboard"
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list"

import { schemaTypes } from "./sanity/schemas"
import { structure } from "./sanity/structure"

// Custom widget for SEO / Analytics
const seoAnalyticsWidget: DashboardWidget = {
  name: "seo-analytics",
  component: () => (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ margin: 0 }}>📊 SEO & Analytics</h3>
      <p>
        Add quick SEO reminders, Google Analytics stats, or other performance tips here.
      </p>
    </div>
  ),
}

export default defineConfig({
  name: "digital-agency",
  title: "Digital Agency CMS",
  projectId: "0gihtcsa",
  dataset: "production",
  basePath: "/admin",

  plugins: [
    dashboardTool({
      widgets: [
        sanityTutorialsWidget(),

        // Project info widget
        projectInfoWidget({
  layout: { width: "medium" },
}),


        // Project users
        projectUsersWidget(),

        // Recent Blog Posts
        documentListWidget({
          title: "Recent Blog Posts",
          types: ["blogPost"],
          order: "_createdAt desc",
        }),

        // Recent Services
        documentListWidget({
          title: "Recent Services",
          types: ["service"],
          order: "_createdAt desc",
        }),

        // Drafts
        documentListWidget({
          title: "Drafts",
          types: ["blogPost", "service"],
          order: "_updatedAt desc",
        }),

        // Quick Create
        documentListWidget({
          title: "Quick Create",
          types: ["blogPost", "service"],
          order: "_createdAt desc",
        }),

        // Custom SEO / Analytics widget
        seoAnalyticsWidget,
      ],
    }),

    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
