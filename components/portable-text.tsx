"use client"

// Enhanced portable text renderer with full URL/link support
// import { PortableText, PortableTextComponents } from '@portabletext/react'
// import { PortableTextBlock } from '@portabletext/types'

interface PortableTextBlock {
  _type: string
  children?: Array<{
    text?: string
    marks?: (string | { _type: string; href?: string; [key: string]: any })[]
    [key: string]: any
  }>
  style?: string
  listItem?: string
  [key: string]: any
}

interface PortableTextRendererProps {
  content: PortableTextBlock[]
  className?: string
}

// Enhanced portable text renderer with URL/link support
export default function PortableTextRenderer({ content, className = "" }: PortableTextRendererProps) {
  if (!content || content.length === 0) {
    return null
  }

  // Function to render a text span with marks (bold, italic, links, etc.)
  const renderSpan = (child: any, spanIndex: number) => {
    let element = child.text || '';
    
    if (child.marks && child.marks.length > 0) {
      child.marks.forEach((mark: string | any) => {
        // Handle string marks (simple formatting)
        if (typeof mark === 'string') {
          if (mark === 'strong') {
            element = <strong key={`strong-${spanIndex}`}>{element}</strong>;
          } else if (mark === 'em') {
            element = <em key={`em-${spanIndex}`}>{element}</em>;
          } else if (mark === 'code') {
            element = <code key={`code-${spanIndex}`} className="bg-muted px-2 py-1 rounded text-xs font-mono">{element}</code>;
          } else if (mark === 'underline') {
            element = <span key={`underline-${spanIndex}`} className="underline">{element}</span>;
          } else if (mark === 'strike-through') {
            element = <span key={`strike-${spanIndex}`} className="line-through">{element}</span>;
          }
        }
        // Handle object marks (links)
        else if (typeof mark === 'object' && mark._type === 'link') {
          const href = mark.href || '#';
          const isExternal = href.startsWith('http');
          
          element = (
            <a
              key={`link-${spanIndex}`}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : ''}
              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium"
            >
              {element}
            </a>
          );
        }
      });
    }
    
    return element;
  };

  // Function to render block children with proper mark handling
  const renderChildren = (children: any[]) => {
    if (!children) return null;
    
    return children.map((child, childIndex) => {
      return (
        <span key={childIndex}>
          {renderSpan(child, childIndex)}
        </span>
      );
    });
  };

  return (
    <div className={className}>
      {content.map((block, index) => {
        if (block._type === 'block' && block.children) {
          
          // Handle different block styles
          if (block.style === 'h1') {
            return (
              <h1 key={index} className="text-3xl font-bold mb-4 mt-8 first:mt-0">
                {renderChildren(block.children)}
              </h1>
            );
          }
          if (block.style === 'h2') {
            return (
              <h2 key={index} className="text-2xl font-semibold mb-3 mt-6 first:mt-0">
                {renderChildren(block.children)}
              </h2>
            );
          }
          if (block.style === 'h3') {
            return (
              <h3 key={index} className="text-xl font-semibold mb-3 mt-6 first:mt-0">
                {renderChildren(block.children)}
              </h3>
            );
          }
          if (block.style === 'h4') {
            return (
              <h4 key={index} className="text-lg font-semibold mb-2 mt-4 first:mt-0">
                {renderChildren(block.children)}
              </h4>
            );
          }
          if (block.style === 'blockquote') {
            return (
              <blockquote key={index} className="border-l-4 border-primary/20 pl-4 py-2 my-4 italic bg-muted/30 rounded-r">
                {renderChildren(block.children)}
              </blockquote>
            );
          }
          
          // Handle list items
          if (block.listItem === 'bullet') {
            return (
              <ul key={index} className="mb-3 pl-6 list-disc">
                <li className="mb-1">
                  {renderChildren(block.children)}
                </li>
              </ul>
            );
          }
          
          if (block.listItem === 'number') {
            return (
              <ol key={index} className="mb-3 pl-6 list-decimal">
                <li className="mb-1">
                  {renderChildren(block.children)}
                </li>
              </ol>
            );
          }
          
          // Default to paragraph
          return (
            <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
              {renderChildren(block.children)}
            </p>
          );
        }

        // Handle images
        if (block._type === "image") {
          const imageUrl = block.asset?.url || "/placeholder.jpg";
          return (
            <div key={index} className="my-6">
              <img
                src={imageUrl}
                alt={block.alt || ""}
                className="rounded-lg w-full h-auto max-w-full"
                loading="lazy"
              />
              {block.caption && (
                <p className="text-xs text-muted-foreground mt-2 text-center italic">
                  {block.caption}
                </p>
              )}
            </div>
          );
        }

        // Handle code blocks
        if (block._type === "code") {
          return (
            <div key={index} className="my-4">
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code className={`language-${block.language || 'text'}`}>
                  {block.code}
                </code>
              </pre>
              {block.filename && (
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  📄 {block.filename}
                </p>
              )}
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
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