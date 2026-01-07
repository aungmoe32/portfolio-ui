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

// Blog-related types
export interface Blog {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: string; // Changed from any[] to string for markdown
  featuredImage?: any;
  category: string;
  tags?: string[];
  author?: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  likeCount?: number;
}

export interface BlogDisplay {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Changed from any[] to string for markdown
  imageUrl?: string;
  category: string;
  tags: string[];
  author?: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  likeCount: number;
}

// GROQ query for all published blogs
const blogsQuery = `*[_type == "blog" && isPublished == true] | order(isFeatured desc, publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  category,
  tags,
  author,
  isPublished,
  isFeatured,
  publishedAt,
  createdAt,
  updatedAt,
  likeCount
}`;

// GROQ query for featured blogs only
const featuredBlogsQuery = `*[_type == "blog" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...6] {
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  category,
  tags,
  author,
  isPublished,
  isFeatured,
  publishedAt,
  createdAt,
  updatedAt,
  likeCount
}`;

// Helper function to transform Sanity blog to display format
function transformBlog(blog: Blog): BlogDisplay {
  return {
    _id: blog._id,
    title: blog.title,
    slug: blog.slug.current,
    excerpt: blog.excerpt,
    content: blog.content || '', // Changed to empty string for markdown
    imageUrl: blog.featuredImage
      ? urlFor(blog.featuredImage).width(800).height(400).url()
      : undefined,
    category: blog.category,
    tags: blog.tags || [],
    author: blog.author,
    isPublished: blog.isPublished,
    isFeatured: blog.isFeatured,
    publishedAt: blog.publishedAt,
    createdAt: blog.createdAt,
    likeCount: blog.likeCount || 0,
  };
}

// Fetch all published blogs
export async function getAllBlogs(): Promise<BlogDisplay[]> {
  try {
    const blogs: Blog[] = await client.fetch(blogsQuery, {}, options);
    return blogs.map(transformBlog);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Fetch featured blogs only
export async function getFeaturedBlogs(): Promise<BlogDisplay[]> {
  try {
    const blogs: Blog[] = await client.fetch(featuredBlogsQuery, {}, options);
    return blogs.map(transformBlog);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
}

// Fetch a single blog by slug
export async function getBlogBySlug(slug: string): Promise<BlogDisplay | null> {
  try {
    const query = `*[_type == "blog" && slug.current == $slug && isPublished == true][0] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      author,
      isPublished,
      isFeatured,
      publishedAt,
      createdAt,
      updatedAt,
      likeCount
    }`;

    const blog: Blog = await client.fetch(query, { slug }, options);
    return blog ? transformBlog(blog) : null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

// Get unique blog categories
export async function getBlogCategories(): Promise<string[]> {
  try {
    const query = `*[_type == "blog" && isPublished == true].category`;
    const categories: string[] = await client.fetch(query, {}, options);
    const uniqueCategories = Array.from(new Set(categories));
    return ["All", ...uniqueCategories.sort()];
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return ["All"];
  }
}

// Get blogs by category
export async function getBlogsByCategory(category: string): Promise<BlogDisplay[]> {
  try {
    const query = category === "All" 
      ? blogsQuery 
      : `*[_type == "blog" && isPublished == true && category == $category] | order(isFeatured desc, publishedAt desc) {
          _id,
          _type,
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          category,
          tags,
          author,
          isPublished,
          isFeatured,
          publishedAt,
          createdAt,
          updatedAt,
          likeCount
        }`;
    
    const blogs: Blog[] = await client.fetch(query, category === "All" ? {} : { category }, options);
    return blogs.map(transformBlog);
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return [];
  }
}
