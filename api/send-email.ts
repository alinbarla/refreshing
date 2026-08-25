import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
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
    const {
      customer_email,
      customer_name,
      customer_phone,
      customer_address,
      service_type,
      frequency,
      square_meters,
      windows,
      total_price,
      booking_details
    } = req.body || {};

    if (!customer_email || !isValidEmail(customer_email)) {
      return res.status(400).json({ error: 'Ogiltig e-postadress' });
    }

    if (!customer_name || !service_type || !frequency || (!windows && !square_meters)) {
      return res.status(400).json({ error: 'Vänligen fyll i alla obligatoriska fält' });
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const user = process.env.SMTP_USER;
    const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const from = process.env.SMTP_FROM || (user ? `Refreshing <${user}>` : '');
    const businessTo = process.env.SMTP_TO || 'alinbarla@hotmail.com';

    if (!host || !user || !pass || !from) {
      return res.status(500).json({
        error: 'E-postservern saknar SMTP-uppgifter. Lägg till SMTP_HOST, SMTP_USER, SMTP_PASS och SMTP_FROM i Vercel.'
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000
    });

    const subjectBusiness = `Ny bokning: ${service_type} – ${customer_name}`;
    const subjectCustomer = `Bekräftelse: ${service_type} – Refreshing`;

    const textSummary = `Kund: ${customer_name}
Telefon: ${customer_phone}
E-post: ${customer_email}
Adress: ${customer_address}
Tjänst: ${service_type}
Frekvens: ${frequency}
${square_meters ? `Kvadratmeter: ${square_meters}` : ''}
${windows ? `Antal fönster: ${windows}` : ''}
Totalt pris: ${total_price}
`;

    await transporter.sendMail({
      from,
      to: businessTo,
      replyTo: customer_email,
      subject: subjectBusiness,
      text: booking_details ? `${textSummary}\n${booking_details}` : textSummary
    });

    await transporter.sendMail({
      from,
      to: customer_email,
      replyTo: from,
      subject: subjectCustomer,
      text: `Tack för din bokning hos Refreshing!\n\n${textSummary}\nVi återkommer inom kort för att bekräfta tiden.`
    });

    return res.status(200).json({ ok: true });
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
