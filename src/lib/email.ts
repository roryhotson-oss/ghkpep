import { Resend } from 'resend';

const DEFAULT_FROM_EMAIL = 'sales@ghkpep.com';
const DEFAULT_FROM_NAME = 'GHK Peptides';

export function getEmailClient() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

export function getFromAddress(name = process.env.RESEND_FROM_NAME || DEFAULT_FROM_NAME) {
  const email = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  return `${name} <${email}>`;
}

export async function sendEmail(
  resend: Resend,
  options: Parameters<Resend['emails']['send']>[0]
) {
  const result = await resend.emails.send(options);

  if (result.error) {
    throw new Error(result.error.message || 'Email provider rejected the message');
  }

  return result.data;
}