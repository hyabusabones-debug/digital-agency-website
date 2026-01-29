import { HeroSection } from "@/components/sections/hero"
import { ServicesStrip } from "@/components/sections/services-strip"
import { ServicesGrid } from "@/components/sections/services-grid"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { CTASection } from "@/components/sections/cta-section"
import { getHomepage, getAllServices } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/client"

export const revalidate = 60

export default async function HomePage() {
  const [homepage, services] = await Promise.all([
    getHomepage(),
    getAllServices(),
  ])

  // Transform services for the grid component
  const transformedServices = services?.map((service) => ({
    title: service.title,
    shortDescription: service.shortDescription,
    image: service.image ? urlFor(service.image).width(800).height(600).url() : undefined,
    slug: service.slug,
  }))

  return (
    <>
      <HeroSection
        headline={homepage?.heroHeadline}
        subheadline={homepage?.heroSubheadline}
        ctaText={homepage?.heroCTAText}
        ctaLink={homepage?.heroCTALink}
        secondaryCtaText={homepage?.heroSecondaryCTAText}
        secondaryCtaLink={homepage?.heroSecondaryCTALink}
      />
      <ServicesStrip items={homepage?.servicesStripItems} />
      <ServicesGrid services={transformedServices} />
      <WhyChooseUs />
      <CTASection
        headline={homepage?.ctaSectionHeadline}
        subheadline={homepage?.ctaSectionSubheadline}
        buttonText={homepage?.ctaSectionButtonText}
        buttonLink={homepage?.ctaSectionButtonLink}
      />
    </>
  )
}
