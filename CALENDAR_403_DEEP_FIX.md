# Fix: Calendar 403 Permission Denied - Deep Troubleshooting

## Current Issue
Even after sharing the calendar, you're getting 403 errors. This suggests the service account can't access the calendar properly.

## Diagnostic Steps

### Step 1: Check What Calendars Are Accessible
Visit: `http://localhost:3000/api/calendar/test`

This will show:
- ✅ What calendars the service account CAN access
- ❌ Why the specific calendar isn't accessible
- 🔍 The exact error details

### Step 2: Verify Calendar Sharing (Double-Check)

1. **Open Google Calendar**: https://calendar.google.com
2. **Settings** → **Settings for my calendars**
3. **Click on "madnikhan1@gmail.com" calendar**
4. **Scroll to "Share with specific people"**
5. **Verify** `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com` is listed
6. **Verify** permission is exactly **"Make changes to events"** (not "See all event details")

### Step 3: Try Removing and Re-Adding

Sometimes removing and re-adding helps:

1. **Remove** the service account from sharing
2. **Wait 30 seconds**
3. **Re-add** `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
4. **Set permission**: "Make changes to events"
5. **Click "Send"**
6. **Wait 2-3 minutes**
7. **Restart dev server**

### Step 4: Check Calendar ID Format

The calendar ID might need to be in a specific format:

1. **Go to Google Calendar Settings**
2. **Find your calendar** → **"Integrate calendar"**
3. **Copy the Calendar ID** (might be different from email)
4. **Update `.env.local`**:
   ```bash
   GOOGLE_CALENDAR_ID=your-actual-calendar-id-from-integrate-section
   ```
5. **Restart dev server**

### Step 5: Verify Service Account Permissions in Google Cloud

1. **Go to**: https://console.cloud.google.com/
2. **Navigate to**: IAM & Admin → Service Accounts
3. **Find**: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
4. **Check**: Service account has proper permissions
5. **Verify**: Calendar API is enabled for the project

## Alternative Solution: Use a Shared Calendar

If personal calendar access continues to fail, create a dedicated shared calendar:

1. **Create New Calendar**:
   - Google Calendar → **+** → **Create new calendar**
   - Name: "InventiveByte Appointments"
   - Description: "Appointments from website"

2. **Share with Service Account**:
   - Settings → Share with specific people
   - Add: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
   - Permission: "Make changes to events"

3. **Get Calendar ID**:
   - Settings → Integrate calendar
   - Copy Calendar ID (looks like `abc123@group.calendar.google.com`)

4. **Update `.env.local`**:
   ```bash
   GOOGLE_CALENDAR_ID=abc123@group.calendar.google.com
   ```

5. **Restart dev server**

## Why This Might Work Better

- ✅ Shared calendars are designed for programmatic access
- ✅ Less permission conflicts
- ✅ Easier to manage
- ✅ Can be shared with multiple users if needed

## Test After Changes

1. **Visit**: `http://localhost:3000/api/calendar/test`
2. **Check response** - should show accessible calendars
3. **Try appointment form** - should work now

## Still Not Working?

If none of the above works, the test endpoint (`/api/calendar/test`) will show exactly what calendars are accessible and what the error is. Share that output for further diagnosis.
