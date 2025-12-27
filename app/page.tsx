import Image from "next/image"
import { Github, Linkedin, FileText, Monitor, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FloatingNav from "@/components/floating-nav"
import Footer from "@/components/footer"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/sanity-queries"
import { ProjectDisplay } from "@/types/project"

export default async function PortfolioPage() {
  // Fetch featured projects on the server
  const featuredProjects = await getFeaturedProjects()

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
                  {featuredProjects.length > 0 ? (
                    featuredProjects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-muted-foreground">No featured projects found.</p>
                    </div>
                  )}
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
  project: ProjectDisplay
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Project Image */}
      <div className="relative h-48 w-full bg-muted">
        <Image src={project.imageUrl || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
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
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Monitor className="h-4 w-4" />
              Demo
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
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
