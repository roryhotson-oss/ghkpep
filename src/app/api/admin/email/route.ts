import { NextRequest, NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/admin-store';
import { getCommerceOrders } from '@/lib/commerce-store';
import { validateEmail } from '@/lib/validation';
import { checkAdmin } from '@/lib/admin-auth';
import { getEmailClient, getFromAddress, sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resend = getEmailClient();
    const body = await request.json();
    const { to, subject, html, recipients } = body;

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Set SMTP_USER and SMTP_PASSWORD environment variables.' },
        { status: 503 }
      );
    }

    // Determine recipients
    let recipientList: string[] = [];

    if (recipients === 'all-subscribers') {
      const subscribers = getSubscribers();
      recipientList = subscribers.map(s => s.email);
    } else if (recipients === 'all-customers') {
      const orders = await getCommerceOrders();
      recipientList = [...new Set(orders.map(order => order.customerEmail).filter(Boolean))];
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
          await sendEmail(resend, {
            from: getFromAddress(),
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
  const orders = await getCommerceOrders();
  const customers = [...new Map(orders.filter(order => order.customerEmail).map(order => [order.customerEmail, {
    email: order.customerEmail,
    name: order.customerName,
  }])).values()];
  return NextResponse.json({ subscribers, customers });
}
