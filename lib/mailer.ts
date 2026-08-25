import nodemailer from 'nodemailer';

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

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const from = process.env.SMTP_FROM || (user ? `Refreshing <${user}>` : '');
  const businessTo = process.env.SMTP_TO || 'alinbarla@hotmail.com';

  if (!host || !user || !pass || !from) {
    return {
      status: 500,
      body: { error: 'E-postservern saknar SMTP-uppgifter. Lägg till SMTP_HOST, SMTP_USER, SMTP_PASS och SMTP_FROM i Vercel.' }
    };
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

  return { status: 200, body: { ok: true } };
}
