import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <h3 className="font-bold text-lg mb-3">Aung Moe Myint Thu</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-stack web developer focused on building clean, scalable, and user-friendly applications.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-lg mb-3">Connect</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/aungmoe32"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/aung-moe-myint-thu-679884258"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aung Moe Myint Thu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
