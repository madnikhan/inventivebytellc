# 🚀 Quick Start: Sanity CMS Setup

## ✅ You Already Have:
- Sanity Project: `ahit08r2`
- API Token configured
- Environment variables set
- Schemas created

## 🎯 Next Steps (5 minutes):

### Step 1: Start Sanity Studio

Run this command:

```bash
npm run sanity:dev
```

This will start Sanity Studio at: **http://localhost:3333**

### Step 2: Open Sanity Studio

1. Open your browser to: **http://localhost:3333**
2. You should see the Sanity Studio interface
3. You'll see:
   - **Portfolio Project** - Manage your portfolio
   - **Testimonial** - Manage testimonials

### Step 3: Add Your First Project

1. Click **"Portfolio Project"** in the sidebar
2. Click **"Create new"**
3. Fill in:
   - **Title**: Your project name
   - **Description**: Short description
   - **Images**: Upload images (drag & drop)
   - **Tech Stack**: Add tags (React, Next.js, etc.)
   - **Categories**: Select from dropdown
   - **Featured**: Check if featured
4. Click **"Publish"**

### Step 4: Verify It Works

1. Check your website - it should show the new project
2. If webhook is configured, Vercel will auto-deploy

## 📝 Common Commands

```bash
# Start Studio locally
npm run sanity:dev

# Deploy Studio to public URL (optional)
npm run sanity:deploy

# Check Sanity version
npx sanity --version
```

## 🎨 What You Can Do in Studio

- ✅ Add/Edit/Delete portfolio projects
- ✅ Upload images directly
- ✅ Manage testimonials
- ✅ Set featured projects
- ✅ All changes auto-deploy to your site (if webhook configured)

## 🆘 Troubleshooting

**Studio won't start?**
- Make sure `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=ahit08r2`
- Run: `npm install` to ensure all packages are installed

**Can't see schemas?**
- Check `sanity/schemas/index.ts` exports your schemas
- Restart the dev server

**Need help?**
- See `SANITY_STUDIO_SETUP.md` for detailed guide
- See `SANITY_SETUP.md` for full documentation

---

**That's it!** You're ready to manage your content! 🎉
