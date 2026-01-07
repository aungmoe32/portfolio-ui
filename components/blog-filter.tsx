"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

interface BlogFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  totalCount: number
}

export default function BlogFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  totalCount
}: BlogFilterProps) {
  const [showAllCategories, setShowAllCategories] = useState(false)

  const displayCategories = showAllCategories ? categories : categories.slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Categories</span>
          <Badge variant="outline" className="text-xs">
            {totalCount} posts
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {displayCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="text-xs capitalize"
            >
              {category.replace('-', ' ')}
            </Button>
          ))}
          
          {categories.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-xs text-muted-foreground"
            >
              {showAllCategories ? 'Show less' : `+${categories.length - 6} more`}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}