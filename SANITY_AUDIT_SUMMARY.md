# Sanity CMS Audit Summary

## What Was Audited

- **Config**: Root `sanity.config.ts` and `sanity/sanity.config.ts` (projectId, dataset, plugins, schema)
- **Schemas**: Portfolio and Testimonial (fields, validation)
- **GROQ & API**: `src/lib/sanity.ts` (queries, image URLs, conversion)
- **API routes**: `/api/portfolio`, `/api/testimonials`, `/api/sanity/revalidate`
- **Studio**: Document actions (including Delete)

## Fixes Applied

### 1. Delete option in Studio
- **Issue**: No obvious way to delete portfolio/testimonial documents.
- **Fix**:
  - Added a custom **Delete** document action that appears as a visible button (red “Delete”) in the document footer, so you don’t need to open the ⋮ menu.
  - Kept all default actions (Publish, Unpublish, Delete, Duplicate, etc.) in the ⋮ menu.
- **Files**: `sanity/actions/deleteDocument.tsx`, `sanity.config.ts`, `sanity/sanity.config.ts`
- **Docs**: `SANITY_DELETE_INSTRUCTIONS.md`

### 2. Document actions explicitly kept
- **Fix**: `document.actions: (prev) => [DeleteDocumentAction, ...prev]` so default actions (including the built-in Delete in the menu) are still available.

### 3. Revalidate webhook
- **Fix**: Safer JSON parsing and fallback for `_type`; revalidate portfolio and home for any known content type so updates show after publish.

### 4. Testimonials API cache
- **Fix**: `revalidate` set to 10 seconds (aligned with portfolio) so Sanity edits show quickly.

## Already Fixed Earlier (Portfolio / Images / Video)

- **Images**: GROQ no longer dereferences `asset`; image URLs are built from `asset._ref` so portfolio images from Sanity display correctly.
- **Video**: YouTube URL normalization and no autoplay so the video plays when you click “Watch Video”.
- **Portfolio API**: 10-second revalidate so Sanity changes appear within ~10s.

## What You Should Do

1. **Redeploy Sanity Studio** so the new Delete button and config are live:
   ```bash
   npm run sanity:deploy
   ```
2. **Set env vars** (if not already) in Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET`.
3. **Optional**: Configure a Sanity webhook to `https://www.inventivebytellc.com/api/sanity/revalidate` so the site revalidates as soon as you publish.

## Delete Instructions

See **SANITY_DELETE_INSTRUCTIONS.md** for step-by-step delete instructions (visible Delete button and ⋮ menu).
