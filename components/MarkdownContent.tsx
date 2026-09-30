import ReactMarkdown from "react-markdown"
import Image from "next/image"

export function MarkdownContent({ value }: { value?: string | null }) {
  if (!value) return null

  return (
    <div className="prose-custom max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-5xl lg:text-7xl font-bold mt-20 mb-8 text-foreground tracking-tighter">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-4xl lg:text-5xl font-bold mt-16 mb-6 text-foreground tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-3xl lg:text-4xl font-bold mt-12 mb-5 text-foreground tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-2xl lg:text-3xl font-bold mt-10 mb-4 text-foreground tracking-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-8 border-primary pl-8 py-6 my-12 italic text-2xl text-foreground bg-primary/5 rounded-r-[2rem] font-serif">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside mb-8 ml-6 space-y-4 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside mb-8 ml-6 space-y-4 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-xl font-medium pl-2">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
          a: ({ children, href }) => {
            const rel = href && !href.startsWith("/") ? "noreferrer noopener" : undefined
            return (
              <a
                href={href}
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
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              <span className="block relative w-full aspect-16/10 my-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50">
                <Image src={src} alt={alt || ""} fill className="object-cover" />
              </span>
            ) : null,
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  )
}