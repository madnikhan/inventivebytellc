This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Sanity: Auto-generate a blog from each portfolio project

When you add or update a **Portfolio** document in Sanity Studio, the site can automatically create or update a **Resource** (blog post) with a full case study built from that portfolio.

### Setup

1. **Create a write token** in [Sanity Dashboard → API → Tokens](https://www.sanity.io/manage): add a token with **Editor** (or write) access and set it as `SANITY_API_TOKEN` in your env (e.g. `.env.local` and your hosting env).

2. **Add a webhook** in [Sanity Dashboard → API → Webhooks](https://www.sanity.io/manage):
   - **URL:** `https://your-domain.com/api/sanity/revalidate` (use your live site URL, e.g. `https://www.inventivebytellc.com/api/sanity/revalidate`)
   - **Trigger:** Document changed (create/update/delete)
   - **Filter (optional):** `_type == "portfolio"` so only portfolio changes trigger the hook
   - **Projection:** ensure the payload includes `_id` (e.g. `{ _id, _type }`) so the app can create the blog
   - **Secret (optional):** set a value and add the same as `SANITY_WEBHOOK_SECRET` in your env

3. **Production:** Add `SANITY_API_TOKEN` (and `SANITY_WEBHOOK_SECRET` if used) to your hosting env (e.g. Vercel → Project → Settings → Environment Variables). Otherwise the webhook runs but blog creation is skipped.

When a portfolio is saved, the webhook calls the revalidate endpoint, which creates or updates a Resource with the same slug, title (suffix “– Case Study”), excerpt, and a markdown body (overview, about, tech stack, categories, links). The new post appears under **Resources** in Studio and on `/resources`.

**Portfolios already in Sanity:** To generate blogs for portfolios that were saved *before* the webhook was set up, run once: `npx tsx scripts/generate-blogs-from-portfolio.ts` (requires `SANITY_API_TOKEN` in `.env.local`). This creates or updates a Resource for every existing Portfolio document.

To generate a blog from a single portfolio without the webhook, send a POST to `/api/sanity/portfolio-to-blog` with body `{ "documentId": "<portfolio _id>" }` and (if set) header `x-sanity-webhook-secret`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
