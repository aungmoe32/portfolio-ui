import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Twitter,
  Instagram,
} from "lucide-react";
import { getAboutData, getSocialLinkInfo } from "@/lib/about-queries";
import { SocialLink } from "@/types/about";

export default async function Footer() {
  const aboutData = await getAboutData();

  // Helper function to get the appropriate icon for each social platform
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <h3 className="font-bold text-lg mb-3">
              {aboutData?.title || "Portfolio"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aboutData?.currentRole ||
                "Developer focused on building clean, scalable, and user-friendly applications."}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#experience"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/#certifications"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-lg mb-3">Connect</h3>
            <div className="flex items-center gap-4">
              {/* Dynamic Social Links */}
              {aboutData?.socialLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={getSocialLinkInfo(link).name}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}

              {/* Email Link */}
              {aboutData?.email && (
                <a
                  href={`mailto:${aboutData.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {aboutData?.title || "Portfolio"}.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
