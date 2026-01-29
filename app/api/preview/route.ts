import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug") || "/"
  const type = searchParams.get("type") || "page"

  // Check the secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Determine redirect URL based on content type
  let redirectUrl = "/"
  
  switch (type) {
    case "blogPost":
      redirectUrl = `/blog/${slug}`
      break
    case "service":
      redirectUrl = `/services/${slug}`
      break
    case "caseStudy":
      redirectUrl = `/case-studies/${slug}`
      break
    case "homepage":
      redirectUrl = "/"
      break
    case "aboutPage":
      redirectUrl = "/about"
      break
    default:
      redirectUrl = slug.startsWith("/") ? slug : `/${slug}`
  }

  redirect(redirectUrl)
}
