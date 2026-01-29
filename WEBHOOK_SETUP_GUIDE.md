# Sanity Webhook Setup Guide

## Step 1: Get Vercel Deploy Hook URL

1. Go to your **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your **InventiveByte LLC** project
3. Go to **Settings** → **Git** (or **Deploy Hooks**)
4. Scroll down to **"Deploy Hooks"** section
5. Click **"Create Hook"** or **"Add Deploy Hook"**
6. Fill in:
   - **Name**: `Sanity CMS`
   - **Branch**: `main` (or your production branch)
7. Click **"Create Hook"**
8. **Copy the hook URL** - it will look like:
   ```
   https://api.vercel.com/v1/integrations/deploy/[DEPLOY_HOOK_ID]
   ```

## Step 2: Configure Sanity Webhook

Fill out the Sanity webhook form with these values:

### Basic Settings

**Name:**
```
Sanity CMS → Vercel
```

**Description:**
```
Triggers Vercel deployment when content changes in Sanity CMS
```

**URL:**
```
[Paste your Vercel deploy hook URL here]
```
Example: `https://api.vercel.com/v1/integrations/deploy/abc123xyz`

**Dataset:**
```
production
```
(Select "production" from the dropdown, or choose your dataset name)

### Trigger Settings

**Trigger on:**
- ✅ **Create** (checked)
- ✅ **Update** (checked)
- ✅ **Delete** (checked)

**Filter (Optional):**
You can add a GROQ filter to only trigger on specific content types:
```
_type == "portfolio" || _type == "testimonial"
```
This ensures the webhook only fires when portfolio or testimonial content changes.

**Projection (Optional):**
Leave empty (default payload is fine)

### Advanced Settings

**HTTP Method:**
```
POST
```
(Already selected by default)

**HTTP Headers:**
Leave empty (not needed for Vercel deploy hooks)

**API Version:**
```
v2021-03-25
```
(Or latest available)

**Drafts:**
- ❌ **Unchecked** - Don't trigger on draft changes (recommended)
- Only trigger when content is published

**Versions:**
- ❌ **Unchecked** - Only trigger on published documents

**Secret:**
Generate a secure random string. You can use:
- Online generator: https://randomkeygen.com/
- Or run in terminal: `openssl rand -base64 32`

Example secret: `aB3xK9mP2qR7vN5wT8yU1zA4bC6dE0fG`

**⚠️ IMPORTANT:** Copy this secret - you'll need to add it to your `.env.local` file!

## Step 3: Save Webhook Secret

After creating the webhook, add the secret to your `.env.local`:

```bash
SANITY_WEBHOOK_SECRET=your-generated-secret-here
```

## Step 4: Add Secret to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:
   - **Key**: `SANITY_WEBHOOK_SECRET`
   - **Value**: `[Your webhook secret]`
   - **Environment**: Production, Preview, Development (select all)
3. Click **Save**

## Step 5: Test the Webhook

1. Go to Sanity Studio
2. Make a small change to any portfolio project (or create a test one)
3. **Publish** the change
4. Go to Vercel Dashboard
5. You should see a new deployment triggered automatically
6. Wait 2-3 minutes for deployment to complete
7. Check your live site - changes should be visible!

## Troubleshooting

### Webhook Not Triggering Deployments

1. **Check Vercel Deploy Hook URL:**
   - Make sure the URL is correct
   - Test the URL manually (it should return a JSON response)

2. **Check Webhook Secret:**
   - Verify it matches in both Sanity and Vercel
   - Secret is case-sensitive

3. **Check Sanity Webhook Logs:**
   - Go to Sanity Dashboard → API → Webhooks
   - Click on your webhook
   - Check "Recent deliveries" for errors

4. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Deployments
   - Look for any failed deployments
   - Check build logs for errors

### Webhook Triggering Too Often

- Add a filter to only trigger on specific content types
- Uncheck "Trigger webhook when drafts are modified"
- Only trigger on published documents

## Alternative: Use Next.js Revalidation API

If you prefer to use the revalidation API route we created (`/api/sanity/revalidate`), you can point the webhook to:

```
https://your-domain.com/api/sanity/revalidate
```

Then add header:
- **Name**: `x-sanity-webhook-secret`
- **Value**: `[Your webhook secret]`

This gives you more control over what gets revalidated, but the Vercel deploy hook is simpler and more reliable.
