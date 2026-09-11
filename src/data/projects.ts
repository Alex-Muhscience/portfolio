export interface Project {
  id: string
  title: string
  category: string
  role?: string
  description: string
  problem: string
  solution: string
  architecture: string
  technologies: string[]
  challenges: string[]
  outcomes: string[]
  metrics: {
    label: string
    value: string
  }[]
  lessons: string[]
  github?: string
  demo?: string
  image: string
  favicon?: string
  featured: boolean
  year: number
}

export const projects: Project[] = [
  {
    id: "afriasia-career-center",
    title: "AfriAsia Career Development Center",
    category: "Full-stack Engineering",
    role: "Full-stack developer and sole technical owner",
    description: "Premium career development center website built in August 2026 as a sister-company counterpart to the EuroAfrique platform for premium clients.",
    problem: "Premium clients needed a dedicated digital presence for career development services, with a clear experience tailored to their audience rather than the broader EuroAfrique platform.",
    solution: "Built and deployed a polished career development center website with reusable full-stack patterns, responsive interfaces, structured content, and a production-ready client experience.",
    architecture: "Production web application built around reusable Laravel and modern frontend patterns, with managed hosting, deployment, and search-ready content architecture.",
    technologies: ["Laravel", "PHP", "JavaScript", "MySQL", "Cloudflare", "GitHub Actions"],
    challenges: [
      "Creating a premium client-facing experience with a distinct visual identity",
      "Structuring career development content for clear discovery and conversion",
      "Delivering a responsive experience across mobile and desktop devices",
      "Maintaining reliable production deployment and search-ready content"
    ],
    outcomes: [
      "Live at afriasiacareercenter.com",
      "Dedicated premium-client sister-company experience delivered",
      "Responsive production website launched"
    ],
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Audience", value: "Premium" },
      { label: "Delivery", value: "Production" }
    ],
    lessons: [
      "A focused audience benefits from a focused product experience",
      "Reusable platform patterns can support distinct client brands",
      "Clear content architecture is as important as implementation quality"
    ],
    demo: "https://afriasiacareercenter.com",
    favicon: "/images/projects/afriasia-career-center.ico",
    image: "/images/projects/afriasia-career-center.jpg",
    featured: true,
    year: 2026
  },
  {
    id: "healthcare-platform",
    title: "Scalable Healthcare Management Platform",
    category: "Full-stack Engineering",
    description: "Enterprise-grade healthcare management system serving multiple clinics with patient records, appointment scheduling, and telemedicine capabilities.",
    problem: "Healthcare providers struggled with fragmented systems, data silos, and inefficient patient management leading to operational inefficiencies and poor patient experience.",
    solution: "Designed and implemented a unified platform with modular microservices, real-time data synchronization, and intuitive user interfaces for healthcare professionals and patients.",
    architecture: "Event-sourced architecture with CQRS pattern, distributed databases, and API-first design for seamless third-party integrations.",
    technologies: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "AWS", "Socket.io"],
    challenges: [
      "Ensuring HIPAA compliance across all system components",
      "Managing complex healthcare workflows and regulations",
      "Achieving sub-second response times for critical operations",
      "Implementing robust data backup and disaster recovery"
    ],
    outcomes: [
      "45% improvement in appointment scheduling efficiency",
      "30% reduction in administrative overhead",
      "Successfully deployed across 12 clinics serving 50,000+ patients"
    ],
    metrics: [
      { label: "Performance", value: "< 500ms" },
      { label: "Uptime", value: "99.9%" },
      { label: "User Adoption", value: "95%" }
    ],
    lessons: [
      "The critical importance of domain expertise in healthcare systems",
      "Building systems that can adapt to regulatory changes",
      "The value of iterative development with healthcare stakeholders"
    ],
    image: "/images/projects/healthcare.jpg",
    featured: false,
    year: 2023
  },
  {
    id: "password-manager",
    title: "Secure Password Management System",
    category: "Cybersecurity",
    description: "Enterprise-grade password manager with advanced security features, team collaboration, and zero-knowledge architecture.",
    problem: "Teams struggle with password management leading to security vulnerabilities, productivity losses, and compliance issues.",
    solution: "Developed a zero-knowledge password manager with end-to-end encryption, secure sharing capabilities, and comprehensive audit trails.",
    architecture: "Zero-knowledge architecture with client-side encryption, distributed key management, and secure multi-party computation for team features.",
    technologies: ["Rust", "React", "WebAssembly", "SQLite", "AES-256", "PBKDF2"],
    challenges: [
      "Implementing truly zero-knowledge architecture",
      "Managing cryptographic keys securely at scale",
      "Ensuring usability without compromising security",
      "Building trust in a security-critical application"
    ],
    outcomes: [
      "Zero data breaches or security incidents",
      "Adopted by 200+ enterprise users",
      "Achieved SOC 2 Type II compliance"
    ],
    metrics: [
      { label: "Security Score", value: "A+" },
      { label: "User Retention", value: "94%" },
      { label: "Audit Success", value: "100%" }
    ],
    lessons: [
      "Security and usability are not mutually exclusive",
      "The importance of security by design principles",
      "Building user trust through transparent security practices"
    ],
    image: "/images/projects/password-manager.jpg",
    featured: false,
    year: 2023
  },
  {
    id: "automation-platform",
    title: "Enterprise Automation Platform",
    category: "Automation Engineering",
    description: "Low-code automation platform enabling non-technical users to build complex workflows and integrations.",
    problem: "Businesses waste significant time on repetitive tasks and manual processes that could be automated, leading to inefficiencies and human error.",
    solution: "Created a visual programming platform with drag-and-drop interface, pre-built connectors, and advanced workflow orchestration capabilities.",
    architecture: "Plugin-based architecture with event-driven execution engine, distributed worker pools, and RESTful API integrations.",
    technologies: ["TypeScript", "Node.js", "React Flow", "MongoDB", "RabbitMQ", "Docker"],
    challenges: [
      "Creating an intuitive interface for complex logic",
      "Ensuring reliability in automated business processes",
      "Managing resource consumption in automation workflows",
      "Providing debugging capabilities for complex workflows"
    ],
    outcomes: [
      "80% reduction in manual processing time",
      "500+ active workflows across multiple organizations",
      "99.5% workflow success rate"
    ],
    metrics: [
      { label: "Workflow Success", value: "99.5%" },
      { label: "Time Saved", value: "80%" },
      { label: "Active Users", value: "1,200+" }
    ],
    lessons: [
      "The power of visual programming for business users",
      "The importance of observability in automated systems",
      "Building platforms that empower non-technical users"
    ],
    image: "/images/projects/automation.jpg",
    featured: false,
    year: 2022
  },
  {
    id: "distributed-cache",
    title: "High-Performance Distributed Cache",
    category: "Distributed Systems",
    description: "Custom distributed caching solution with advanced consistency models and performance optimizations for high-traffic applications.",
    problem: "Traditional caching solutions struggle with consistency, performance, and scalability in distributed environments.",
    solution: "Implemented a distributed cache with tunable consistency, automatic sharding, and intelligent data placement algorithms.",
    architecture: "Gossip protocol-based cluster management, consistent hashing for data distribution, and multi-level caching hierarchy.",
    technologies: ["Go", "Raft Consensus", "gRPC", "LevelDB", "Docker", "Kubernetes"],
    challenges: [
      "Maintaining consistency in distributed environments",
      "Optimizing for both read and write performance",
      "Handling network partitions gracefully",
      "Implementing efficient data replication strategies"
    ],
    outcomes: [
      "10x improvement in cache hit rates",
      "Sub-millisecond response times at scale",
      "Successfully deployed in production serving 1M+ requests/second"
    ],
    metrics: [
      { label: "Response Time", value: "< 1ms" },
      { label: "Hit Rate", value: "95%" },
      { label: "Throughput", value: "1M RPS" }
    ],
    lessons: [
      "The trade-offs between consistency and performance",
      "The importance of monitoring and observability in distributed systems",
      "Building systems that can evolve with changing requirements"
    ],
    image: "/images/projects/distributed-cache.jpg",
    featured: false,
    year: 2022
  },
  {
    id: "seo-platform",
    title: "Advanced SEO Optimization Platform",
    category: "Web Systems",
    description: "Comprehensive SEO platform with technical SEO automation, content optimization, and performance monitoring.",
    problem: "Organizations struggle with technical SEO implementation and ongoing optimization leading to poor search visibility.",
    solution: "Built an automated SEO platform with real-time monitoring, technical SEO fixes, and content optimization recommendations.",
    architecture: "Serverless architecture with microservices for different SEO functions, real-time data processing, and machine learning for content optimization.",
    technologies: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Redis", "AWS Lambda", "S3"],
    challenges: [
      "Processing large volumes of SEO data in real-time",
      "Implementing accurate search ranking algorithms",
      "Managing SEO changes without affecting site performance",
      "Building trust with automated SEO recommendations"
    ],
    outcomes: [
      "300% improvement in organic search traffic",
      "45% increase in search engine rankings",
      "Implemented across 50+ websites with consistent results"
    ],
    metrics: [
      { label: "Traffic Growth", value: "300%" },
      { label: "Ranking Improvement", value: "45%" },
      { label: "Client Satisfaction", value: "98%" }
    ],
    lessons: [
      "SEO is a systems problem, not just a content problem",
      "The importance of data-driven SEO decisions",
      "Building automated systems that augment human expertise"
    ],
    image: "/images/projects/seo-platform.jpg",
    featured: false,
    year: 2021
  },
  {
    id: "euroafrique-platform",
    title: "EuroAfrique Corporate Skills Platform",
    category: "Full-stack Engineering",
    role: "Full-stack developer and sole technical owner",
    description: "Scalable corporate training platform with automated publishing, enrolment, payment processing, RBAC, and multi-regional SEO for an international alumni network.",
    problem: "A distributed professional network needed a reliable way to publish programmes, manage enrolment, verify payments, and report on learning activity across more than 50 countries.",
    solution: "Built and operated the Laravel platform end to end, including MySQL architecture, Redis and Cloudflare caching, M-Pesa and card payments, queues, cron automation, CI/CD, and production infrastructure.",
    architecture: "Modern web application with responsive design, secure authentication, and scalable backend infrastructure.",
    technologies: ["PHP", "Laravel", "MariaDB", "CSS", "JavaScript", "Bootstrap", "CMS"],
    challenges: [
      "Implementing comprehensive LMS features",
      "Ensuring mobile responsiveness across devices",
      "Managing user progress and certification tracking",
      "Integrating payment and enrollment systems"
    ],
    outcomes: [
      "Supports 25,000+ professionals across 50+ countries",
      "Reduced average application latency by approximately 35%",
      "Reduced manual operational work by approximately 60%"
    ],
    metrics: [
      { label: "Active Users", value: "500+" },
      { label: "Course Completion", value: "85%" },
      { label: "Client Satisfaction", value: "95%" }
    ],
    lessons: [
      "The importance of user experience in educational platforms",
      "Building scalable systems for growing user bases",
      "The value of comprehensive analytics in learning management"
    ],
    demo: "https://www.euroafriquecorporateskills.com/",
    favicon: "/images/projects/euroafrique.ico",
    image: "/images/projects/euroafrique.jpg",
    featured: true,
    year: 2025
  },
  {
    id: "chania-publishers",
    title: "Chania Publishers Digital Platform",
    category: "Web Systems",
    role: "Full-stack developer and sole technical owner",
    description: "End-to-end Learning Management System with secure authentication, automated enrolment, payment processing, protected video content, and production deployment.",
    problem: "An educational publisher needed to move from traditional publishing workflows to a secure digital learning platform with paid course access and dependable content delivery.",
    solution: "Designed and built the Laravel LMS with RBAC, payment verification, protected premium content, optimized delivery, technical SEO, and the hosting and deployment systems around it.",
    architecture: "Full-stack web application with secure payment integration, content delivery network, and robust database management.",
    technologies: ["PHP", "Laravel", "MariaDB", "CSS", "JavaScript", "Bootstrap", "CMS"],
    challenges: [
      "Migrating legacy publishing systems to modern web platforms",
      "Implementing secure payment processing for educational materials",
      "Managing large digital content libraries and downloads",
      "Ensuring compatibility with various devices and browsers"
    ],
    outcomes: [
      "Improved page speed by approximately 60%",
      "Production-ready LMS deployed and maintained end to end",
      "Secure enrolment and premium content access workflows"
    ],
    metrics: [
      { label: "Online Sales Growth", value: "300%" },
      { label: "Digital Content", value: "1000+" },
      { label: "User Satisfaction", value: "92%" }
    ],
    lessons: [
      "The challenges of modernizing legacy publishing systems",
      "The importance of secure e-commerce implementations",
      "Building systems that serve both B2B and B2C markets"
    ],
    demo: "https://chaniapublishers.com/",
    favicon: "/images/projects/chania.ico",
    image: "/images/projects/chania.jpg",
    featured: true,
    year: 2026
  }
]

export const projectCategories = [
  "All",
  "Web Systems",
  "Automation Engineering",
  "Distributed Systems",
  "Cybersecurity",
  "Full-stack Engineering"
]
