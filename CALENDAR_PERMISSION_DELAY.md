# Calendar Permission Delay - Troubleshooting

## ✅ You've Done Everything Right!

Your screenshot shows the calendar is correctly shared with:
- Service Account: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
- Permission: "Make changes to events" ✅

## ⏰ The Issue: Permission Propagation Delay

Google Calendar permissions can take **2-5 minutes** to fully propagate. Even though you've shared the calendar, the API might not see it immediately.

## 🔧 Solutions (Try in Order)

### Solution 1: Wait and Restart (Most Common Fix)

1. **Wait 2-3 minutes** after sharing the calendar
2. **Stop your dev server** (Ctrl+C)
3. **Restart dev server:**
   ```bash
   npm run dev
   ```
4. **Try the appointment form again**

### Solution 2: Test Calendar Access

I've created a test endpoint to diagnose the issue:

1. **Open in browser:**
   ```
   http://localhost:3000/api/calendar/test
   ```

2. **This will show:**
   - ✅ If calendar access works
   - ❌ What calendars are accessible
   - 🔍 Specific error details

3. **Use the results** to troubleshoot further

### Solution 3: Remove and Re-add Service Account

Sometimes removing and re-adding helps:

1. **Remove** the service account from calendar sharing
2. **Wait 30 seconds**
3. **Re-add** `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
4. **Set permission:** "Make changes to events"
5. **Wait 2-3 minutes**
6. **Restart dev server**

### Solution 4: Verify Calendar ID Format

The calendar ID might need to be in a specific format:

1. **Check your calendar settings:**
   - Go to Google Calendar → Settings
   - Find your calendar → "Integrate calendar"
   - Copy the **Calendar ID** (might be different from email)

2. **Update `.env.local`:**
   ```bash
   GOOGLE_CALENDAR_ID=your-actual-calendar-id
   ```

3. **Restart dev server**

---

## 🧪 Diagnostic Steps

### Step 1: Test Calendar Access
```bash
# Visit this URL in your browser:
http://localhost:3000/api/calendar/test
```

### Step 2: Check Server Logs
Look at your terminal where `npm run dev` is running. The error message should show:
- Error code (403 or 404)
- Specific error message
- What calendars are accessible

### Step 3: Verify Environment Variables
Make sure `.env.local` has:
```bash
GOOGLE_CALENDAR_ID=madnikhan1@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=inventivebytecalender@inventivebytellc.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_PROJECT_ID=inventivebytellc
```

---

## ⚠️ Common Issues

### Issue: "Permission denied" even after sharing
- **Wait longer** (up to 5 minutes)
- **Restart dev server** after waiting
- **Check** the test endpoint: `/api/calendar/test`

### Issue: Calendar not found (404)
- **Verify** calendar ID matches exactly
- **Try** using the Calendar ID from "Integrate calendar" section
- **Check** you're sharing the correct calendar

### Issue: Still not working after 5 minutes
- **Remove** service account from sharing
- **Re-add** with exact email: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
- **Set permission** to "Make changes to events" (not "See all event details")
- **Wait** 3-5 minutes
- **Restart** dev server

---

## 📋 Quick Checklist

- [ ] Calendar is shared with service account ✅ (from your screenshot)
- [ ] Permission is "Make changes to events" ✅ (from your screenshot)
- [ ] Waited 2-3 minutes after sharing
- [ ] Restarted dev server
- [ ] Tested `/api/calendar/test` endpoint
- [ ] Verified `.env.local` has correct values
- [ ] Tried removing and re-adding service account

---

## 🎯 Next Steps

1. **Visit:** `http://localhost:3000/api/calendar/test`
2. **Check the response** - it will tell you exactly what's wrong
3. **Follow the suggestions** from the test endpoint
4. **Try the appointment form** again

The test endpoint will give you specific information about what calendars are accessible and what the exact error is!
