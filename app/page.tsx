import Image from "next/image"
import { Github, Linkedin, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FloatingNav from "@/components/floating-nav"
import BlogCard from "@/components/blog-card"
import Footer from "@/components/footer"
import Link from "next/link"

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

              {/* Skills Section */}
              <Card className="p-8" id="skills">
                <h2 className="text-2xl font-bold mb-6">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">PHP</Badge>
                  <Badge variant="secondary">Laravel</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">TailwindCSS</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">MySQL</Badge>
                  <Badge variant="secondary">RESTful API</Badge>
                  <Badge variant="secondary">MVC</Badge>
                  <Badge variant="secondary">Responsive Design</Badge>
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
                  <ProjectCard
                    title="ManageX - Modern Content Management System API"
                    description="A powerful, feature-rich RESTful API for content management systems built with Laravel, providing comprehensive tools for managing posts, comments, users, media files, and more."
                    tags={["Laravel"]}
                    links={{
                      github: "#",
                      demo: "#",
                      live: "#",
                    }}
                  />

                  <ProjectCard
                    title="MyanTech E-Commerce & Logistics Management System"
                    description="A comprehensive e-commerce and logistics management platform that handles the complete lifecycle of retail operations, from customer orders through delivery management."
                    tags={["React + Laravel"]}
                    links={{
                      github: "#",
                      demo: "#",
                      live: "#",
                    }}
                  />

                  <ProjectCard
                    title="Passport OAuth Server"
                    description="An OAuth 2.0 authentication server built with Laravel Passport and Laravel Filament, providing secure login and token management."
                    tags={["Laravel"]}
                    links={{
                      github: "#",
                      demo: "#",
                    }}
                  />

                  <ProjectCard
                    title="TALL Stack Chat App"
                    description="A real-time chat application built with the TALL stack that enables instant messaging with comprehensive conversation management features."
                    tags={["TALL Stack"]}
                    links={{
                      github: "#",
                    }}
                  />

                  <ProjectCard
                    title="LMS (Learning Management System)"
                    description="A comprehensive system for online learning and course management with role-based permissions."
                    tags={["Laravel + Vue"]}
                    links={{
                      github: "#",
                      demo: "#",
                    }}
                  />

                  <ProjectCard
                    title="PAM (Tiny PHP MVC Framework)"
                    description="A custom lightweight PHP MVC framework inspired by Laravel for clean architecture web development."
                    tags={["PHP"]}
                    links={{
                      github: "#",
                      demo: "#",
                    }}
                  />
                </div>
              </section>

              {/* Blog Section */}
              <section id="blog">
                <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <BlogCard
                    title="Building Scalable APIs with Laravel"
                    excerpt="Learn best practices for creating robust and scalable RESTful APIs using Laravel's powerful features and patterns."
                    date="2024-12-15"
                    readTime="8 min read"
                    tags={["Laravel", "API", "Backend"]}
                  />

                  <BlogCard
                    title="Modern Authentication Patterns"
                    excerpt="Exploring OAuth 2.0, JWT tokens, and session management strategies for secure web applications."
                    date="2024-12-10"
                    readTime="12 min read"
                    tags={["Security", "OAuth", "Authentication"]}
                  />

                  <BlogCard
                    title="React Performance Optimization"
                    excerpt="Deep dive into React performance optimization techniques including memoization, lazy loading, and code splitting."
                    date="2024-12-05"
                    readTime="10 min read"
                    tags={["React", "Performance", "Frontend"]}
                  />

                  <BlogCard
                    title="Database Design Best Practices"
                    excerpt="Essential principles for designing efficient database schemas and optimizing queries for better performance."
                    date="2024-11-28"
                    readTime="15 min read"
                    tags={["Database", "SQL", "Architecture"]}
                  />
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
  title: string
  description: string
  tags: string[]
  links: {
    github?: string
    demo?: string
    live?: string
  }
}

function ProjectCard({ title, description, tags, links }: ProjectCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

      <div className="flex items-center gap-3 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm">
        {links.github && (
          <a
            href={links.github}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {links.demo && (
          <a
            href={links.demo}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {links.live && (
          <a
            href={links.live}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            Live <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </Card>
  )
}
