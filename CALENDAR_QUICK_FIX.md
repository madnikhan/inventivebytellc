# Quick Fix: Calendar 403 Error

## Immediate Action

**Visit this URL in your browser:**
```
http://localhost:3000/api/calendar/test
```

This will show you:
1. ✅ What calendars the service account CAN access
2. ❌ Why your calendar isn't accessible
3. 🔍 Specific error details

## Most Common Fix

**Create a dedicated shared calendar** (recommended):

1. **Google Calendar** → **+** → **Create new calendar**
2. **Name**: "Appointments" or "InventiveByte Appointments"
3. **Share** with: `inventivebytecalender@inventivebytellc.iam.gserviceaccount.com`
4. **Permission**: "Make changes to events"
5. **Get Calendar ID** from Settings → Integrate calendar
6. **Update `.env.local`** with the new Calendar ID
7. **Restart dev server**

Shared calendars work better for service accounts than personal calendars!

## Why Personal Calendar Might Fail

- Personal Gmail calendars sometimes have stricter access controls
- Service accounts work better with shared calendars
- Less permission propagation delays

## After Creating Shared Calendar

1. Update `.env.local`:
   ```bash
   GOOGLE_CALENDAR_ID=your-new-shared-calendar-id@group.calendar.google.com
   ```

2. Restart dev server

3. Test: `http://localhost:3000/api/calendar/test`

4. Try appointment form

This should work immediately!
