import { Button } from "@/components/ui/button"
import FloatingNav from "@/components/floating-nav"
import Footer from "@/components/footer"
import Link from "next/link"
import { getAllProjects, getProjectCategories } from "@/lib/sanity-queries"
import ProjectsFilter from "@/components/projects-filter"

export default async function ProjectsPage() {
  // Fetch projects and categories on the server
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getProjectCategories()
  ])

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

          {/* Projects Filter Component */}
          <ProjectsFilter projects={projects} categories={categories} />
        </div>
      </div>

      <Footer />
    </>
  )
}
