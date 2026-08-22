import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateEmail } from '@/lib/validation';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { email } = body;

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid || !emailValidation.sanitized) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    // TODO: Store email in database (Supabase/Prisma)
    // For now, we'll just send a welcome email

    // Send welcome email
    await resend.emails.send({
      from: 'GHK Peptides <onboarding@resend.dev>',
      to: [emailValidation.sanitized],
      subject: 'Welcome to GHK Peptides - Research Updates',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00d4aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
            <p style="color: #666; margin-top: 10px;">Premium Research Peptides</p>
          </div>
          <h2 style="color: #333;">Welcome to GHK Peptides!</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for subscribing to our research updates. You'll now receive:
          </p>
          <ul style="color: #666; padding-left: 20px; line-height: 1.8;">
            <li>New product announcements</li>
            <li>Certificates of Analysis for new batches</li>
            <li>Quality documentation updates</li>
            <li>Exclusive offers for subscribers</li>
          </ul>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <p style="margin: 0 0 15px 0; color: #333; font-weight: bold;">While you're here:</p>
            <a href="https://ghkpep.com/shop" style="display: inline-block; background: #00d4aa; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Browse Our Catalog</a>
          </div>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
            <p>You're receiving this email because you subscribed to GHK Peptides updates.</p>
            <p>To unsubscribe, reply with "UNSUBSCRIBE" in the subject.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
