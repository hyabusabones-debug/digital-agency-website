import { PortableText, type PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/client"

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full aspect-16/10 my-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 group">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog Image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm font-medium">{value.caption}</p>
            </div>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-5xl lg:text-7xl font-bold mt-20 mb-8 text-foreground tracking-tighter">{children}</h1>,
    h2: ({ children }) => <h2 className="text-4xl lg:text-5xl font-bold mt-16 mb-6 text-foreground tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-3xl lg:text-4xl font-bold mt-12 mb-5 text-foreground tracking-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="text-2xl lg:text-3xl font-bold mt-10 mb-4 text-foreground tracking-tight">{children}</h4>,
    normal: ({ children }) => <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-8 border-primary pl-8 py-6 my-12 italic text-2xl text-foreground bg-primary/5 rounded-r-[2rem] font-serif">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside mb-8 ml-6 space-y-4 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside mb-8 ml-6 space-y-4 text-muted-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-xl font-medium pl-2">{children}</li>,
    number: ({ children }) => <li className="text-xl font-medium pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary font-bold underline decoration-primary/30 underline-offset-8 hover:decoration-primary transition-all"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded-lg text-primary font-mono text-base border border-border/50">
        {children}
      </code>
    ),
  },
}

export function SanityContent({ value }: { value: any }) {
  if (!value) return null
  return (
    <div className="prose-custom max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}

