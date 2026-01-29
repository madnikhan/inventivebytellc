# Sanity Studio Deployment - Current Step

## ✅ What's Done
- ✅ Logged in to Sanity CLI
- ✅ CLI config file created
- ✅ Ready to deploy

## 🔄 Current Step
**Enter hostname:** Type `inventivebytellc` (or your preferred name)

This will create: `https://inventivebytellc.sanity.studio`

## 📝 After Deployment

1. **Note your Studio URL** (will be shown after deployment)

2. **Update redirect in code:**
   Edit `src/app/studio/[[...index]]/page.tsx`:
   ```tsx
   window.location.href = 'https://inventivebytellc.sanity.studio'
   ```
   (Replace with your actual URL)

3. **Push to GitHub:**
   ```bash
   git add src/app/studio/[[...index]]/page.tsx
   git commit -m "Update Sanity Studio redirect URL"
   git push origin main
   ```

4. **Access Studio:**
   - Direct: `https://inventivebytellc.sanity.studio`
   - Via your site: `https://www.inventivebytellc.com/studio` (will redirect)

## 🎉 That's It!

After deployment, your Sanity Studio will be live and accessible!
