import { getAllBlogs, getBlogCategories } from "@/lib/sanity-queries"
import BlogListClient from "@/components/blog-list-client"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Loading component for the blog list
function BlogListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        <div className="text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-32" />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Server component to fetch data
async function BlogListContent() {
  try {
    // Fetch data server-side
    const [blogs, categories] = await Promise.all([
      getAllBlogs(),
      getBlogCategories()
    ])

    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog Posts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover insights, tutorials, and thoughts on web development, technology, and more.
            </p>
          </div>

          {/* Client-side interactive content */}
          <BlogListClient initialBlogs={blogs} categories={categories} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Blog Posts</h1>
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn't load the blog posts at this time.
          </p>
        </div>
      </div>
    )
  }
}

// Main page component
export default function BlogListPage() {
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogListContent />
    </Suspense>
  )
}