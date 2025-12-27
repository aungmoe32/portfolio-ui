"use client"

// Temporary fallback until @portabletext packages are installed
// import { PortableText, PortableTextComponents } from '@portabletext/react'
// import { PortableTextBlock } from '@portabletext/types'

interface PortableTextBlock {
  _type: string
  children?: Array<{
    text?: string
    [key: string]: any
  }>
  [key: string]: any
}

interface PortableTextRendererProps {
  content: PortableTextBlock[]
  className?: string
}

// Simple fallback renderer for portable text blocks
export default function PortableTextRenderer({ content, className = "" }: PortableTextRendererProps) {
  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {content.map((block, index) => {
        if (block._type === 'block' && block.children) {
          const text = block.children.map((child: any) => child.text || '').join('')
          
          // Handle different block styles
          if (block.style === 'h3') {
            return <h3 key={index} className="text-xl font-semibold mb-3 mt-6">{text}</h3>
          }
          if (block.style === 'h4') {
            return <h4 key={index} className="text-lg font-semibold mb-2 mt-4">{text}</h4>
          }
          if (block.style === 'blockquote') {
            return (
              <blockquote key={index} className="border-l-4 border-primary/20 pl-4 py-2 my-4 italic bg-muted/30 rounded-r">
                {text}
              </blockquote>
            )
          }
          
          // Default to paragraph
          return <p key={index} className="mb-4 leading-relaxed text-muted-foreground">{text}</p>
        }
        
        return null
      })}
    </div>
  )
}

// Simplified version for cases where we just need plain text
export function getPlainTextFromPortableText(blocks: PortableTextBlock[]): string {
  if (!blocks || blocks.length === 0) return ''
  
  return blocks
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('')
      }
      return ''
    })
    .join(' ')
    .trim()
}