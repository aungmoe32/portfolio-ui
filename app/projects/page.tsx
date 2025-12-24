"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Monitor, Search } from "lucide-react"
import Image from "next/image"
import FloatingNav from "@/components/floating-nav"
import Footer from "@/components/footer"
import Link from "next/link"

// Project data with categories and images
const projects = [
  {
    id: 1,
    name: "ManageX - Modern Content Management System API",
    description:
      "A powerful, feature-rich RESTful API for content management systems built with Laravel, providing comprehensive tools for managing posts, comments, users, media files, and more.",
    image: "/cms-dashboard.png",
    techs: ["Laravel", "RESTful API", "MySQL", "PHP"],
    category: "Backend",
    links: {
      github: "#",
      demo: "#",
      live: "#",
    },
  },
  {
    id: 2,
    name: "MyanTech E-Commerce & Logistics Management System",
    description:
      "A comprehensive e-commerce and logistics management platform that handles the complete lifecycle of retail operations, from customer orders through delivery management.",
    image: "/ecommerce-logistics-dashboard.jpg",
    techs: ["React", "Laravel", "PostgreSQL", "TailwindCSS"],
    category: "Full-Stack",
    links: {
      github: "#",
      demo: "#",
      live: "#",
    },
  },
  {
    id: 3,
    name: "Passport OAuth Server",
    description:
      "An OAuth 2.0 authentication server built with Laravel Passport and Laravel Filament, providing secure login and token management.",
    image: "/oauth-authentication-server-interface.jpg",
    techs: ["Laravel", "OAuth 2.0", "Laravel Passport", "Filament"],
    category: "Backend",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    id: 4,
    name: "TALL Stack Chat App",
    description:
      "A real-time chat application built with the TALL stack that enables instant messaging with comprehensive conversation management features.",
    image: "/realtime-chat-application-interface.jpg",
    techs: ["TailwindCSS", "Alpine.js", "Laravel", "Livewire"],
    category: "Full-Stack",
    links: {
      github: "#",
    },
  },
  {
    id: 5,
    name: "LMS (Learning Management System)",
    description:
      "A comprehensive system for online learning and course management with role-based permissions for students, instructors, and administrators.",
    image: "/lms-dashboard.png",
    techs: ["Laravel", "Vue.js", "MySQL", "TailwindCSS"],
    category: "Full-Stack",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    id: 6,
    name: "PAM (Tiny PHP MVC Framework)",
    description:
      "A custom lightweight PHP MVC framework inspired by Laravel for clean architecture web development with routing and ORM capabilities.",
    image: "/php-framework-code-structure.jpg",
    techs: ["PHP", "MVC", "Composer"],
    category: "Backend",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    id: 7,
    name: "Real Estate Property Listing Platform",
    description:
      "A modern property listing platform with advanced search filters, property comparison, and interactive map integration for real estate agencies.",
    image: "/real-estate-website.png",
    techs: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Full-Stack",
    links: {
      github: "#",
      demo: "#",
      live: "#",
    },
  },
  {
    id: 8,
    name: "Task Management & Collaboration Tool",
    description:
      "A team collaboration platform with kanban boards, task assignments, time tracking, and real-time updates for project management.",
    image: "/task-management-kanban.png",
    techs: ["React", "Node.js", "MongoDB", "Socket.io"],
    category: "Full-Stack",
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    id: 9,
    name: "Weather Forecast Application",
    description:
      "A beautiful weather app with 7-day forecasts, location-based predictions, and interactive weather maps using third-party APIs.",
    image: "/weather-forecast-app.png",
    techs: ["React Native", "TypeScript", "REST API"],
    category: "Mobile",
    links: {
      github: "#",
      demo: "#",
    },
  },
]

const categories = ["All", "Full-Stack", "Backend", "Mobile"]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techs.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <>
      <FloatingNav />

      <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-12">
            <Link href="/" className="inline-block mb-6">
              <Button variant="ghost" className="gap-2">
                ← Back to Home
              </Button>
            </Link>

            <h1 className="text-4xl font-bold mb-4">All Projects</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore my portfolio of {projects.length} projects showcasing various technologies and solutions.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Project Image */}
                  <div className="relative h-48 w-full bg-muted">
                    <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <Badge variant="secondary" className="mb-3">
                      {project.category}
                    </Badge>

                    <h3 className="text-xl font-semibold mb-3 leading-snug">{project.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techs.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex items-center gap-3 text-sm pt-4 border-t border-border">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Monitor className="h-4 w-4" />
                          Demo
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
