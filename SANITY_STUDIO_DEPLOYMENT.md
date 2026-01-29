# Deploy Sanity Studio

## Option 1: Deploy Studio Separately (Recommended)

Sanity Studio should be deployed separately using Sanity's hosting:

```bash
npm run sanity:deploy
```

This will:
1. Deploy your Sanity Studio to `https://inventivebytellc.sanity.studio`
2. Make it accessible from anywhere
3. Handle authentication automatically

After deployment, update the redirect URL in `src/app/studio/[[...index]]/page.tsx` to match your deployed studio URL.

## Option 2: Embed Studio in Next.js (Advanced)

For Next.js 15, embedding requires:
1. Upgrading to Next.js 16 (for `next-sanity` compatibility)
2. Or using a custom iframe embed

## Current Setup

The `/studio` route currently redirects to the deployed Sanity Studio. To deploy:

1. **Run deployment command:**
   ```bash
   npm run sanity:deploy
   ```

2. **Update redirect URL** in `src/app/studio/[[...index]]/page.tsx` with your actual studio URL

3. **Access Studio:**
   - Direct: `https://inventivebytellc.sanity.studio`
   - Via your site: `https://www.inventivebytellc.com/studio` (redirects)

## Benefits of Separate Deployment

- ✅ Better performance (dedicated hosting)
- ✅ Automatic authentication handling
- ✅ No Next.js version conflicts
- ✅ Easier to manage and update
- ✅ Works with any Next.js version
