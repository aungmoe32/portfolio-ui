import { PortableTextBlock } from '@portabletext/types'

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'instagram' | 'website' | 'other'
  url: string
  label?: string
}

export interface About {
  _id: string
  _type: 'about'
  title: string
  currentRole: string
  description: PortableTextBlock[]
  profileImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  skills?: string[]
  experience?: number
  location?: string
  email?: string
  socialLinks?: SocialLink[]
  isActive: boolean
  updatedAt: string
}

// For display purposes, we'll create a flattened version
export interface AboutDisplay {
  _id: string
  title: string
  currentRole: string
  description: PortableTextBlock[]
  profileImageUrl?: string
  skills: string[]
  experience?: number
  location?: string
  email?: string
  socialLinks: SocialLink[]
  isActive: boolean
  updatedAt: string
}