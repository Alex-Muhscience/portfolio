'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, ArrowUpRight, Sparkles } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "alex.kamau.2558@gmail.com",
      href: "mailto:alex.kamau.2558@gmail.com",
      description: "Send me an email for inquiries",
      color: "from-blue-500/20 to-blue-500/10",
      iconColor: "text-blue-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+254 746 254 055",
      href: "tel:+254746254055",
      description: "Call me for direct communication",
      color: "from-green-500/20 to-green-500/10",
      iconColor: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Nairobi, Kenya",
      href: "#",
      description: "Based in Nairobi, Kenya",
      color: "from-purple-500/20 to-purple-500/10",
      iconColor: "text-purple-500"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/Alex-Muhscience",
      description: "View my code repositories",
      color: "hover:text-white",
      bgColor: "from-gray-500/20 to-gray-500/10"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/alex-m-kamau-20015b340/",
      description: "Connect professionally",
      color: "hover:text-blue-400",
      bgColor: "from-blue-500/20 to-blue-500/10"
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      href: "https://twitter.com/AlexMuhscience",
      description: "Follow for tech insights",
      color: "hover:text-sky-400",
      bgColor: "from-sky-500/20 to-sky-500/10"
    },
    {
      icon: FaWhatsapp,
      name: "WhatsApp",
      href: "https://wa.me/254746254055",
      description: "Chat with me on WhatsApp",
      color: "hover:text-green-500",
      bgColor: "from-green-500/20 to-green-500/10"
    }
  ]

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Send className="w-4 h-4" />
            Get In Touch
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Let's Connect
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
          />

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to discuss your next project or explore collaboration opportunities?
            Let's connect and build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-accent/40 hover:bg-accent/70 border border-transparent hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <span className="text-primary font-medium hover:underline block mb-1">
                        {info.value}
                      </span>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links & Call to Action */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Connect Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${social.bgColor} border border-transparent hover:border-primary/20 transition-all duration-300 group ${social.color}`}
                    >
                      <div className="p-2 rounded-lg bg-white/10">
                        <social.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{social.name}</h3>
                        <p className="text-sm text-muted-foreground">{social.description}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8 text-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-8 h-8 text-primary/30" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4">Ready to Start a Project?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm always interested in discussing new opportunities, whether it's full-stack
                  development, system architecture, or cybersecurity assessment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" asChild className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <a href="mailto:alex.kamau.2558@gmail.com">
                        <Mail className="w-5 h-5 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" asChild className="rounded-xl border-border/50 hover:border-primary/30">
                      <a href="tel:+254746254055">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t"
        >
          <p className="text-muted-foreground">
            © 2024 Alex M. Kamau. Building the future of technology, one system at a time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
