import nodemailer, { type Transporter } from 'nodemailer';

// Email is delivered via Fasthosts (livemail.co.uk) SMTP. The authenticated
// mailbox (SMTP_USER) must be allowed to send as the From address, so the
// default From is the mailbox itself unless SMTP_FROM_EMAIL overrides it.
const DEFAULT_FROM_EMAIL = 'sales@ghkpep.com';
const DEFAULT_FROM_NAME = 'GHK Peptides';
const DEFAULT_SMTP_HOST = 'smtp.livemail.co.uk';

export interface EmailMessage {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export function getEmailClient(): Transporter | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || DEFAULT_SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user, pass },
    // Fail fast instead of hanging a serverless function on a stalled connection.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export function getFromAddress(name = process.env.SMTP_FROM_NAME || DEFAULT_FROM_NAME) {
  const email = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || DEFAULT_FROM_EMAIL;
  return `${name} <${email}>`;
}

export async function sendEmail(transporter: Transporter, options: EmailMessage) {
  return transporter.sendMail(options);
}
