import Image from "next/image";
import {
  Github,
  Linkedin,
  FileText,
  Monitor,
  ExternalLink,
  MapPin,
  Mail,
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
  PlayCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingNav from "@/components/floating-nav";
import Footer from "@/components/footer";
import Link from "next/link";
import { getFeaturedProjects, getFeaturedBlogs } from "@/lib/sanity-queries";
import { getAboutData, getSocialLinkInfo } from "@/lib/about-queries";
import { ProjectDisplay } from "@/types/project";
import PortableTextRenderer from "@/components/portable-text";
import BlogCard from "@/components/blog-card";

// Helper function to get icon component based on platform
function getIconComponent(iconName: string) {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Github, // Using Github as fallback for now
    instagram: Github, // Using Github as fallback for now
    "external-link": ExternalLink,
  };
  return icons[iconName as keyof typeof icons] || ExternalLink;
}

export default async function PortfolioPage() {
  // Fetch featured projects, featured blogs, and about data on the server
  const [featuredProjects, featuredBlogs, aboutData] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedBlogs(),
    getAboutData(),
  ]);

  return (
    <>
      <FloatingNav />

      <div className="min-h-screen bg-background py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[380px_1fr]">
            {/* Left Sidebar */}
            <aside className="space-y-6 sm:space-y-8">
              {/* Profile Section */}
              <Card className="overflow-hidden p-6 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 sm:mb-6 h-32 w-32 sm:h-48 sm:w-48 overflow-hidden rounded-full">
                    <Image
                      src={aboutData?.profileImageUrl || "/images/image.png"}
                      alt={aboutData?.currentRole || "Profile"}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    {aboutData?.title || "Your Name"}
                  </h1>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {aboutData?.currentRole || "Full-Stack Web Developer"}
                  </p>

                  {aboutData?.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{aboutData.location}</span>
                    </div>
                  )}

                  {aboutData?.email ? (
                    <Button className="w-full mb-6" asChild>
                      <a href={`mailto:${aboutData.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        CONTACT ME
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full mb-6">CONTACT ME</Button>
                  )}

                  {/* Social Links */}
                  {aboutData?.socialLinks &&
                  aboutData.socialLinks.length > 0 ? (
                    <div className="flex items-center gap-4 text-muted-foreground">
                      {aboutData.socialLinks.map((link, index) => {
                        const linkInfo = getSocialLinkInfo(link);
                        const IconComponent = getIconComponent(linkInfo.icon);

                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                            title={linkInfo.name}
                          >
                            <IconComponent className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="space-y-8 sm:space-y-12">
              {/* About Section */}
              <section id="about">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-5 w-5" />
                  </Button>
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {aboutData?.description ? (
                    <PortableTextRenderer
                      content={aboutData.description}
                      className="text-lg leading-relaxed"
                    />
                  ) : (
                    <>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        Highly motivated full-stack web developer with strong
                        front-end and back-end expertise. Skilled in building
                        responsive and dynamic web applications through personal
                        and academic projects. Proficient in database management
                        and experienced with Git for version control. Committed
                        to continuous learning and excited to contribute
                        innovative solutions to real-world challenges.
                      </p>
                      <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                        Currently expanding my knowledge in software
                        architecture and design patterns.
                      </p>
                    </>
                  )}

                  {/* Skills Display */}
                  {aboutData?.skills && aboutData.skills.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Key Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {aboutData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {aboutData?.experience && (
                    <div className="mt-6">
                      <p className="text-muted-foreground">
                        <strong>{aboutData.experience}+ years</strong> of
                        experience in software development
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Education Section */}
              <section id="education">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
                  <Button variant="ghost" size="icon">
                    <GraduationCap className="h-5 w-5" />
                  </Button>
                </div>
                <Card className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 leading-tight">
                        Bachelor of Engineering in Information Technology
                      </h3>
                      <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                        Technological University (Hmawbi)
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <span>Expected Graduation: December 2027</span>
                        <Badge
                          variant="outline"
                          className="text-xs w-fit self-center sm:self-start"
                        >
                          In Progress
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Experience Section */}
              <section id="experience">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">Experience</h2>
                  <Button variant="ghost" size="icon">
                    <Briefcase className="h-5 w-5" />
                  </Button>
                </div>
                <Card className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-2">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                            Code2Career Hackathon 2025
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            MJC – Yangon
                          </p>
                        </div>
                        <div className="flex flex-col sm:text-right">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            <span>Feb 2025</span>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-3 sm:gap-1">
                            <a
                              href="https://www.youtube.com/watch?v=yrzfl9UrwCo"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                            >
                              <PlayCircle className="h-3 w-3" />
                              Demo Video
                            </a>
                            <a
                              href="https://github.com/aungmoe32/myantech"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Github className="h-3 w-3" />
                              GitHub Repo
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed">
                          Collaborated in a fast-paced team to build a logistics
                          ERP web app supporting inventory, orders, deliveries,
                          payments, and 4 user roles using Laravel REST APIs and
                          React, delivering a user-friendly, multi-portal
                          e-commerce system.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm leading-relaxed">
                            Implemented stateless, role-based access control for
                            SPA frontend using Laravel Sanctum and Spatie
                            Permissions, optimized security and scalability
                            through a normalized database schema, ensuring
                            role-restricted user actions
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm leading-relaxed">
                            Implemented real-time communication and tracking
                            features using Pusher WebSockets and Laravel Echo,
                            delivering live chat, instant order status updates,
                            and delivery tracking with push notifications to
                            improve customer support
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm leading-relaxed">
                            Improved API performance by queuing order status
                            emails with Laravel Queue, reducing response time by
                            ~70%
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                        <Badge variant="secondary" className="text-xs">
                          Laravel
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          React
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          REST APIs
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Laravel Sanctum
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Pusher WebSockets
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Laravel Queue
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Role-based Access
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Featured Projects Section */}
              <section id="projects">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Featured Projects
                  </h2>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-sm"
                    >
                      See All Projects
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {featuredProjects.length > 0 ? (
                    featuredProjects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-muted-foreground">
                        No featured projects found.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Featured Blog Posts Section */}
              <section id="blog">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Latest Blog Posts
                  </h2>
                  <Link href="/blog">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-sm"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      View All Posts
                    </Button>
                  </Link>
                </div>

                {featuredBlogs.length > 0 ? (
                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    {featuredBlogs.slice(0, 4).map((blog) => (
                      <BlogCard
                        key={blog._id}
                        _id={blog._id}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        slug={blog.slug}
                        publishedAt={blog.publishedAt}
                        tags={blog.tags}
                        imageUrl={blog.imageUrl}
                        category={blog.category}
                        author={blog.author}
                        likeCount={blog.likeCount}
                        isFeatured={blog.isFeatured}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mb-4">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No blog posts yet
                    </h3>
                    <p className="text-muted-foreground">
                      Check back soon for insights and tutorials!
                    </p>
                  </div>
                )}
              </section>

              {/* Certifications Section */}
              <section id="certifications">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Certifications
                  </h2>
                  <Button variant="ghost" size="icon">
                    <Award className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 leading-tight">
                          AWS Certified Solutions Architect - Associate
                        </h3>
                        <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                          Amazon Web Services
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                            Certified
                          </Badge>
                          <a
                            href="https://www.credly.com/badges/a3893d20-e575-4474-803f-a7d997a80c9f/public_url"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Credentials
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 leading-tight">
                          Certified Kubernetes Administrator (CKA)
                        </h3>
                        <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                          Cloud Native Computing Foundation
                        </p>
                        <div className="flex items-center justify-center sm:justify-start">
                          <Badge
                            variant="outline"
                            className="text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400 text-xs"
                          >
                            In Progress
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
}

interface ProjectCardProps {
  project: ProjectDisplay;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Project Image */}
      <div className="relative h-60 w-full bg-muted">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Content */}
      <div className="px-6">
        {/* Category Badge */}
        <Badge variant="secondary" className="mb-3">
          {project.category}
        </Badge>

        <h3 className="text-xl font-semibold mb-3 leading-snug">
          {project.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>

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
  );
}
