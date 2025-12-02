# CMS Editing Guide

This guide walks through the content areas Dynamic Stylz Salon staff can update inside Payload. Only the sections that require regular edits are exposed in the admin UI to keep maintenance simple.

## Services (`/admin/collections/services`)

- Each row represents a single service card displayed on the website.
- **Title & Category**: Used for labels and filtering.
- **Description**: Short paragraph that appears underneath the title.
- **Pricing**
  - Choose **Fixed price** or **Call for consultation**.
  - When “Fixed price” is selected, fill in the numeric price and, optionally, a custom label (e.g., `$65+`).
- **Duration**: Optional helper text (e.g., `60–75 min`).
- **Featured**: Toggle to surface the service on the homepage highlight grid.
- **Order**: Lower numbers appear first. Use increments of 10 for easy reordering.

## Team Members (`/admin/collections/team-members`)

- **Name / Role / Years** drive the headline within the team cards.
- **Headshot**: Upload salon imagery (Facebook photos work great).
- **Bio**: Short paragraph about the stylist in a casual tone.
- **Specialties**: Add bullet-style text chips such as “Lived-in color”.
- **Featured**: Moves the stylist to the first row on the homepage.
- **Order**: Controls card order; use increments to reorder quickly.

## Reviews (`/admin/collections/reviews`)

- **Reviewer name** and **Rating** power the testimonial display.
- **Source**: Select Facebook, Google, or Direct testimonial for labeling.
- **Body**: Paste the review text without quotes—quotes are added automatically.
- **Image**: Optional but prioritized on the homepage. Use review screenshots if available.
- **Featured**: Ensures the quote appears within the first row of testimonials.
- **Published At**: For internal reference and optional sorting.

## Homepage Hero Content (`/admin/collections/pages` → “Home”)

- The hero still uses the existing **Hero** tab on the Home page entry.
- Update the `Rich Text` field for the marquee headline and CTA block for buttons.
- Hero background imagery is managed via the `Media` field on the same tab.

## Footer Navigation (`/admin/globals/footer`)

- “Nav items” control the quick links shown in the footer.
- Phone number, hours, and address are coded into the template—open a dev ticket if those details change.

## Sensory-Friendly Note

- The accommodations callout on the homepage is static copy within the code base.
- If messaging needs an update, note the change request in an issue so the template can be updated intentionally.

## Seeding in Local Development

- Running `pnpm payload generate:types && pnpm payload seed` recreates demo Services, Team Members, and Reviews data for design/dev work.

