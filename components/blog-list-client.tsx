"use client"

import { useState, useMemo } from "react"
import BlogCard from "@/components/blog-card"
import BlogFilter from "@/components/blog-filter"
import { type BlogDisplay } from "@/lib/sanity-queries"
import { Badge } from "@/components/ui/badge"

interface BlogListClientProps {
  initialBlogs: BlogDisplay[]
  categories: string[]
}

export default function BlogListClient({ initialBlogs, categories }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter blogs based on category and search term
  const filteredBlogs = useMemo(() => {
    let filtered = initialBlogs

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(blog => blog.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (blog.author && blog.author.toLowerCase().includes(searchLower))
      )
    }

    return filtered
  }, [initialBlogs, selectedCategory, searchTerm])

  // Separate featured and regular blogs
  const featuredBlogs = filteredBlogs.filter(blog => blog.isFeatured)
  const regularBlogs = filteredBlogs.filter(blog => !blog.isFeatured)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar - Filters */}
      <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-6">
          <BlogFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalCount={filteredBlogs.length}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-3 space-y-8">
        {/* Featured Blogs Section */}
        {featuredBlogs.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-semibold">Featured Posts</h2>
              <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                ⭐ Featured
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  _id={blog._id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  slug={blog.slug}
                  publishedAt={blog.publishedAt}
                  tags={blog.tags}
                  imageUrl={blog.imageUrl}
                  category={blog.category}
                  author={blog.author}
                  likeCount={blog.likeCount}
                  isFeatured={blog.isFeatured}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Blogs Section */}
        {regularBlogs.length > 0 && (
          <section>
            {featuredBlogs.length > 0 && (
              <h2 className="text-2xl font-semibold mb-6">All Posts</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {regularBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  _id={blog._id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  slug={blog.slug}
                  publishedAt={blog.publishedAt}
                  tags={blog.tags}
                  imageUrl={blog.imageUrl}
                  category={blog.category}
                  author={blog.author}
                  likeCount={blog.likeCount}
                  isFeatured={blog.isFeatured}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No blog posts found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `No posts match "${searchTerm}" in the ${selectedCategory} category.`
                : `No posts found in the ${selectedCategory} category.`
              }
            </p>
            <button 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}