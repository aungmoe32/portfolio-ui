import { Calendar, Clock, Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt?: string;
  tags: string[];
  imageUrl?: string;
  category: string;
  author?: string;
  likeCount: number;
  isFeatured: boolean;
}

// Calculate estimated reading time based on content length
function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(" ").length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function BlogCard({
  _id,
  title,
  excerpt,
  slug,
  publishedAt,
  tags,
  imageUrl,
  category,
  author,
  likeCount,
  isFeatured,
}: BlogCardProps) {
  const readTime = calculateReadTime(excerpt);
  const displayDate = publishedAt || new Date().toISOString();

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full p-6 hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
        {/* Featured Badge */}
        {/* {isFeatured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="default" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )} */}

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs capitalize">
            {category.replace("-", " ")}
          </Badge>
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(displayDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          {likeCount > 0 && (
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{likeCount}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Author */}
        {author && (
          <p className="text-xs text-muted-foreground mb-3">By {author}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}
