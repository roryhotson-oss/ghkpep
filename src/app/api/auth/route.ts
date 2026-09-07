import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/lib/validation';
import { getEmailClient, getFromAddress, sendEmail } from '@/lib/email';

// Simple in-memory storage for demo (use database in production)
const loginCodes = new Map<string, { code: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const resend = getEmailClient();

    // Check if SMTP is configured
    if (!resend) {
      console.error('SMTP is not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { email, action } = body;

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid || !emailValidation.sanitized) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    if (action === 'send-code') {
      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Store code
      loginCodes.set(emailValidation.sanitized, { code, expires });

      // Send email with code
      await sendEmail(resend, {
        from: getFromAddress(),
        to: [emailValidation.sanitized],
        subject: 'Your GHK Peptides Sign-In Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8298aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
            </div>
            <h2 style="color: #333; text-align: center;">Your Sign-In Code</h2>
            <p style="color: #7b898e; text-align: center;">Use this code to sign in to your GHK Peptides account:</p>
            <div style="background: #f5f5f5; padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center;">
              <div style="font-size: 48px; font-weight: bold; color: #8298aa; letter-spacing: 8px; font-family: monospace;">
                ${code}
              </div>
            </div>
            <p style="color: #7b898e; text-align: center; font-size: 14px;">
              This code expires in 10 minutes.<br/>
              If you didn't request this code, you can safely ignore this email.
            </p>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
              <p>This is an automated email from GHK Peptides.</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: 'Code sent' });
    }

    if (action === 'verify-code') {
      const { code } = body;

      if (!code || typeof code !== 'string') {
        return NextResponse.json({ error: 'Code is required' }, { status: 400 });
      }

      // Validate code format (6 digits)
      if (!/^\d{6}$/.test(code)) {
        return NextResponse.json({ error: 'Invalid code format' }, { status: 400 });
      }

      const stored = loginCodes.get(emailValidation.sanitized);
      
      if (!stored) {
        return NextResponse.json(
          { error: 'No code found. Please request a new one.' },
          { status: 400 }
        );
      }

      if (Date.now() > stored.expires) {
        loginCodes.delete(emailValidation.sanitized);
        return NextResponse.json(
          { error: 'Code expired. Please request a new one.' },
          { status: 400 }
        );
      }

      if (stored.code !== code) {
        return NextResponse.json(
          { error: 'Invalid code' },
          { status: 400 }
        );
      }

      // Code is valid - remove it and return success
      loginCodes.delete(emailValidation.sanitized);

      return NextResponse.json({ 
        success: true, 
        user: { 
          email: emailValidation.sanitized, 
          name: emailValidation.sanitized.split('@')[0],
          createdAt: new Date().toISOString()
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Please try again later.' },
      { status: 500 }
    );
  }
}
