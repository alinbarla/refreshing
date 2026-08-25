import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendBookingEmails } from './mailer';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const result = await sendBookingEmails(req.body || {});
    return res.status(result.status).json(result.body);
  } catch (error: unknown) {
    console.error('Email send error:', error);
    const message = error instanceof Error ? error.message : 'Serverfel';
    if (/535\b/.test(message) || /5\.7\.8/.test(message) || /authentication failed/i.test(message)) {
      return res.status(500).json({
        error: 'Ogiltiga SMTP-uppgifter. Kontrollera SMTP_USER/SMTP_PASS, host och port.'
      });
    }
    return res.status(500).json({ error: message });
  }
}
