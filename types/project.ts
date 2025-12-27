export interface Project {
  _id: string
  _type: 'project'
  name: string
  slug: {
    current: string
  }
  description: string
  image: {
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
  usedTechs: string[]
  demoUrl?: string
  liveUrl?: string
  githubUrl?: string
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'cloud' | 'devops' | 'other'
  isFeatured: boolean
  order: number
  createdAt: string
}

// For display purposes, we'll create a flattened version
export interface ProjectDisplay {
  _id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  techs: string[]
  demoUrl?: string
  liveUrl?: string
  githubUrl?: string
  category: string
  isFeatured: boolean
  order: number
  createdAt: string
}