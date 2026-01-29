# Fix: Calendar 404 "Not Found" Error

## 🔴 Error Message
```
Error creating calendar event: Error: Not Found (404)
```

## 🔍 Root Cause
The Google Calendar API is returning 404 because the **service account doesn't have access** to your calendar. The calendar must be explicitly shared with the service account.

## ✅ Solution: Share Calendar with Service Account

### Step 1: Open Google Calendar
1. Go to [Google Calendar](https://calendar.google.com/)
2. Make sure you're signed in with `madnikhan1@gmail.com`

### Step 2: Share Your Calendar
1. On the left sidebar, find **"My calendars"**
2. Hover over your calendar (usually your name/email)
3. Click the **three dots (⋮)** next to your calendar
4. Select **"Settings and sharing"**

### Step 3: Add Service Account
1. Scroll down to **"Share with specific people"**
2. Click **"Add people"**
3. Enter this email:
   ```
   inventivebytecalender@inventivebytellc.iam.gserviceaccount.com
   ```
4. Set permission to: **"Make changes to events"**
5. Click **"Send"**

### Step 4: Verify Access
After sharing, wait a few seconds for Google to process the permission, then try creating an appointment again.

---

## 🧪 Test After Fixing

1. **Restart your dev server** (if running):
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Try creating an appointment**:
   - Go to `http://localhost:3000/appointment`
   - Fill out the form
   - Submit
   - Check your Google Calendar - the event should appear!

---

## ⚠️ Common Issues

### Issue: "Calendar not found"
- **Solution**: Make sure `GOOGLE_CALENDAR_ID` in `.env.local` matches your calendar email exactly
- Current value: `madnikhan1@gmail.com`
- This should be your Gmail address or the calendar ID from Calendar settings

### Issue: "Permission denied" (403)
- **Solution**: Make sure you set permission to **"Make changes to events"** (not just "See all event details")

### Issue: Still getting 404 after sharing
- **Wait 30-60 seconds** - Google needs time to propagate permissions
- **Double-check** the service account email is correct:
  ```
  inventivebytecalender@inventivebytellc.iam.gserviceaccount.com
  ```
- **Verify** you're sharing the correct calendar (the one matching `GOOGLE_CALENDAR_ID`)

---

## 📋 Quick Checklist

- [ ] Opened Google Calendar
- [ ] Found calendar settings
- [ ] Added service account email: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
- [ ] Set permission: "Make changes to events"
- [ ] Clicked "Send"
- [ ] Waited 30-60 seconds
- [ ] Tested appointment creation

---

## 🔗 Related Files

- `GOOGLE_CALENDAR_COMPLETE_SETUP.md` - Full setup guide
- `GOOGLE_CALENDAR_SETUP.md` - Initial setup instructions
- `.env.local` - Environment variables (check `GOOGLE_CALENDAR_ID` and `GOOGLE_SERVICE_ACCOUNT_EMAIL`)

---

**After sharing the calendar, the 404 error should be resolved!** 🎉
