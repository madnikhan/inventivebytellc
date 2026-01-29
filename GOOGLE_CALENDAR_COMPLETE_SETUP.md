# Google Calendar Service Account - Complete Setup

## ✅ What You Have

- ✅ **Service Account Email:** `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
- ✅ **OAuth2 Credentials:** Client ID and Secret (already in `.env.local`)

## ⚠️ What You Still Need

### 1. Private Key (REQUIRED)
**Where to get it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Find: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
4. Click on it → **Keys** tab
5. Click **Add Key** → **Create new key**
6. Choose **JSON** format
7. Download the JSON file

**Extract from JSON:**
Open the downloaded JSON file and find:
- `private_key` - Copy this entire value (includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- `project_id` - Copy this value

**Update `.env.local`:**
```bash
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id-from-json
```

**Important:** 
- Keep the `\n` characters in the private key
- The entire key should be on one line with `\n` for line breaks
- Keep the quotes around the private key

---

### 2. Calendar ID (REQUIRED)
**Which calendar to use:**
- Your personal Google Calendar email (e.g., `yourname@gmail.com`)
- OR a shared calendar email
- OR a calendar ID from Google Calendar settings

**How to find it:**
1. Open [Google Calendar](https://calendar.google.com/)
2. Go to **Settings** → **Settings for my calendars**
3. Click on the calendar you want to use
4. Scroll to **Integrate calendar**
5. Copy the **Calendar ID** (looks like `yourname@gmail.com` or `abc123@group.calendar.google.com`)

**Update `.env.local`:**
```bash
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
```

---

### 3. Share Calendar with Service Account (REQUIRED)
**Critical Step:** The service account needs access to your calendar!

1. Open [Google Calendar](https://calendar.google.com/)
2. Go to **Settings** → **Settings for my calendars**
3. Click on your calendar
4. Scroll to **Share with specific people**
5. Click **Add people**
6. Add: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
7. Set permission: **Make changes to events**
8. Click **Send**

**Without this step, the service account cannot create events!**

---

## 📝 Complete `.env.local` Example

After completing the steps above, your `.env.local` should look like:

```bash
# Google Calendar API - Service Account
GOOGLE_CALENDAR_ID=yourname@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=inventivebytecalender@inventivebytellc.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=inventivebytellc

# Calendar Settings (optional - already configured)
CALENDAR_TIMEZONE=America/Denver
CALENDAR_BUSINESS_HOURS_START=09:00
CALENDAR_BUSINESS_HOURS_END=17:00
CALENDAR_APPOINTMENT_DURATION=60
CALENDAR_BUFFER_MINUTES=15
```

---

## ✅ Verification Steps

### 1. Test Calendar Connection
After updating `.env.local`, test the connection:

```bash
# Start dev server
npm run dev

# Visit appointment page
# http://localhost:3000/appointment
# Try selecting a date and time
# Submit the form
# Check your Google Calendar - event should be created
```

### 2. Check for Errors
- If you see "Google Calendar credentials not configured" → Check all env variables are set
- If you see "Insufficient permissions" → Share calendar with service account
- If you see "Invalid credentials" → Check private key format

---

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ⚠️ **Never commit the private key to Git**
- ⚠️ **Add all variables to Vercel Dashboard** before deploying
- ⚠️ Keep the JSON key file secure (don't share publicly)

---

## 🚀 After Setup

Once configured:
1. ✅ Appointments will create calendar events automatically
2. ✅ Users will receive calendar invites
3. ✅ You'll receive email notifications
4. ✅ Calendar availability will be checked automatically

---

## 📞 Quick Checklist

- [ ] Download service account JSON key
- [ ] Extract `private_key` from JSON
- [ ] Extract `project_id` from JSON
- [ ] Update `.env.local` with private key
- [ ] Update `.env.local` with project ID
- [ ] Find your calendar ID
- [ ] Update `.env.local` with calendar ID
- [ ] Share calendar with service account email
- [ ] Test appointment creation
- [ ] Add all variables to Vercel Dashboard

---

**Need Help?** See `GOOGLE_CALENDAR_SETUP.md` for more details.
