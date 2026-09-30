import type { Metadata } from "next"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getFAQs } from "@/lib/content"

export const metadata: Metadata = {
  title: "FAQs",
  description: "Find answers to frequently asked questions about our digital agency services, pricing, and process.",
}

export const dynamic = "force-dynamic"

export default async function FAQsPage() {
  const faqs = await getFAQs()

  // Group the flat, already-ordered list into categories, preserving the order
  // categories first appear in (which is controlled from the admin panel).
  const categories: { category: string; questions: { question: string; answer: string }[] }[] = []
  for (const faq of faqs) {
    const categoryName = faq.category || "General"
    let group = categories.find((c) => c.category === categoryName)
    if (!group) {
      group = { category: categoryName, questions: [] }
      categories.push(group)
    }
    group.questions.push({ question: faq.question, answer: faq.answer })
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-linear-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-white/80">
              Find answers to common questions about our services, process, and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {categories.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Questions are being added soon — check back shortly.
              </p>
            ) : (
              categories.map((category) => (
                <div key={category.category} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.category}-${index}`}
                        className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left text-card-foreground hover:no-underline py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">Still Have Questions?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Can't find the answer you're looking for? Get in touch with our team and we'll be happy to help.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}