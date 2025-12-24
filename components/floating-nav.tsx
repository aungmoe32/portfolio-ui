"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("about")
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const isProjectsPage = pathname === "/projects"

  useEffect(() => {
    if (isProjectsPage) return

    const handleScroll = () => {
      const sections = ["about", "projects", "blog", "skills"]
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
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
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
                  activeSection === "projects" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-colors",
                  activeSection === "blog" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("blog")}
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-colors",
                  activeSection === "skills" && "bg-accent text-accent-foreground",
                )}
                onClick={() => scrollToSection("skills")}
              >
                Skills
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

          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
