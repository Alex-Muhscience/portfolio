import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Alex-Muhscience",
      icon: Github,
      color: "text-gray-900 dark:text-white hover:text-gray-700"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/alex-m-kamau-20015b340/",
      icon: Linkedin,
      color: "text-[#0A66C2] hover:text-[#004182]"
    },
    {
      name: "X (Twitter)",
      href: "https://twitter.com/AlexMuhscience",
      icon: Twitter,
      color: "text-black dark:text-white hover:text-gray-600"
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/254746254055",
      icon: FaWhatsapp,
      color: "text-green-500 hover:text-green-600"
    },
    {
      name: "Email",
      href: "mailto:alex.kamau.2558@gmail.com",
      icon: Mail,
      color: "text-red-500 hover:text-red-600"
    },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Alex M. Kamau</h3>
            <p className="text-sm text-muted-foreground">
              Computer Scientist & Systems Architect specializing in scalable,
              secure digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                Experience
              </a>
              <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={social.color}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>📧 alex.kamau.2558@gmail.com</p>
              <p>📱 +254 746 254 055</p>
              <p>📍 Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Alex M. Kamau. All rights reserved.
            <br />
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
