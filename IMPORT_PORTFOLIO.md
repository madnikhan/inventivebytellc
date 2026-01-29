# Import Portfolio Projects to Sanity CMS

## Quick Import

Run this command to import all portfolio projects from `src/data/portfolio.ts` to Sanity:

```bash
npm run sanity:import
```

## Prerequisites

### 1. Check API Token Permissions

Your current API token in `.env.local` might be **read-only**. To import data, you need a **write token**:

1. Go to [Sanity Dashboard](https://www.sanity.io/manage)
2. Select your project: **InventiveByte LLC**
3. Go to **API** → **Tokens**
4. Click **"+ Add API token"**
5. Name it: `Write Token` or `Import Script`
6. **Permissions**: Select **"Editor"** (or **"Admin"** for full access)
7. Click **"Save"**
8. Copy the new token
9. Update `.env.local`:
   ```
   SANITY_API_TOKEN=your-new-write-token-here
   ```

### 2. Run the Import

```bash
npm run sanity:import
```

## What Gets Imported

The script will import:
- ✅ Title
- ✅ Slug (from project ID)
- ✅ Description
- ✅ Long Description
- ✅ Website Link
- ✅ GitHub Link
- ✅ Tech Stack
- ✅ Categories
- ✅ Date
- ✅ Featured status

**Note:** Images are **NOT** imported automatically because:
- Current images are SVG files in `/public/brands/`
- Sanity requires images to be uploaded through the Studio
- You'll need to upload images manually after import

## After Import

1. **Open Sanity Studio**: `npm run sanity:dev`
2. Go to **Portfolio Project** section
3. For each project:
   - Click to edit
   - Upload images in the **Images** field
   - Click **"Publish"**

## Projects to Import

The script will import these 6 projects:
1. Inventix Studio (Featured)
2. ZapTools (Featured)
3. BritRecruit
4. E-Commerce Platform
5. Analytics Dashboard
6. Mobile Task Manager

## Troubleshooting

### Error: "Insufficient permissions"
- Your token doesn't have write permissions
- Create a new token with "Editor" or "Admin" permissions
- Update `SANITY_API_TOKEN` in `.env.local`

### Error: "Project not found"
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Should be: `ahit08r2`

### Projects Already Exist
- The script will skip projects that already exist
- To re-import, delete them from Sanity Studio first

## Manual Import Alternative

If the script doesn't work, you can manually add projects:

1. Open Sanity Studio: `npm run sanity:dev`
2. Click **"Portfolio Project"**
3. Click **"Create new"**
4. Fill in the form with data from `src/data/portfolio.ts`
5. Upload images
6. Click **"Publish"**

Repeat for each project.
