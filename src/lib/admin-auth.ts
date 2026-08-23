import { createHmac, timingSafeEqual, randomBytes, scryptSync } from 'crypto';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000;

function configured(): boolean {
  return Boolean(ADMIN_EMAIL && SESSION_SECRET);
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
  if (!configured() || !ADMIN_PASSWORD) return null;
  return { email: ADMIN_EMAIL as string, password: ADMIN_PASSWORD };
}

async function getStoredPasswordHash(): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'adminPasswordHash').maybeSingle();
  return typeof data?.value === 'string' && data.value ? data.value : null;
}

function matchesHash(password: string, stored: string): boolean {
  const [, salt, expectedHash] = stored.split(':');
  if (!salt || !expectedHash) return false;
  const actualHash = scryptSync(password, salt, 64).toString('hex');
  const actual = Buffer.from(actualHash, 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!configured()) return false;
  const storedHash = await getStoredPasswordHash();
  if (storedHash) return matchesHash(password, storedHash);
  if (!ADMIN_PASSWORD) return false;
  const actual = Buffer.from(password);
  const expected = Buffer.from(ADMIN_PASSWORD);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function changeAdminPassword(password: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Supabase is not configured');
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  const { error } = await supabase.from('site_settings').upsert({ key: 'adminPasswordHash', value: `scrypt:${salt}:${hash}` }, { onConflict: 'key' });
  if (error) throw error;
}
