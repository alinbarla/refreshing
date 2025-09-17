import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM'
] as const;

type RequiredEnv = typeof requiredEnv[number];

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getEnv(name: RequiredEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
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

    const host = getEnv('SMTP_HOST');
    const port = parseInt(getEnv('SMTP_PORT'), 10);
    const user = getEnv('SMTP_USER');
    const pass = getEnv('SMTP_PASS');
    const from = getEnv('SMTP_FROM');

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    const businessTo = 'info@refreshing.se';

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
      replyTo: businessTo,
      subject: subjectCustomer,
      text: `Tack för din bokning hos Refreshing!\n\n${textSummary}\nVi återkommer inom kort för att bekräfta tiden.`
    });

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Email send error:', error);
    const message = error?.message || 'Serverfel';
    return res.status(500).json({ error: message });
  }
}
