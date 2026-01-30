# How to Delete a Portfolio Item (or Testimonial) in Sanity Studio

After deploying the latest Studio config, you get **two** ways to delete:

## Option 1: Visible “Delete” button (recommended)

1. Open the document (e.g. **Portfolio Project** → click the item).
2. In the **bottom-right** of the editor you’ll see **Delete** (red/danger style) next to Publish and the ⋮ menu.
3. Click **Delete**, confirm in the dialog, and the document is removed.

## Option 2: Actions menu

1. Open the document.
2. Click the **⋮** (three dots) button in the bottom-right.
3. Choose **Delete** and confirm.

---

**If you don’t see the Delete button:** redeploy the Studio so it uses the latest config:

```bash
npm run sanity:deploy
```

Then open the Studio again (e.g. your deployed URL or `/studio` redirect).
