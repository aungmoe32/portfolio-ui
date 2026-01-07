"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
// Note: You may want to import highlight.js styles in your global CSS instead

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom heading renderer with IDs for navigation
          h1: ({ children, ...props }) => (
            <h1
              id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              className="text-4xl font-bold mb-6 mt-10 scroll-mt-8 first:mt-0"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              className="text-3xl font-bold mb-4 mt-8 scroll-mt-8 first:mt-0"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              className="text-2xl font-semibold mb-3 mt-6 scroll-mt-8 first:mt-0"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              className="text-xl font-semibold mb-2 mt-4 scroll-mt-8 first:mt-0"
              {...props}
            >
              {children}
            </h4>
          ),
          
          // Custom paragraph renderer
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-relaxed text-foreground/90" {...props}>
              {children}
            </p>
          ),
          
          // Custom blockquote renderer
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/20 pl-6 py-4 my-6 italic bg-muted/30 rounded-r-lg"
              {...props}
            >
              {children}
            </blockquote>
          ),
          
          // Custom code block renderer
          pre: ({ children, ...props }) => (
            <div className="my-6">
              <pre
                className="bg-muted p-4 rounded-lg overflow-x-auto"
                {...props}
              >
                {children}
              </pre>
            </div>
          ),
          
          // Inline code renderer
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            
            if (match) {
              // This is a code block, let pre handle it
              return <code className={className} {...props}>{children}</code>
            }
            
            // This is inline code
            return (
              <code
                className="bg-muted px-2 py-1 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            )
          },
          
          // Custom link renderer
          a: ({ href, children, ...props }) => {
            if (!href) return <span {...props}>{children}</span>
            
            const isExternal = href.startsWith('http')
            
            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
                  {...props}
                >
                  {children}
                </a>
              )
            }
            
            return (
              <Link
                href={href}
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
                {...props}
              >
                {children}
              </Link>
            )
          },
          
          // Custom image renderer with Next.js Image
          img: ({ src, alt, ...props }) => {
            if (!src) return null
            
            return (
              <div className="my-8">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={800}
                  height={400}
                  className="rounded-lg w-full h-auto"
                  loading="lazy"
                  {...props}
                />
                {alt && (
                  <p className="text-sm text-muted-foreground mt-2 text-center italic">
                    {alt}
                  </p>
                )}
              </div>
            )
          },
          
          // Custom list renderers
          ul: ({ children, ...props }) => (
            <ul className="mb-4 pl-6 list-disc" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="mb-4 pl-6 list-decimal" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="mb-2" {...props}>
              {children}
            </li>
          ),
          
          // Custom table renderers for better styling
          table: ({ children, ...props }) => (
            <div className="my-6 overflow-x-auto">
              <table
                className="w-full border-collapse border border-muted"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-muted bg-muted/30 px-4 py-2 text-left font-semibold"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-muted px-4 py-2" {...props}>
              {children}
            </td>
          ),
          
          // Custom HR renderer
          hr: ({ ...props }) => (
            <hr className="my-8 border-muted-foreground/20" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Helper function to extract headings from markdown for table of contents
export function extractHeadingsFromMarkdown(content: string): Array<{ id: string, text: string, level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<{ id: string, text: string, level: number }> = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = `heading-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`
    
    headings.push({ id, text, level })
  }
  
  return headings
}