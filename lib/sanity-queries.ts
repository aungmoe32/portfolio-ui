import { client } from "@/sanity/client";
import { Project, ProjectDisplay } from "@/types/project";
import imageUrlBuilder from "@sanity/image-url";
const options = { next: { revalidate: 60 } };
// Create an image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ query for all projects
const projectsQuery = `*[_type == "project"] | order(isFeatured desc, order asc, createdAt desc) {
  _id,
  _type,
  name,
  slug,
  description,
  image,
  usedTechs,
  demoUrl,
  liveUrl,
  githubUrl,
  category,
  isFeatured,
  order,
  createdAt
}`;

// GROQ query for featured projects only
const featuredProjectsQuery = `*[_type == "project" && isFeatured == true] | order(order asc, createdAt desc) [0...6] {
  _id,
  _type,
  name,
  slug,
  description,
  image,
  usedTechs,
  demoUrl,
  liveUrl,
  githubUrl,
  category,
  isFeatured,
  order,
  createdAt
}`;

// Helper function to transform Sanity project to display format
function transformProject(project: Project): ProjectDisplay {
  return {
    _id: project._id,
    name: project.name,
    slug: project.slug.current,
    description: project.description,
    imageUrl: project.image
      ? urlFor(project.image).width(800).height(400).url()
      : "/placeholder.svg",
    techs: project.usedTechs || [],
    demoUrl: project.demoUrl,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    category: getCategoryDisplayName(project.category),
    isFeatured: project.isFeatured,
    order: project.order,
    createdAt: project.createdAt,
  };
}

// Helper function to get display name for category
function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    web: "Full-Stack",
    mobile: "Mobile",
    desktop: "Desktop",
    api: "Backend",
    cloud: "Cloud",
    devops: "DevOps",
    other: "Other",
  };
  return categoryMap[category] || "Other";
}

// Fetch all projects
export async function getAllProjects(): Promise<ProjectDisplay[]> {
  try {
    const projects: Project[] = await client.fetch(projectsQuery, {}, options);
    return projects.map(transformProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Fetch featured projects only
export async function getFeaturedProjects(): Promise<ProjectDisplay[]> {
  try {
    const projects: Project[] = await client.fetch(
      featuredProjectsQuery,
      {},
      options
    );
    return projects.map(transformProject);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

// Fetch a single project by slug
export async function getProjectBySlug(
  slug: string
): Promise<ProjectDisplay | null> {
  try {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      _type,
      name,
      slug,
      description,
      image,
      usedTechs,
      demoUrl,
      liveUrl,
      githubUrl,
      category,
      isFeatured,
      order,
      createdAt
    }`;

    const project: Project = await client.fetch(query, { slug }, options);
    return project ? transformProject(project) : null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

// Get unique categories from all projects
export async function getProjectCategories(): Promise<string[]> {
  try {
    const query = `*[_type == "project"].category`;
    const categories: string[] = await client.fetch(query, {}, options);
    const uniqueCategories = Array.from(
      new Set(categories.map(getCategoryDisplayName))
    );
    return ["All", ...uniqueCategories.sort()];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ["All"];
  }
}
