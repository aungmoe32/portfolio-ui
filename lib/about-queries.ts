import { client } from "@/sanity/client"
import { About, AboutDisplay } from "@/types/about"
import { urlFor } from "./sanity-queries"

// GROQ query for active about data
const aboutQuery = `*[_type == "about" && isActive == true][0] {
  _id,
  _type,
  title,
  currentRole,
  description,
  profileImage,
  skills,
  experience,
  location,
  email,
  socialLinks,
  isActive,
  updatedAt
}`

// Helper function to transform Sanity about to display format
function transformAbout(about: About): AboutDisplay {
  return {
    _id: about._id,
    title: about.title,
    currentRole: about.currentRole,
    description: about.description,
    profileImageUrl: about.profileImage ? urlFor(about.profileImage).width(400).height(400).url() : undefined,
    skills: about.skills || [],
    experience: about.experience,
    location: about.location,
    email: about.email,
    socialLinks: about.socialLinks || [],
    isActive: about.isActive,
    updatedAt: about.updatedAt,
  }
}

// Helper function to get social link display info
export function getSocialLinkInfo(link: { platform: string; label?: string }) {
  const platformMap = {
    'linkedin': { name: 'LinkedIn', icon: 'linkedin' },
    'github': { name: 'GitHub', icon: 'github' },
    'twitter': { name: 'Twitter/X', icon: 'twitter' },
    'instagram': { name: 'Instagram', icon: 'instagram' },
    'website': { name: 'Website', icon: 'external-link' },
    'other': { name: link.label || 'Link', icon: 'external-link' }
  }
  
  return platformMap[link.platform as keyof typeof platformMap] || { 
    name: link.label || 'Link', 
    icon: 'external-link' 
  }
}

// Fetch active about data
export async function getAboutData(): Promise<AboutDisplay | null> {
  try {
    const about: About = await client.fetch(aboutQuery)
    return about ? transformAbout(about) : null
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
  }
}

// Fetch just the essential info for header/quick display
export async function getBasicAboutInfo(): Promise<Pick<AboutDisplay, 'currentRole' | 'location' | 'email'> | null> {
  try {
    const query = `*[_type == "about" && isActive == true][0] {
      currentRole,
      location,
      email
    }`
    
    const basicInfo = await client.fetch(query)
    return basicInfo || null
  } catch (error) {
    console.error('Error fetching basic about info:', error)
    return null
  }
}