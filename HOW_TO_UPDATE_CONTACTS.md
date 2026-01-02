# How to Update Contact Numbers - Exotica Farm Website

This guide shows you exactly where to update phone numbers across your entire website.

## 📞 Locations to Update

### 1. **Contact Us Page** (Public-Facing)
**File:** `src/app/contact/page.tsx`

**Line 80** - Display phone number:
```tsx
<p>+91 77210 75329</p>
```
Change to:
```tsx
<p>+91 YOUR_NUMBER_HERE</p>
```

**Line 114** - WhatsApp button link:
```tsx
<a href="https://wa.me/917721075329" className={styles.whatsappLink}>
```
Change to:
```tsx
<a href="https://wa.me/91YOUR_NUMBER_HERE" className={styles.whatsappLink}>
```
*Note: Remove spaces and + sign in WhatsApp link*

---

### 2. **Footer** (Visible on All Pages)
**File:** `src/components/Footer.tsx`

**Line 33** - Display phone number:
```tsx
<li>📞 +91 77210 75329</li>
```
Change to:
```tsx
<li>📞 +91 YOUR_NUMBER_HERE</li>
```

---

### 3. **Farm Visit Info Section**
**File:** `src/app/farm-visit/page.tsx`

Search for any hardcoded phone numbers in the info section (if present).

---

## 🔧 Quick Find & Replace

### Option 1: Using VS Code (Recommended)
1. Press `Ctrl + Shift + F` (Windows) or `Cmd + Shift + F` (Mac)
2. Search for: `77210 75329`
3. Replace with: `YOUR_NUMBER_HERE`
4. Review each replacement before confirming

### Option 2: Using Find & Replace in Single File
1. Open the file
2. Press `Ctrl + H` (Windows) or `Cmd + H` (Mac)
3. Find: `77210 75329`
4. Replace: `YOUR_NUMBER_HERE`

---

## 📝 Format Requirements

### Display Format (With Spaces)
Use this format for showing numbers to users:
```
+91 XXXXX XXXXX
```
Example: `+91 77210 75329`

### WhatsApp Link Format (No Spaces)
Use this format in `wa.me` links:
```
91XXXXXXXXXX
```
Example: `917721075329`

**Important:** 
- Remove the `+` sign
- Remove all spaces
- Keep the country code (91 for India)

---

## ✅ Checklist

After updating, verify these pages work correctly:

- [ ] Footer shows correct number on all pages
- [ ] Contact Us page displays correct number
- [ ] WhatsApp button on Contact page opens correct chat
- [ ] Farm visit page info (if applicable)
- [ ] Test WhatsApp link on mobile device

---

## 🚀 Example Replacement

### Old Number: +91 77210 75329

**Before:**
```tsx
// Display
<p>+91 77210 75329</p>

// WhatsApp Link
<a href="https://wa.me/917721075329">
```

### New Number: +91 70000 12345

**After:**
```tsx
// Display
<p>+91 70000 12345</p>

// WhatsApp Link  
<a href="https://wa.me/917000012345">
```

---

## 📧 Email Address Updates

### Public Display Email (What Users See)

#### 1. **Contact Us Page**
**File:** `src/app/contact/page.tsx`

**Line 92** - Display email:
```tsx
<p>exoticafarms.in@gmail.com</p>
```
Change to:
```tsx
<p>your-email@domain.com</p>
```

#### 2. **Footer** (Visible on All Pages)
**File:** `src/components/Footer.tsx`

**Line 34** - Display email:
```tsx
<li>✉️ exoticafarms.in@gmail.com</li>
```
Change to:
```tsx
<li>✉️ your-email@domain.com</li>
```

---

### Functional Email Settings (For Sending Emails)

These settings control the actual email sending functionality:

#### 3. **Environment Variables (.env file)**
**File:** `.env` (in project root)

Update these variables for email sending:

```env
# SMTP Settings - Your Email Provider Configuration
SMTP_HOST=smtp.gmail.com              # e.g., smtp.gmail.com for Gmail
SMTP_PORT=587                          # Usually 587 for TLS, 465 for SSL
SMTP_USER=your-email@domain.com       # Your actual email address
SMTP_PASS=your-app-password           # Your email password or app password

# Admin Notification Email
ADMIN_NOTIFY_EMAIL=admin@exoticafarm.com    # Where to receive notifications
ADMIN_EMAIL=admin@exoticafarm.com           # Fallback admin email
```

**Important SMTP Settings by Provider:**

**Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your-16-digit-app-password    # Generate from Google Account settings
```

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=youremail@outlook.com
SMTP_PASS=your-password
```

**Custom Domain (e.g., cPanel):**
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your-password
```

---

#### 4. **Admin Login Default Email**
**File:** `src/app/admin/login/actions.ts`

**Line 14** - Default admin email:
```tsx
const defaultEmail = process.env.ADMIN_EMAIL || "admin@exoticafarm.com";
```

This is only a fallback. It's better to set `ADMIN_EMAIL` in your `.env` file.

---

### 🔒 Gmail App Password Setup (If Using Gmail)

If you're using Gmail for SMTP, you MUST use an **App Password** (not your regular password):

1. Go to your Google Account: https://myaccount.google.com
2. Select **Security**
3. Under "Signing in to Google," select **2-Step Verification** (enable if not already)
4. At the bottom, select **App passwords**
5. Select app: **Mail**
6. Select device: **Other (Custom name)** → type "Exotica Farm"
7. Click **Generate**
8. Copy the 16-digit password (no spaces)
9. Use this in your `.env` file as `SMTP_PASS`

---

### ✅ Email Update Checklist

- [ ] Update display email on Contact Us page
- [ ] Update display email in Footer
- [ ] Update SMTP settings in `.env` file
- [ ] Set admin notification email in `.env`
- [ ] If using Gmail, generate and use App Password
- [ ] Test by submitting a contact form
- [ ] Verify emails are received at new address

---

### 🧪 Testing Email Functionality

After updating email settings:

1. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl + C)
   npm run dev
   ```

2. **Submit a test contact form**
   - Go to Contact Us page
   - Fill and submit the form
   - Check if email arrives at your `ADMIN_NOTIFY_EMAIL`

3. **Check console logs**
   - If emails aren't sending, check terminal for error messages
   - Common issues: wrong SMTP settings, incorrect password, 2FA not enabled

---

## 🔐 Environment Variables

The actual outgoing email/SMS functionality uses these files:
- `.env` - SMTP credentials
- `src/lib/mail.ts` - Email sending logic

No phone number changes needed there unless you're setting up WhatsApp Business API.

---

## 💡 Pro Tip

Create a single constant file for contact details:

**Create:** `src/config/contacts.ts`
```typescript
export const CONTACT_INFO = {
  phone: '+91 77210 75329',
  whatsapp: '917721075329',
  email: 'exoticafarms.in@gmail.com',
  address: '123 Green Valley, Agri District'
};
```

Then import and use everywhere:
```typescript
import { CONTACT_INFO } from '@/config/contacts';

<p>{CONTACT_INFO.phone}</p>
<a href={`https://wa.me/${CONTACT_INFO.whatsapp}`}>
```

This way, you only update in ONE place!
