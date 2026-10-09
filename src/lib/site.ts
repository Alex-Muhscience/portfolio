export const site = {
  name: "Alex Murimi Kamau",
  shortName: "Alex Kamau",
  role: "Full-Stack Developer",
  url: "https://portfolio-alex-m-kamau.vercel.app",
  title: "Alex Murimi Kamau — Full-Stack Developer",
  description:
    "Full-Stack Developer in Nairobi building production web applications and business systems across React, Next.js, TypeScript, Laravel, PostgreSQL, MySQL and Linux infrastructure.",
  location: "Nairobi, Kenya",
  timezone: "EAT (UTC+3)",
  email: "alex.kamau.2558@gmail.com",
  phone: "+254 746 254 055",
  links: {
    github: "https://github.com/Alex-Muhscience",
    linkedin: "https://www.linkedin.com/in/alex-m-kamau-20015b340",
    whatsapp: "https://wa.me/254746254055",
    resume: "https://flowcv.com/resume/t249m8own6",
  },
  twitter: "@AlexMuhscience",
} as const

export const navigation = [
  { name: "Work", href: "/#work" },
  { name: "Engineering", href: "/#engineering" },
  { name: "Experience", href: "/#experience" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
] as const

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString()
}
