import Image from "next/image"
import { Github, Linkedin, FileText, Monitor, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FloatingNav from "@/components/floating-nav"
import Footer from "@/components/footer"
import Link from "next/link"

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
]

export default function PortfolioPage() {
  return (
    <>
      <FloatingNav />

      <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            {/* Left Sidebar */}
            <aside className="space-y-8">
              {/* Profile Section */}
              <Card className="overflow-hidden p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full">
                    <Image
                      src="/images/image.png"
                      alt="Profile"
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>

                  <h1 className="text-3xl font-bold mb-1">Aung Moe Myint Thu</h1>
                  <p className="text-muted-foreground mb-4">Full-Stack Web Developer</p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Based in Hmawbi, Yangon, Myanmar. I develop full-stack web applications with a focus on clean
                    architecture, usability, and performance.
                  </p>

                  <Button className="w-full mb-6">CONTACT ME</Button>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <a
                      href="https://github.com/aungmoe32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/aung-moe-myint-thu-679884258"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="space-y-12">
              {/* About Section */}
              <section id="about">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">About Me</h2>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-5 w-5" />
                  </Button>
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Highly motivated full-stack web developer with strong front-end and back-end expertise. Skilled in
                    building responsive and dynamic web applications through personal and academic projects. Proficient
                    in database management and experienced with Git for version control. Committed to continuous
                    learning and excited to contribute innovative solutions to real-world challenges.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                    Currently expanding my knowledge in software architecture and design patterns.
                  </p>
                </div>
              </section>

              {/* Featured Projects Section */}
              <section id="projects">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">Featured Projects</h2>
                  <Link href="/projects">
                    <Button variant="outline">See All Projects</Button>
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {projects.slice(0, 6).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    name: string
    description: string
    image: string
    techs: string[]
    category: string
    links: {
      github?: string
      demo?: string
      live?: string
    }
  }
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
  )
}
