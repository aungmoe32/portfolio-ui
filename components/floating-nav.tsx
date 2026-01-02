"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("about")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const isProjectsPage = pathname === "/projects"

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isProjectsPage) return

    const handleScroll = () => {
      const sections = ["about", "education", "experience", "projects", "certifications"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isProjectsPage])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const toggleTheme = () => {
    if (!mounted) return
    
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  // Get the appropriate icon for current theme
  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />
    
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  // Get tooltip text
  const getTooltipText = () => {
    if (!mounted) return "Switch theme"
    
    switch (theme) {
      case "light":
        return "Switch to dark mode"
      case "dark":
        return "Switch to system mode"
      case "system":
        return "Switch to light mode"
      default:
        return "Switch theme"
    }
  }

  return (
    <nav className="fixed top-8 right-8 z-50 animate-fade-in">
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          {!isProjectsPage ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-colors",
                  activeSection === "about" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("about")}
              >
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-colors",
                  activeSection === "education" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("education")}
              >
                Education
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-colors",
                  activeSection === "experience" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("experience")}
              >
                Experience
              </Button>
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="rounded-full transition-colors">
                  Projects
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-colors",
                  activeSection === "certifications" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("certifications")}
              >
                Certifications
              </Button>
            </>
          ) : (
            <>
              <Link href="/">
                <Button variant="ghost" size="sm" className="rounded-full transition-colors">
                  Home
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="rounded-full bg-accent text-accent-foreground">
                  All Projects
                </Button>
              </Link>
            </>
          )}

          <div className="ml-2 h-6 w-px bg-border" />

          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-9 w-9" 
            onClick={toggleTheme}
            title={getTooltipText()}
            disabled={!mounted}
          >
            {getThemeIcon()}
          </Button>
        </div>
      </div>
    </nav>
  )
}
