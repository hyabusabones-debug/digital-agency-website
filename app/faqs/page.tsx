import type { Metadata } from "next"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "FAQs",
  description: "Find answers to frequently asked questions about our digital agency services, pricing, and process.",
}

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What services does your agency offer?",
        answer: "We offer a comprehensive range of digital services including web development, digital marketing, UI/UX design, e-commerce solutions, and mobile app development. Each service is tailored to meet your specific business needs and goals.",
      },
      {
        question: "How long has your agency been in business?",
        answer: "We have been helping businesses succeed in the digital landscape since 2014. Over the years, we have completed more than 500 projects for clients across various industries.",
      },
      {
        question: "Do you work with businesses of all sizes?",
        answer: "Yes, we work with businesses of all sizes, from startups and small businesses to large enterprises. We tailor our approach and solutions to fit your specific needs and budget.",
      },
    ],
  },
  {
    category: "Process",
    questions: [
      {
        question: "What is your typical project process?",
        answer: "Our process typically involves four phases: Discovery (understanding your needs), Planning (creating a roadmap), Execution (building your solution), and Launch & Support (deploying and maintaining). We keep you informed and involved throughout the entire process.",
      },
      {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while a complex web application or marketing campaign could take 3-6 months. We will provide a detailed timeline during our initial consultation.",
      },
      {
        question: "How do you communicate during projects?",
        answer: "We use a combination of tools for seamless communication including regular video calls, project management software, and instant messaging. You will have a dedicated project manager as your main point of contact.",
      },
    ],
  },
  {
    category: "Pricing",
    questions: [
      {
        question: "How do you price your services?",
        answer: "We offer both project-based and retainer pricing models depending on your needs. Project pricing is based on scope and complexity, while retainers are ideal for ongoing work. We provide detailed proposals with transparent pricing.",
      },
      {
        question: "Do you require a deposit?",
        answer: "Yes, we typically require a 30-50% deposit to begin work, with the remainder due upon project completion or in milestones. This helps us allocate resources effectively and ensures commitment from both parties.",
      },
      {
        question: "Can you work within my budget?",
        answer: "We are flexible and can often adjust project scope to fit various budgets. During our initial consultation, we will discuss your budget constraints and recommend the best approach to achieve your goals.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "What technologies do you use?",
        answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, and various CMS platforms. We choose the best technology stack for each project based on your specific requirements and goals.",
      },
      {
        question: "Will I own the code and assets?",
        answer: "Yes, upon final payment, you will own all custom code, designs, and assets created specifically for your project. We provide full access to all source files and documentation.",
      },
      {
        question: "Do you provide hosting and maintenance?",
        answer: "Yes, we offer hosting solutions and ongoing maintenance packages. We can host your project on our managed infrastructure or help you set up hosting on your preferred platform.",
      },
    ],
  },
  {
    category: "Support",
    questions: [
      {
        question: "What kind of support do you offer after launch?",
        answer: "We offer various support options including bug fixes, content updates, performance monitoring, and feature additions. We recommend our maintenance packages for ongoing peace of mind.",
      },
      {
        question: "What if something breaks after launch?",
        answer: "All projects include a warranty period (typically 30-90 days) during which we fix any bugs at no additional cost. After that, issues are handled through our support packages or on a time-and-materials basis.",
      },
      {
        question: "Can you train our team to manage the website?",
        answer: "Absolutely! We provide comprehensive training and documentation to help your team manage and update your website or application. We can also provide ongoing training as needed.",
      },
    ],
  },
]

export default function FAQsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] dark:from-[#0d1442] dark:via-[#1a237e] dark:to-[#283593]">
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
            {faqs.map((category) => (
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
            ))}
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
