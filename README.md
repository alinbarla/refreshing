# Refreshing.se – Email setup (EmailJS)

Follow these steps to send booking emails from and to `info@refreshing.se`, plus auto-confirmations to customers.

## 1) Create EmailJS account and service
- Go to `https://www.emailjs.com` and sign in.
- Add your email service connected to `info@refreshing.se` (NEO mailbox). Use SMTP or a supported provider.
- In EmailJS, note your Service ID.

## 2) Add two templates
Create two templates with the following variable fields. Name them however you like; you’ll paste their IDs into the env.

- Business template (to you):
  - To: `{{to_email}}`
  - From: `{{from_email}}` (use `info@refreshing.se`)
  - Reply-To: `{{reply_to}}` (customer email)
  - Subject: e.g., `Ny bokning: {{service_type}} – {{customer_name}}`
  - Body: include these variables:
    - `{{customer_name}}`
    - `{{customer_email}}`
    - `{{customer_phone}}`
    - `{{customer_address}}`
    - `{{service_type}}`
    - `{{frequency}}`
    - `{{square_meters}}`
    - `{{windows}}`
    - `{{total_price}}`
    - `{{booking_details}}`

- Customer template (to the client):
  - To: `{{to_email}}` (customer email)
  - From: `{{from_email}}` (use `info@refreshing.se`)
  - Reply-To: `{{reply_to}}` (your business email)
  - Subject: e.g., `Bekräftelse: {{service_type}} – Refreshing`
  - Body: include the same variables as above so the client sees their summary.

In each template, ensure variable names exactly match what’s listed.

## 3) Get your public key
- In EmailJS dashboard, copy your Public Key.

## 4) Create your .env file
Create a `.env` at the project root with:

```
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_BUSINESS=YOUR_BUSINESS_TEMPLATE_ID
VITE_EMAILJS_TEMPLATE_CUSTOMER=YOUR_CUSTOMER_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

Restart your dev server/build after changing envs.

## 5) Domain authentication (recommended)
Set up SPF and DKIM for `refreshing.se` with NEO so emails sent as `info@refreshing.se` don’t land in spam.
- SPF: include EmailJS/SMTP host per your provider docs
- DKIM: add CNAME/TXT records as instructed by your SMTP provider

## 6) Where it’s wired in code
- `src/components/BookingForm.tsx` uses the env vars above and sends two emails:
  - Business notification to `info@refreshing.se` with `reply_to` set to the customer
  - Customer confirmation to the client with `reply_to` set to `info@refreshing.se`
- If envs are missing, a friendly alert appears and sending is aborted.

## 7) Test checklist
- Fill the form to Step 4 and submit
- Confirm an email arrives at `info@refreshing.se`
- Confirm the customer receives a confirmation email
- Check that Reply-To works in both directions

If you want me to prefill the `.env` for you, just send your Service ID, two Template IDs, and Public Key. 

## Serverless SMTP (recommended)

This project includes a serverless function at `api/send-email.ts` that sends two emails via SMTP using Nodemailer (one to you, one to the customer).

### Environment variables (Vercel / local .env)

Set these in your Vercel project (Project Settings → Environment Variables) or a local `.env` when running locally with a compatible dev server:

```
SMTP_HOST=smtp.your-neo-provider.tld
SMTP_PORT=465
SMTP_USER=info@refreshing.se
SMTP_PASS=your_app_password_or_mailbox_password
SMTP_FROM=Refreshing <info@refreshing.se>
```

- Use port 465 (secure) if your provider supports it; otherwise 587 and `secure: false` (the code auto-secures for 465).
- For NEO, obtain SMTP host, port, and enable app password if available.

### Deploy on Vercel
1. Push this repo to GitHub.
2. Import to Vercel.
3. Add the env vars above in Project Settings.
4. Deploy. The endpoint will be `/api/send-email`.

### Test
- Fill the booking form to Step 4 and submit.
- Check `info@refreshing.se` inbox and your customer inbox.

Troubleshooting:
- If emails fail, open Vercel function logs for `api/send-email`.
- Verify SPF/DKIM for `refreshing.se` to improve deliverability. 
