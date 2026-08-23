import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000;

function configured(): boolean {
  return Boolean(ADMIN_EMAIL && ADMIN_PASSWORD && SESSION_SECRET);
}

function signature(email: string, timestamp: number): string {
  return createHmac('sha256', SESSION_SECRET as string)
    .update(`${email}:${timestamp}`)
    .digest('base64url');
}

export function generateToken(email: string): string {
  const timestamp = Date.now();
  return Buffer.from(`${email}:${timestamp}:${signature(email, timestamp)}`).toString('base64url');
}

export function verifyToken(token: string): boolean {
  if (!configured()) return false;

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [email, timestampValue, tokenSignature] = decoded.split(':');
    const timestamp = Number(timestampValue);

    if (!email || !Number.isFinite(timestamp) || !tokenSignature) return false;
    if (email !== ADMIN_EMAIL || Date.now() - timestamp < 0 || Date.now() - timestamp > SESSION_MAX_AGE) {
      return false;
    }

    const expectedSignature = signature(email, timestamp);
    const actual = Buffer.from(tokenSignature);
    const expected = Buffer.from(expectedSignature);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export async function checkAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session');
  return Boolean(token && verifyToken(token.value));
}

export function getAdminCredentials(): { email: string; password: string } | null {
  if (!configured()) return null;
  return { email: ADMIN_EMAIL as string, password: ADMIN_PASSWORD as string };
}
