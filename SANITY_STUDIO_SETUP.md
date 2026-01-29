# Sanity Studio Setup - Step by Step

## ✅ What You Already Have

- ✅ Sanity Project Created (ID: `ahit08r2`)
- ✅ API Token Generated
- ✅ Environment Variables Configured
- ✅ Schemas Created (`sanity/schemas/`)

## Step 1: Install Sanity Studio Dependencies

The schemas are already created, but we need to install the Studio package:

```bash
npm install sanity @sanity/vision
```

## Step 2: Initialize Sanity Studio (Use Existing Project)

Run this command in your project root:

```bash
npx sanity init --env
```

**When prompted:**
1. **"Would you like to add configuration files for a Sanity project?"** → **Yes**
2. **"Select project to use"** → Choose **"Use existing project"**
3. **"Select project"** → Select **"InventiveByte LLC"** (or your project)
4. **"Select dataset"** → Choose **"production"**
5. **"Project output path"** → Press Enter (use default: `./sanity`)
6. **"Use the default dataset configuration?"** → **Yes**

**Note:** The schemas are already in `sanity/schemas/`, so it won't overwrite them.

## Step 3: Run Sanity Studio Locally

Start the development server:

```bash
npm run sanity:dev
```

Or manually:
```bash
npx sanity dev
```

This will start Sanity Studio at: **http://localhost:3333**

## Step 4: Access Sanity Studio

1. Open your browser to: **http://localhost:3333**
2. You should see the Sanity Studio interface
3. You'll see two content types:
   - **Portfolio Project** - For managing portfolio items
   - **Testimonial** - For managing testimonials

## Step 5: Add Your First Portfolio Project

1. Click **"Portfolio Project"** in the left sidebar
2. Click **"Create new"** button
3. Fill in the form:
   - **Title**: Enter project name (e.g., "Inventix")
   - **Slug**: Auto-generated from title (or customize)
   - **Description**: Short description
   - **Long Description**: Detailed description
   - **Images**: Click to upload images (drag & drop)
   - **Video URL**: Optional (YouTube/Vimeo link)
   - **Website Link**: Optional
   - **GitHub Link**: Optional
   - **Tech Stack**: Click to add tags (e.g., "React", "Next.js")
   - **Categories**: Select from dropdown (e.g., "SaaS", "Web App")
   - **Completion Date**: Select date
   - **Featured**: Check if you want it featured
4. Click **"Publish"** in the top right

## Step 6: Import Existing Portfolio Data (Optional)

If you have existing projects in `src/data/portfolio.ts`, you can:

### Option A: Manual Import (Recommended)
- Copy data from `src/data/portfolio.ts`
- Create each project manually in Sanity Studio
- Upload images directly

### Option B: Use Import Script
I can create a script to import your existing data. Let me know if you want this!

## Step 7: Deploy Sanity Studio (Optional)

You can deploy Sanity Studio to a public URL:

```bash
npm run sanity:deploy
```

Or:
```bash
npx sanity deploy
```

This will give you a URL like: `https://your-project.sanity.studio`

## Step 8: Test Content Updates

1. Make a change in Sanity Studio
2. Click **"Publish"**
3. Check your website - it should update automatically (if webhook is configured)
4. Or manually trigger rebuild in Vercel

## Troubleshooting

### Studio Won't Start

**Error: "Cannot find module 'sanity'"**
```bash
npm install sanity @sanity/vision
```

**Error: "Project ID not found"**
- Check `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=ahit08r2`
- Restart the dev server

### Schemas Not Showing

- Make sure `sanity/schemas/index.ts` exports your schemas
- Check `sanity/sanity.config.ts` references the schemas correctly

### Can't Connect to Sanity

- Verify your API token in `.env.local`
- Check Project ID matches: `ahit08r2`
- Ensure dataset is: `production`

## Quick Commands Reference

```bash
# Start Studio locally
npm run sanity:dev

# Deploy Studio
npm run sanity:deploy

# Check Sanity CLI version
npx sanity --version

# Login to Sanity (if needed)
npx sanity login
```

## Next Steps

1. ✅ Run `npm install sanity @sanity/vision`
2. ✅ Run `npx sanity init --env` (use existing project)
3. ✅ Start Studio: `npm run sanity:dev`
4. ✅ Add your portfolio projects
5. ✅ Test webhook triggers Vercel deployments

Your Sanity Studio will be ready to manage all your content!
