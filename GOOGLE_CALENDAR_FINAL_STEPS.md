# Google Calendar Setup - Final Steps

## ✅ What's Configured

- ✅ **Service Account Email:** `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
- ✅ **Project ID:** `inventivebytellc`
- ✅ **Private Key:** Extracted and added to `.env.local`
- ✅ **Calendar ID:** `madnikhan1@gmail.com`

## 🔐 Final Step: Share Calendar with Service Account

**CRITICAL:** The service account needs permission to access your calendar!

### Steps:

1. **Open Google Calendar**
   - Go to [calendar.google.com](https://calendar.google.com)

2. **Open Calendar Settings**
   - Click the **⚙️ Settings** icon (top right)
   - Click **Settings** → **Settings for my calendars**
   - Click on your calendar (usually your Gmail address)

3. **Share Calendar**
   - Scroll down to **"Share with specific people"**
   - Click **"Add people"**
   - Enter: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
   - Set permission: **"Make changes to events"**
   - Click **"Send"**

4. **Verify**
   - You should see the service account listed with "Make changes to events" permission

---

## ✅ Test Calendar Integration

After sharing the calendar:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test appointment form:**
   - Go to `http://localhost:3000/appointment`
   - Select a date
   - Select a time slot
   - Fill out the form
   - Submit

3. **Check Google Calendar:**
   - Open [Google Calendar](https://calendar.google.com)
   - You should see the appointment event created
   - The attendee (user's email) should receive a calendar invite

---

## 🎉 What Works Now

Once calendar is shared:
- ✅ Appointment scheduling creates calendar events
- ✅ Users receive calendar invites
- ✅ Calendar availability is checked automatically
- ✅ Time slots show as available/unavailable based on existing events

---

## ⚠️ Troubleshooting

### Error: "Insufficient permissions"
- **Solution:** Share calendar with service account email
- **Check:** Service account has "Make changes to events" permission

### Error: "Calendar not found"
- **Solution:** Verify `GOOGLE_CALENDAR_ID` matches your calendar email
- **Check:** Calendar ID is `madnikhan1@gmail.com`

### Error: "Invalid credentials"
- **Solution:** Check private key format in `.env.local`
- **Check:** Private key includes `\n` for newlines
- **Check:** Private key is wrapped in quotes

---

## 📝 Security Note

✅ **JSON key file added to `.gitignore`** - Won't be committed to Git

**Important:**
- Never commit the JSON key file
- Never commit `.env.local`
- Add all environment variables to Vercel Dashboard before deploying

---

## 🚀 Next Steps

1. ✅ Share calendar with service account (5 minutes)
2. ⏳ Get Gmail App Password for email (see `GMAIL_SMTP_SETUP.md`)
3. ✅ Test appointment scheduling
4. ✅ Deploy to Vercel
5. ✅ Add all environment variables to Vercel Dashboard

---

**You're almost there!** Just share the calendar and you'll have full calendar integration working! 🎉
