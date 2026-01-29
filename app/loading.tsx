import {
  HeroSkeleton,
  ServicesStripSkeleton,
  ServicesGridSkeleton,
} from "@/components/skeletons"

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      <ServicesStripSkeleton />
      <ServicesGridSkeleton />
    </>
  )
}
