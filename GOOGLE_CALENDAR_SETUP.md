# Google Calendar API Setup Guide

## Current Status

✅ **OAuth2 Credentials Added:**
- Client ID: `your-client-id.apps.googleusercontent.com`
- Client Secret: `your-client-secret`

## Authentication Methods

Your codebase currently uses **Service Account** authentication, but you've provided **OAuth2** credentials. Here are your options:

### Option 1: Continue with Service Account (Recommended for Server-Side)

**Advantages:**
- No user interaction required
- Works automatically in the background
- Better for server-side integrations

**Setup Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **Service Account**
5. Create a service account and download the JSON key
6. Update `.env.local` with:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_PROJECT_ID=your-project-id
   GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
   ```
7. Share your calendar with the service account email

### Option 2: Switch to OAuth2 (For User Authorization)

**Advantages:**
- Users authorize with their own Google accounts
- Access to user's personal calendar
- More flexible for multi-user scenarios

**Setup Steps:**
1. Configure OAuth consent screen in Google Cloud Console
2. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
3. Update the authentication code to use OAuth2 flow
4. Implement OAuth2 token refresh logic

## Current Implementation

The current code (`src/lib/google-calendar.ts`) uses Service Account authentication. To use OAuth2 credentials, you would need to:

1. **Update the authentication method** in `src/lib/google-calendar.ts`
2. **Implement OAuth2 flow** for user authorization
3. **Store and refresh OAuth tokens**

## Quick Setup for Service Account

If you want to continue with Service Account (recommended):

1. **Create Service Account:**
   ```bash
   # In Google Cloud Console:
   # 1. APIs & Services → Credentials
   # 2. Create Credentials → Service Account
   # 3. Download JSON key file
   ```

2. **Extract credentials from JSON:**
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
   - `project_id` → `GOOGLE_PROJECT_ID`

3. **Share Calendar:**
   - Open Google Calendar
   - Settings → Share with specific people
   - Add service account email with "Make changes to events" permission

4. **Update `.env.local`:**
   ```
   GOOGLE_CALENDAR_ID=your-email@gmail.com
   GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_PROJECT_ID=your-project-id
   ```

## Testing Calendar Integration

After setting up credentials:

1. **Test availability endpoint:**
   ```bash
   curl http://localhost:3000/api/calendar/availability?start=2024-01-01&end=2024-01-31
   ```

2. **Test appointment booking:**
   - Go to `/appointment` page
   - Select a date and time
   - Fill out the form
   - Submit and check your Google Calendar

## Troubleshooting

### Error: "Google Calendar credentials not configured"
- Check all required environment variables are set
- Verify `.env.local` is loaded (restart dev server)

### Error: "Insufficient permissions"
- Service account needs calendar access
- Share calendar with service account email
- Grant "Make changes to events" permission

### Error: "Invalid credentials"
- Verify private key format (must include `\n` for newlines)
- Check service account email is correct
- Ensure Calendar API is enabled in Google Cloud Console

## Next Steps

1. ✅ OAuth2 credentials added to `.env.local`
2. ⏳ Choose authentication method (Service Account or OAuth2)
3. ⏳ Complete setup based on chosen method
4. ⏳ Test calendar integration
5. ⏳ Configure calendar sharing

## Need Help?

- **Service Account Setup**: See Google Cloud Console documentation
- **OAuth2 Setup**: Requires implementing OAuth flow (more complex)
- **Current Code**: Already configured for Service Account

**Recommendation**: Use Service Account for server-side calendar integration. OAuth2 is better for user-facing applications where users need to authorize access to their own calendars.
