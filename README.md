# Alex Murimi Kamau Portfolio

Personal portfolio for **Alex Murimi Kamau**, a Full-Stack Developer based in Nairobi, Kenya. The site presents engineering case studies, how I work across the stack, professional experience and contact details.

## What is here

- Homepage: positioning, capabilities, selected work, engineering areas, principles, experience, about and contact.
- `/work` and `/work/[slug]`: statically generated case studies (problem, role, system overview, engineering notes, decisions, outcome, links).
- Old `/projects` URLs redirect permanently to `/work`.
- Homepage hero with a short positioning headline and portrait, followed by an animated "system flow" strip showing the path every platform shares, from client to data. Pure CSS, static under `prefers-reduced-motion`.
- Optional book view: the header toggle turns the homepage into a book with a navy, scarlet and white hard cover and a contents list. The book has its own short chapters (Introduction, Work, Engineering, Principles, Experience, About, Contact) built from the same data as the scrolling page, each cut to fit one page and linking to the full case studies. On wide screens each chapter is a two-page spread: the chapter opener on the left, the content on the right, with running heads and page numbers. Only the right-hand page turns, folding over the spine with the next chapter's opener printed on its back. On phones the chapter is a single page. Turns follow buttons, arrow keys, swipes (the page follows your finger) and scrolling past the end of a page; Page Down/Page Up read through a page before turning it. The scrolling page is the default; the choice is remembered, and viewports under 480px tall always scroll. Without JavaScript the site is the scrolling page.
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
    book/              Page-flip book: cover, spread layout, fold geometry and the book-only chapters
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
