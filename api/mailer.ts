import nodemailer from 'nodemailer';

const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'SMTP_TO'
] as const;

type RequiredEnv = (typeof requiredEnv)[number];

export type BookingPayload = {
  customer_email?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  service_type?: string;
  frequency?: string;
  square_meters?: string;
  windows?: string;
  total_price?: string;
  booking_details?: string;
};

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

export async function sendBookingEmails(
  payload: BookingPayload
): Promise<{ status: number; body: Record<string, unknown> }> {
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
  } = payload || {};

  if (!customer_email || !isValidEmail(customer_email)) {
    return { status: 400, body: { error: 'Ogiltig e-postadress' } };
  }

  if (!customer_name || !service_type || !frequency || (!windows && !square_meters)) {
    return { status: 400, body: { error: 'Vänligen fyll i alla obligatoriska fält' } };
  }

  const host = getEnv('SMTP_HOST');
  const port = parseInt(getEnv('SMTP_PORT'), 10);
  const user = getEnv('SMTP_USER');
  const pass = getEnv('SMTP_PASS').replace(/\s+/g, '');
  const from = getEnv('SMTP_FROM');
  const businessTo = getEnv('SMTP_TO');

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  try {
    await transporter.verify();
  } catch (verifyError: unknown) {
    const msg =
      verifyError instanceof Error ? verifyError.message : 'SMTP autentisering misslyckades';
    console.error('SMTP verify failed:', verifyError);
    if (/535\b/.test(msg) || /5\.7\.8/.test(msg) || /authentication failed/i.test(msg)) {
      return {
        status: 500,
        body: {
          error: 'Ogiltiga SMTP-uppgifter. Kontrollera SMTP_USER/SMTP_PASS, host och port.'
        }
      };
    }
    return { status: 500, body: { error: `SMTP-fel: ${msg}` } };
  }

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

  return { status: 200, body: { ok: true } };
}
