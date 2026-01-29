# Sanity CMS Setup Guide

## Quick Start

1. **Create Sanity Project**
   - Go to https://www.sanity.io/
   - Sign up or log in
   - Create a new project
   - Choose dataset name (usually "production")
   - Note your Project ID

2. **Get API Token**
   - Go to API → Tokens
   - Create a new token
   - Choose "Read" permissions (for client-side)
   - Copy the token

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Sanity credentials:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     SANITY_API_TOKEN=your-read-token
     ```

4. **Set Up Sanity Studio (Optional)**
   ```bash
   npx sanity init
   ```
   - Choose "Create new project" or "Use existing project"
   - Select your project
   - Choose "Blog (schema)" or "Clean project with no predefined schemas"
   - The schemas are already created in `sanity/schemas/`

5. **Run Sanity Studio Locally**
   ```bash
   npm run sanity dev
   ```
   Or add to package.json:
   ```json
   "sanity:dev": "sanity dev"
   ```

## Migrating Existing Data

### Option 1: Manual Import via Studio
1. Open Sanity Studio
2. Go to Portfolio section
3. Click "Create new"
4. Fill in the form with your project data
5. Upload images
6. Save and publish

### Option 2: Import via Script
Create a migration script to import from `src/data/portfolio.ts`:

```typescript
// scripts/import-portfolio.ts
import { createClient } from '@sanity/client';
import { portfolioProjects } from '../src/data/portfolio';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN_WRITE!, // Need write token
  apiVersion: '2024-01-01',
});

async function importPortfolio() {
  for (const project of portfolioProjects) {
    await client.create({
      _type: 'portfolio',
      title: project.title,
      slug: { current: project.id },
      description: project.description,
      longDescription: project.longDescription,
      websiteLink: project.websiteLink,
      githubLink: project.githubLink,
      techStack: project.techStack,
      category: project.category,
      date: project.date,
      featured: project.featured,
      // Note: Images need to be uploaded separately via Studio
    });
  }
}

importPortfolio();
```

## Setting Up Vercel Webhook

### Step 1: Get Vercel Deploy Hook
1. Go to Vercel Dashboard → Your Project → Settings → Git
2. Scroll to "Deploy Hooks"
3. Create a new deploy hook
4. Name it "Sanity CMS"
5. Copy the hook URL

### Step 2: Configure Sanity Webhook
1. Go to Sanity Dashboard → API → Webhooks
2. Create new webhook
3. **URL**: Your Vercel deploy hook URL
   ```
   https://api.vercel.com/v1/integrations/deploy/[DEPLOY_HOOK_ID]
   ```
4. **Dataset**: production (or your dataset name)
5. **Trigger on**: Create, Update, Delete
6. **HTTP method**: POST
7. **Secret**: Generate a random secret and save it
8. Add secret to `.env.local` as `SANITY_WEBHOOK_SECRET`

### Step 3: Verify Auto-Deployment
1. Make a change in Sanity Studio
2. Publish the change
3. Check Vercel dashboard - should see a new deployment triggered
4. Site will rebuild and deploy automatically

## Content Management

### Adding a New Portfolio Project
1. Open Sanity Studio
2. Navigate to "Portfolio Project"
3. Click "Create new"
4. Fill in all fields:
   - Title (required)
   - Slug (auto-generated from title)
   - Description (required)
   - Long Description (optional)
   - Images (upload multiple)
   - Video URL (optional)
   - Website Link (optional)
   - GitHub Link (optional)
   - Tech Stack (add tags)
   - Categories (select from list)
   - Completion Date
   - Featured (checkbox)
5. Click "Publish"
6. Vercel will automatically rebuild and deploy

### Editing Existing Projects
1. Open Sanity Studio
2. Find the project you want to edit
3. Make changes
4. Click "Publish"
5. Changes go live automatically

## Troubleshooting

### Site Not Updating After Sanity Changes
- Check webhook is configured correctly
- Verify webhook secret matches in both Sanity and Vercel
- Check Vercel deployment logs
- Ensure environment variables are set in Vercel dashboard

### Images Not Displaying
- Verify images are uploaded to Sanity (not just URLs)
- Check image URL builder is working
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly

### Fallback to Static Data
- If Sanity is not configured, site will use static data from `src/data/portfolio.ts`
- This ensures the site works even without Sanity setup
- Check browser console for Sanity connection errors

## Next Steps

1. Set up Sanity project and get credentials
2. Add environment variables
3. Import existing portfolio data
4. Configure Vercel webhook
5. Test adding a new project
6. Verify auto-deployment works
