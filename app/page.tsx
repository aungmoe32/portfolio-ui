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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingNav from "@/components/floating-nav";
import Footer from "@/components/footer";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/sanity-queries";
import { getAboutData, getSocialLinkInfo } from "@/lib/about-queries";
import { ProjectDisplay } from "@/types/project";
import PortableTextRenderer from "@/components/portable-text";

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
  // Fetch featured projects and about data on the server
  const [featuredProjects, aboutData] = await Promise.all([
    getFeaturedProjects(),
    getAboutData(),
  ]);

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
                      src={aboutData?.profileImageUrl || "/images/image.png"}
                      alt={aboutData?.currentRole || "Profile"}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>

                  <h1 className="text-3xl font-bold mb-1">
                    {aboutData?.title || "Your Name"}
                  </h1>
                  <p className="text-muted-foreground mb-4">
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">Education</h2>
                  <Button variant="ghost" size="icon">
                    <GraduationCap className="h-5 w-5" />
                  </Button>
                </div>
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        Bachelor of Engineering in Information Technology
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Technological University (Hmawbi)
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Expected Graduation: January 2028</span>
                        <Badge variant="outline" className="text-xs">
                          In Progress
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
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
                      <p className="text-muted-foreground">
                        No featured projects found.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Certifications Section */}
              <section id="certifications">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">Certifications</h2>
                  <Button variant="ghost" size="icon">
                    <Award className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          AWS Certified Solutions Architect - Associate
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Amazon Web Services
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
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
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          Certified Kubernetes Administrator (CKA)
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Cloud Native Computing Foundation
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400">
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
