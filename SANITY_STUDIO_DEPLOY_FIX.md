# Fix: Sanity Studio Deployment

## Issue Fixed
✅ Created `sanity.cli.ts` in root directory (was missing)

## Next Steps

### 1. Authenticate with Sanity
You need to log in to Sanity CLI:

```bash
npx sanity login
```

This will:
- Open your browser
- Ask you to authenticate with Sanity
- Grant CLI access to your project

### 2. Deploy Studio
After logging in, deploy:

```bash
npm run sanity:deploy
```

### 3. Get Studio URL
After deployment, you'll get a URL like:
```
https://inventivebytellc.sanity.studio
```

### 4. Update Redirect
Update `src/app/studio/[[...index]]/page.tsx` with your actual Studio URL:

```tsx
window.location.href = 'https://inventivebytellc.sanity.studio' // Replace with your URL
```

### 5. Push Changes
```bash
git add -A
git commit -m "Update Sanity Studio redirect URL"
git push origin main
```

## Troubleshooting

### Error: "Forbidden - User is missing required grant"
→ Run `npx sanity login` first

### Error: "sanity.cli.js does not contain a project identifier"
→ ✅ Fixed - `sanity.cli.ts` now exists in root

### Studio URL not working
→ Make sure you've deployed: `npm run sanity:deploy`
→ Check the URL matches in the redirect code
