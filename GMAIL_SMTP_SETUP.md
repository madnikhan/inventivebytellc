# Gmail SMTP Setup Guide

## ✅ What's Configured

- ✅ **SMTP Host:** `smtp.gmail.com`
- ✅ **SMTP Port:** `465`
- ✅ **SMTP User:** `madnikhan1@gmail.com`
- ⏳ **SMTP Password:** Needs Gmail App Password

## 🔐 Get Gmail App Password

Gmail requires an **App Password** (not your regular password) for SMTP access.

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under **Signing in to Google**, click **2-Step Verification**
3. Follow the setup process (if not already enabled)

### Step 2: Generate App Password
1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Under **Signing in to Google**, click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter: `InventiveByte Website`
6. Click **Generate**
7. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

### Step 3: Update `.env.local`
```bash
SMTP_PASS=abcdefghijklmnop
```
(Remove spaces from the app password)

---

## ✅ After Setup

Once configured, your email functionality will work:
- ✅ Contact form emails
- ✅ Appointment confirmations
- ✅ Quote request notifications
- ✅ Information form submissions
- ✅ Signup welcome emails

---

## 🧪 Test Email

After setting up, test the contact form:
1. Go to `/contact`
2. Fill out the form
3. Submit
4. Check `madnikhan1@gmail.com` inbox

---

## ⚠️ Important Notes

- **App Password:** Use the 16-character app password, NOT your regular Gmail password
- **2-Step Verification:** Must be enabled to generate app passwords
- **Security:** App passwords are safer than regular passwords
- **Limit:** Gmail allows 500 emails/day on free accounts

---

## 📝 Quick Checklist

- [ ] Enable 2-Step Verification
- [ ] Generate App Password
- [ ] Update `.env.local` with app password
- [ ] Test contact form
- [ ] Add to Vercel environment variables

---

**Need Help?** See Gmail's [App Passwords guide](https://support.google.com/accounts/answer/185833)
