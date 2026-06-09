# Contact form setup

Current configuration: the interactive contact form has been removed — the page now provides a direct `mailto:` link that opens the visitor's mail client (no server or third-party provider required). This is free and works on static hosting. To change the recipient set `VITE_MAILTO` in your Vite `.env` (defaults to `dev.adrian0508@gmail.com`).

Optional server-side handlers (kept in the repo) exist if you later want a hosted endpoint: `api/contact.js` (Node/Nodemailer) and `php/contact.php` (PHPMailer). These are unused by default.

Recommended provider: Mailgun SMTP (easy to set up, reliable deliverability). You can use any SMTP provider (Mailgun, Sendinblue, Mailjet, SES SMTP, Gmail SMTP for low-volume testing).

Required environment variables (set in Vercel or locally when running `vercel dev`):

- `SMTP_HOST` — SMTP host (e.g. `smtp.mailgun.org`)
- `SMTP_PORT` — SMTP port (587 for TLS, 465 for SSL — default 587)
- `SMTP_USER` — SMTP username (Mailgun provides this)
- `SMTP_PASS` — SMTP password
- `SMTP_FROM` — From address shown in emails (e.g. `"Portfolio" <no-reply@yourdomain.com>`)
- `SMTP_TO` — Destination email address where you receive contact messages (your email)

Install dependencies:

```bash
npm install
# nodemailer is already listed in package.json; if not: npm install nodemailer
```

## Local testing

1. Create a `.env.local` with the variables above, for example:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@YOUR_DOMAIN
SMTP_PASS=your-smtp-password
SMTP_FROM="Your Name" <no-reply@yourdomain.com>
SMTP_TO=you@yourdomain.com
```

2. Start the local dev server (use `vercel dev` to run serverless functions locally) or `npm run dev` if your setup routes `/api` to Vercel functions:

```bash
vercel dev
```

3. Open `http://localhost:3000` and submit the contact form.

## Direct API test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@example.com","message":"hello"}'
```

## Notes

- The serverless endpoint will return `400` for missing fields and `500` if SMTP env vars are not configured or the send fails.
- Mailgun: add and verify a sending domain (or use the sandbox domain) and copy the SMTP credentials from the Mailgun dashboard.
- If you prefer, I can switch to AWS SES (requires AWS setup) or keep a PHP PHPMailer script hosted on a PHP server — tell me which you prefer.

## Free options (no paid provider required)

If you don't want to pay or configure SMTP, there are free approaches that work with static hosting (GitHub Pages, Vercel free tier, etc.):

- Formspree (recommended for static sites): create a free account, register a form, and copy the endpoint (looks like `https://formspree.io/f/{id}`). Then set `VITE_FORM_ENDPOINT` to that URL in your Vite `.env` and the client will POST JSON directly to Formspree for delivery to your verified email. No server required.
- Mail client fallback (always free, no signup): the form will open the visitor's mail client via `mailto:` and prefill subject/body. This requires no server and is automatic when neither `VITE_FORM_ENDPOINT` nor `VITE_CONTACT_URL` are configured. To customize the recipient, set `VITE_MAILTO`.
- EmailJS (client-side SMTP-like service): offers a free tier that lets you send email from the browser using their SDK without running a server. Requires signup and copying `SERVICE_ID`, `TEMPLATE_ID`, `USER_ID` into env vars.

Examples:

1. Formspree (static site):

```bash
# In your Vite project root (.env or .env.development)
VITE_FORM_ENDPOINT=https://formspree.io/f/your-id
```

2. Mailto fallback (no config necessary): the contact form will open the user's mail client.

3. EmailJS: sign up at https://www.emailjs.com, create a service/template, then use their client SDK (I can wire this up if you want).

These free options avoid paid SMTP providers. If you want, I can wire the project to use Formspree right now — you'll just need to create a free Formspree form and give me the endpoint (or set it in `.env`).

## PHP (PHPMailer) deployment

If you'd like to host the contact endpoint on a PHP-capable server (cPanel, shared hosting, VPS LAMP), you can deploy `php/contact.php` included in this repo. It uses PHPMailer and reads SMTP credentials from environment variables.

Steps:

1. On your PHP server, install Composer (if not already installed) and require PHPMailer in the same folder as `contact.php`:

```bash
cd /path/to/public_html/contact
composer require phpmailer/phpmailer
```

2. Copy `php/contact.php` to the server folder (the `vendor` folder from composer should be next to it).

3. Configure environment variables on your host (preferred) or set values directly in the file (not recommended). Required env vars:

- `SMTP_HOST` — SMTP host (e.g. `smtp.mailgun.org`)
- `SMTP_PORT` — SMTP port (587 or 465)
- `SMTP_USER` — SMTP username
- `SMTP_PASS` — SMTP password
- `SMTP_FROM` — From address, e.g. `"Portfolio" <no-reply@yourdomain.com>`
- `SMTP_TO` — Destination email to receive messages

4. Ensure the file is reachable via HTTPS, for example `https://yourdomain.com/contact/contact.php`.

5. In your React app, set `VITE_CONTACT_URL` to that URL for development/build. For local dev with Vite create a `.env` with:

```
VITE_CONTACT_URL=https://yourdomain.com/contact/contact.php
```

6. Test with curl:

```bash
curl -X POST https://yourdomain.com/contact/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@example.com","message":"hello"}'
```

Notes:

- `php/contact.php` sets permissive CORS (`*`) for convenience — tighten this to your site origin in production.
- Make sure your SMTP provider allows the `From` address you configure (some providers require verified senders).
- If you want, I can produce an alternative `contact.php` that accepts `application/x-www-form-urlencoded` instead of JSON.
