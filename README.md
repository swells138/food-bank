# North Ridgeville Community Care Website

A modern, mobile-first Next.js site for North Ridgeville Community Care. Content is stored in local JSON files so staff can keep copy, hours, and donation needs up to date without touching code.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to view the site. Edits in the `app/` and `components/` directories support hot reloading.

## Updating content

Editable copy, hours, and calls-to-action live in the `/content` directory:

- `site.json` — organization name, tagline, address, phone, email, hours, and social links
- `items-needed.json` — categorized pantry needs with `urgent: true` flags
- `programs.json` — program descriptions and eligibility notes
- `donate.json` — donation portal URLs and key messaging
- `volunteer.json` — volunteer roles, CTAs, and FAQs

Adjust these JSON files to update the live site. Keep placeholders marked with `(TODO)` until real information is ready.

## Images

Replace the placeholder images in `public/images/` with optimized JPG or PNG assets sized for responsive layouts. Keep file names the same or update references in components. Use compressed images (<250 KB when possible) for faster loads.

## Deployment

Deploy to [Vercel](https://vercel.com/) or any Node.js host:

1. Commit your changes and push to GitHub.
2. Connect the repository to Vercel and select the default build command `npm run build`.
3. Set the optional analytics environment variable `NEXT_PUBLIC_GA_ID` if using Google Analytics.
4. Configure a production domain and redeploy when JSON content changes.

## Accessibility & performance notes

- Semantic HTML, focus states, and keyboard navigation are built in via Tailwind CSS.
- The `Items Needed` page includes print-friendly styles.
- API routes at `/api/contact` and `/api/volunteer` accept form submissions with a `202 Accepted` placeholder response for future integrations.

Happy editing!
