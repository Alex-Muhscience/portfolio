# Alex Murimi Kamau Portfolio

Personal portfolio for **Alex Murimi Kamau**, a Full-Stack Developer based in Nairobi, Kenya. The site presents engineering case studies, how I work across the stack, professional experience and contact details.

## What is here

- Homepage: positioning, capabilities, selected work, engineering areas, principles, experience, about and contact.
- `/work` and `/work/[slug]`: statically generated case studies (problem, role, system overview, engineering notes, decisions, outcome, links).
- Old `/projects` URLs redirect permanently to `/work`.
- Homepage hero with headline proof points (production platforms, reach, automation) and an animated "system flow" strip showing the path every platform shares, from client to data. Pure CSS, static under `prefers-reduced-motion`.
- Optional book view: the header toggle turns the homepage into a closed book with a hard cover and a contents list. Opening it swings the cover back; inside, each section is a page that folds over like paper to reveal the next (buttons, arrow keys, swipe, or scrolling past the end of a page). On touch screens the page follows your finger and can be let go to finish or cancel the turn. The scrolling page is the default; the choice is remembered, and viewports under 480px tall (a phone held sideways) always scroll. Without JavaScript the site is the scrolling page.
- Dark (navy with a scarlet accent, the default) and light (paper) themes, toggled from the header. The choice is remembered; visitors who picked one of the earlier palettes are mapped to the closest of the two.
- Generated `sitemap.xml`, `robots.txt`, Open Graph image and JSON-LD (Person, WebSite, CreativeWork, BreadcrumbList).

## Tech Stack

- Next.js 16 (App Router) with React 19 and TypeScript
- Plain CSS with design tokens in `src/styles` (no CSS framework)
- `next-themes` and Lucide icons
- ESLint

Pages are server components. Client components are limited to the book, the theme toggle, the view toggle and the mobile menu. All animation is CSS and is disabled under `prefers-reduced-motion`.

Theme tokens live in `src/styles/tokens.css` (`:root` for dark, `[data-theme="light"]` for light); the theme list is in `src/lib/themes.ts`.

## Getting Started

Requires Node.js `20.9.0` or newer (below 26).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev             # Development server
pnpm lint            # ESLint
pnpm exec tsc --noEmit   # Type-check
pnpm build           # Production build
pnpm start           # Serve the production build
```

## Project Structure

```text
src/
  app/                 Layout, homepage, /work routes, sitemap, robots, Open Graph image
  components/
    sections/          Homepage sections
    shared/            Header, footer, navigation, theme toggle, small shared pieces
    book/              Page-flip book for the homepage
    work/              Case-study components (system map, status, links, listings)
  data/                Projects, experience, education, engineering areas and principles
  lib/site.ts          Site URL, contact details and navigation
  styles/              Tokens, base, components, homepage and case-study styles
public/
  images/              Profile photo
```

## Editing content

All copy for case studies lives in `src/data/projects.ts`. Adding an entry there creates the page, the listing rows and the sitemap entry. Only state what can be backed up: there are no fields for invented metrics.

## Content and Links

- Portfolio: [portfolio-alex-m-kamau.vercel.app](https://portfolio-alex-m-kamau.vercel.app/)
- Email: [alex.kamau.2558@gmail.com](mailto:alex.kamau.2558@gmail.com)
- GitHub: [github.com/Alex-Muhscience](https://github.com/Alex-Muhscience)
- LinkedIn: [linkedin.com/in/alex-mkamau-20015b340](https://www.linkedin.com/in/alex-mkamau-20015b340)
- WhatsApp: [+254 746 254 055](https://wa.me/254746254055)

Contact details and the canonical site URL are set in `src/lib/site.ts`.

## Deployment

The project is configured for deployment on Vercel or any platform that supports Next.js. Run `pnpm build` before deployment to verify TypeScript compilation, route generation, and production output.
