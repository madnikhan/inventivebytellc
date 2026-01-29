# Frontend Troubleshooting Guide

## ✅ Fixed Issues

### 1. Sanity Image URL Builder Deprecation
**Status:** ✅ Fixed
- Changed from default export to named export `createImageUrlBuilder`
- **Action Required:** Restart dev server to clear warning

---

## 🔍 Common Frontend Issues

### Issue: Deprecation Warning Still Showing
**Symptom:** Terminal shows: `The default export of @sanity/image-url has been deprecated`

**Solution:**
1. Stop the dev server (Ctrl+C)
2. Clear Next.js cache: `rm -rf .next`
3. Restart: `npm run dev`

**Status:** ✅ Code is fixed, just needs server restart

---

### Issue: Portfolio/Testimonials Not Loading
**Possible Causes:**
1. Sanity API not responding
2. Network error
3. CORS issue

**Check:**
- Open browser console (F12)
- Look for errors in Network tab
- Check if `/api/portfolio` and `/api/testimonials` return 200

**Solution:**
- Site falls back to static data automatically
- Check Sanity project ID in `.env.local`
- Verify API token is correct

---

### Issue: Images Not Displaying
**Possible Causes:**
1. Sanity images not uploaded
2. Image URL builder error
3. CORS/CDN issue

**Check:**
- Open browser console for image errors
- Check Network tab for failed image requests
- Verify images exist in Sanity Studio

**Solution:**
- Upload images in Sanity Studio
- Check image URLs in browser console
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set

---

### Issue: Forms Not Submitting
**Possible Causes:**
1. API route errors
2. Missing environment variables
3. Network error

**Check:**
- Browser console for errors
- Network tab for failed requests
- Check API route logs in terminal

**Solution:**
- Check `.env.local` has all required variables
- Verify API routes are working
- Check server logs for errors

---

## 🧪 Quick Diagnostic Steps

### 1. Check Browser Console
Open browser DevTools (F12) and check:
- **Console tab:** Look for red errors
- **Network tab:** Check for failed requests (red)
- **Application tab:** Check if data is loading

### 2. Check Terminal Logs
Look for:
- ✅ `GET /api/portfolio 200` - Working
- ❌ `GET /api/portfolio 500` - Error
- ⚠️ Warnings (usually safe to ignore)

### 3. Test API Routes Directly
```bash
# Test portfolio API
curl http://localhost:3000/api/portfolio

# Test testimonials API
curl http://localhost:3000/api/testimonials
```

Should return JSON with `projects`/`testimonials` array.

---

## 🔧 Quick Fixes

### Clear Cache and Restart
```bash
# Stop server
# Ctrl+C

# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### Check Environment Variables
```bash
# Verify .env.local exists and has values
cat .env.local | grep SANITY
```

### Verify Sanity Connection
1. Go to `http://localhost:3000/portfolio`
2. Open browser console
3. Check if data loads
4. Look for Sanity-related errors

---

## 📝 What to Check

### If Portfolio Not Showing:
1. ✅ Check `/api/portfolio` returns data
2. ✅ Verify Sanity has portfolio projects
3. ✅ Check browser console for errors
4. ✅ Verify `usePortfolio` hook is working

### If Testimonials Not Showing:
1. ✅ Check `/api/testimonials` returns data
2. ✅ Verify Sanity has testimonials
3. ✅ Check browser console for errors
4. ✅ Verify `useTestimonials` hook is working

### If Images Broken:
1. ✅ Check images uploaded in Sanity
2. ✅ Verify image URL builder working
3. ✅ Check Network tab for image requests
4. ✅ Verify Sanity project ID correct

---

## 🆘 Still Having Issues?

**Please provide:**
1. **Browser console errors** (screenshot or copy/paste)
2. **Network tab errors** (failed requests)
3. **Terminal errors** (from dev server)
4. **What page** you're on when error occurs
5. **What action** triggers the error

This will help identify the exact issue!

---

## ✅ Current Status

- ✅ Code is correct
- ✅ API routes working (200 responses)
- ✅ Sanity integration functional
- ⚠️ Deprecation warning (cosmetic, restart server to clear)

**Most likely:** The deprecation warning is just a warning. Restart the dev server to clear it.
