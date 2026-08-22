import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { getSubscribers } from '@/lib/admin-store';
import { validateEmail } from '@/lib/validation';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { to, subject, html, recipients } = body;

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Set RESEND_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    // Determine recipients
    let recipientList: string[] = [];

    if (recipients === 'all-subscribers') {
      const subscribers = getSubscribers();
      recipientList = subscribers.map(s => s.email);
    } else if (recipients === 'custom' && Array.isArray(to)) {
      recipientList = to.filter((email: string) => {
        const validation = validateEmail(email);
        return validation.isValid;
      });
    } else if (typeof to === 'string') {
      const validation = validateEmail(to);
      if (!validation.isValid) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      }
      recipientList = [to];
    }

    if (recipientList.length === 0) {
      return NextResponse.json({ error: 'No valid recipients' }, { status: 400 });
    }

    if (!subject || !html) {
      return NextResponse.json({ error: 'Subject and body are required' }, { status: 400 });
    }

    // Send emails (batch of 10 at a time to avoid rate limits)
    const results = { sent: 0, failed: 0, errors: [] as string[] };
    const batchSize = 10;

    for (let i = 0; i < recipientList.length; i += batchSize) {
      const batch = recipientList.slice(i, i + batchSize);
      const promises = batch.map(async (email) => {
        try {
          await resend.emails.send({
            from: 'GHK Peptides <onboarding@resend.dev>',
            to: [email],
            subject,
            html,
          });
          results.sent++;
        } catch (err) {
          results.failed++;
          results.errors.push(`Failed to send to ${email}`);
          console.error(`Email send failed for ${email}:`, err);
        }
      });
      await Promise.all(promises);
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}

// GET subscribers list
export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscribers = getSubscribers();
  return NextResponse.json({ subscribers });
}
