"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share, Eye, Heart } from "lucide-react"
import { type BlogDisplay } from "@/lib/sanity-queries"
import Link from "next/link"
import { extractHeadingsFromMarkdown } from "@/components/markdown-renderer"

interface BlogPageClientProps {
  content: string // Changed from any[] to string for markdown
  likeCount: number
  blog: BlogDisplay
  readTime: number
  displayDate: string
}

// Table of Contents component
function TableOfContents({ content, activeId }: { content: string, activeId: string }) {
  const [headings, setHeadings] = useState<Array<{ id: string, text: string, level: number }>>([])

  useEffect(() => {
    // Extract headings from markdown content
    const extractedHeadings = extractHeadingsFromMarkdown(content)
    setHeadings(extractedHeadings)
  }, [content])

  if (headings.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`block text-left text-sm transition-colors hover:text-primary ${
              activeId === heading.id ? 'text-primary font-medium' : 'text-muted-foreground'
            } ${heading.level === 3 ? 'pl-4' : heading.level === 4 ? 'pl-8' : ''}`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default function BlogPageClient({ content, likeCount, blog, readTime, displayDate }: BlogPageClientProps) {
  const [activeHeading, setActiveHeading] = useState('')
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)

  // Scroll spy for table of contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    const headings = document.querySelectorAll('h2[id], h3[id], h4[id]')
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  const handleLike = () => {
    // Optimistic update
    setCurrentLikeCount(prev => prev + 1)
    // Here you would typically make an API call to update the like count
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        {/* Table of Contents */}
        <div className="p-6 bg-muted/30 rounded-lg">
          <TableOfContents content={content} activeId={activeHeading} />
        </div>

        {/* Blog Meta */}
        <div className="p-6 bg-muted/30 rounded-lg space-y-4">
          <h3 className="font-semibold text-sm">About this post</h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Category:</span>
              <Badge variant="secondary" className="ml-2 text-xs capitalize">
                {blog.category.replace('-', ' ')}
              </Badge>
            </div>
            
            <div>
              <span className="text-muted-foreground">Published:</span>
              <span className="ml-2">
                {new Date(displayDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground">Reading time:</span>
              <span className="ml-2">{readTime} minutes</span>
            </div>

            {blog.author && (
              <div>
                <span className="text-muted-foreground">Author:</span>
                <span className="ml-2">{blog.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={handleLike}
            >
              <Heart className="h-4 w-4 mr-2" />
              Like ({currentLikeCount})
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-2" />
              Share this post
            </Button>
            <Link href="/blog">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <Eye className="h-4 w-4 mr-2" />
                View all posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}