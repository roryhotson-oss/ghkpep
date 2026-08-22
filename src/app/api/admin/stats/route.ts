import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getStats } from '@/lib/admin-store';

const SESSION_SECRET = process.env.SESSION_SECRET || 'ghk-peptides-admin-secret-key-2024';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ghkpep.com';

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const email = parts[0];
    const timestamp = parseInt(parts[1]);
    const secret = parts.slice(2).join(':');
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) return false;
    if (secret !== SESSION_SECRET) return false;
    if (email !== ADMIN_EMAIL) return false;
    return true;
  } catch {
    return false;
  }
}

async function checkAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session');
  return !!token && verifyToken(token.value);
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = getStats();
  return NextResponse.json(stats);
}
