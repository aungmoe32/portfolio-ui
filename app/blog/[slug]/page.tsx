import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, type BlogDisplay } from "@/lib/sanity-queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, Heart, Share } from "lucide-react";
import BlogPageClient from "@/components/blog-page-client";
import MarkdownRenderer from "@/components/markdown-renderer";
import LikeButton from "@/components/like-button";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Loading skeleton for the blog page
function BlogPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}


// Server component to fetch blog data
async function BlogContent({ params }: BlogPageProps) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      notFound();
    }

    const readTime = Math.ceil(blog.excerpt.split(" ").length / 200);
    const displayDate = blog.publishedAt || blog.createdAt;

    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3 space-y-8">
            {/* Back Navigation */}
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Featured Image */}
            {blog.imageUrl && (
              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Header */}
            <header className="space-y-4">
              {/* Category */}
              <Badge variant="outline" className="capitalize">
                {blog.category.replace("-", " ")}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {blog.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {blog.author && (
                  <span className="font-medium text-foreground">
                    By {blog.author}
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(displayDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>

                {blog.likeCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{blog.likeCount} likes</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="mt-8">
              <MarkdownRenderer content={blog.content} />
            </div>

            {/* Article Footer */}
            <footer className="pt-8 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <LikeButton 
                    blogId={blog._id}
                    initialLikeCount={blog.likeCount}
                    variant="outline"
                    size="sm"
                  />
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </footer>
          </article>

          {/* Client-side interactive components - Sidebar */}
          <BlogPageClient
            content={blog.content}
            likeCount={blog.likeCount}
            blog={blog}
            readTime={readTime}
            displayDate={displayDate}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}

// Main page component
export default function BlogPage({ params }: BlogPageProps) {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogContent params={params} />
    </Suspense>
  );
}
