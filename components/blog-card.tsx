import { Calendar, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
}

export default function BlogCard({ title, excerpt, date, readTime, tags }: BlogCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{readTime}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
