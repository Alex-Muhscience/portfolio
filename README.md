# Alex Murimi Kamau Portfolio

Personal portfolio for **Alex Murimi Kamau**, a Full-Stack Developer based in Nairobi, Kenya. The site presents selected case studies, technical capabilities, experience across the EuroAfrique Corporate Skills sister companies, education, and direct contact options.

## Highlights

- Editorial, responsive portfolio layout focused on case studies.
- Light and dark themes with system preference detection and persisted selection.
- Featured work for AfriAsia Career Development Center, EuroAfrique Corporate Skills, and Chania Publishers.
- Experience timeline covering full-stack development, tutoring, networking, and cybersecurity.
- Education section for the BSc Computer Science degree from Kisii University.
- Accessible WhatsApp contact widget with a prefilled project message.
- Local project favicon assets and optimized profile image rendering.
- Reduced-motion-aware scroll reveals and route transitions capped at 240ms.

## Tech Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion
- `next-themes`
- Lucide React and React Icons
- ESLint

## Getting Started

The project targets Node.js `20.9.0` through `24.x`, matching the supported Next.js runtime range and avoiding Node 26 deprecation warnings from the current Tailwind toolchain.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Start the production server
```

## Project Structure

```text
src/
  app/                 App Router pages, metadata, theme provider, and global styles
  components/
    animations/        Scroll reveal and animation helpers
    sections/          Hero, projects, skills, about, experience, education, contact
    shared/            Header, logo, footer, theme toggle, WhatsApp widget
    ui/                Reusable interface primitives
  data/                Experience, education, and project content
  types/               Shared TypeScript contracts
public/
  images/              Profile photo and local project favicon assets
```

## Content and Links

- Portfolio: [portfolio-alex-m-kamau.vercel.app](https://portfolio-alex-m-kamau.vercel.app/)
- Email: [alex.kamau.2558@gmail.com](mailto:alex.kamau.2558@gmail.com)
- GitHub: [github.com/Alex-Muhscience](https://github.com/Alex-Muhscience)
- LinkedIn: [linkedin.com/in/alex-mkamau-20015b340](https://www.linkedin.com/in/alex-mkamau-20015b340)
- WhatsApp: [+254 746 254 055](https://wa.me/254746254055)

Project and experience content is maintained in `src/data/projects.ts`, `src/data/experience.ts`, and `src/data/education.ts`.

## Deployment

The project is configured for deployment on Vercel or any platform that supports Next.js. Run `npm run build` before deployment to verify TypeScript compilation, route generation, and production output.
