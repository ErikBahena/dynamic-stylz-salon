# Dynamic Stylz Salon

Marketing site for **Dynamic Stylz Salon LLC** — a full-service family hair salon in Elma, WA.

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (static + Next/Image optimization)

## Local development

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3000>.

## Editing content

All content lives in `src/data/*.ts` — edit those files and commit the change.

| File                  | What it controls                                  |
| --------------------- | ------------------------------------------------- |
| `src/data/site.ts`    | Business name, address, phone, hours, social URLs |
| `src/data/hero.ts`    | Homepage hero headline, subheadline, images, CTAs |
| `src/data/services.ts`| Services list, pricing, categories, order         |
| `src/data/team.ts`    | Stylist cards (name, role, bio, headshot)         |
| `src/data/reviews.ts` | Testimonials shown on homepage                    |

Images go in `public/media/` and are referenced by path (e.g. `/media/amber-300x291.png`).

## Type definitions

Content shapes are typed in `src/types/content.ts`. TypeScript will catch typos or missing fields at build time.

## Deploy

Pushing to `main` auto-deploys via Vercel. The build is a plain `next build` — no DB, no containers.

## Project structure

```
src/
  app/              # Next.js app router (layout, page, not-found)
  components/       # Shared UI (Media, Logo, Button)
  data/             # Editable content (services, team, reviews, hero, site)
  Footer/           # Global footer
  Header/           # Global header
  sections/home/    # Homepage sections (hero, services, team, testimonials, accommodations)
  types/content.ts  # Content type definitions
  utilities/        # `cn()` classname helper
```

## Design reference

See `DESIGN_DOC.md` for the full brand/design system: colors, typography, tone, and page goals.
