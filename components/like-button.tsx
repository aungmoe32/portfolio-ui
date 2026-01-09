"use client"

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LikeButtonProps {
  blogId: string
  initialLikeCount: number
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "lg" | "icon"
  className?: string
  showText?: boolean
}

export default function LikeButton({ 
  blogId, 
  initialLikeCount, 
  variant = "outline",
  size = "sm",
  className = "",
  showText = true 
}: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async () => {
    if (isLiking || hasLiked) return
    
    setIsLiking(true)
    
    try {
      // Optimistic update
      setLikeCount(prev => prev + 1)
      setHasLiked(true)
      
      // Call API to update like count in database
      const response = await fetch(`/api/blog/${blogId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to update like count')
      }
      
      const data = await response.json()
      
      if (data.success) {
        // Update with the actual count from server
        setLikeCount(data.likeCount)
      } else {
        throw new Error(data.error || 'Failed to update like count')
      }
      
    } catch (error) {
      console.error('Error liking post:', error)
      
      // Revert optimistic update on error
      setLikeCount(prev => prev - 1)
      setHasLiked(false)
      
      // You could show a toast notification here
      alert('Failed to like the post. Please try again.')
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Button
      variant={hasLiked ? "default" : variant}
      size={size}
      className={`transition-colors ${className}`}
      onClick={handleLike}
      disabled={isLiking}
    >
      <Heart 
        className={`h-4 w-4 ${showText ? 'mr-2' : ''} transition-colors ${
          hasLiked ? 'fill-current text-red-500' : ''
        } ${isLiking ? 'animate-pulse' : ''}`} 
      />
      {showText && (
        <>
          {isLiking ? 'Liking...' : hasLiked ? 'Liked' : 'Like'} ({likeCount})
        </>
      )}
      {!showText && likeCount > 0 && (
        <span className="ml-1">{likeCount}</span>
      )}
    </Button>
  )
}