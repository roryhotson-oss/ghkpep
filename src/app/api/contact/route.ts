import { NextRequest, NextResponse } from 'next/server';
import { validateEmail, validateName, validateMessage, validateSubject } from '@/lib/validation';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { getEmailClient, getFromAddress, sendEmail } from '@/lib/email';

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
    const { name, email, institution, product, quantity, subject, message, source, website } = body;

    if (source === 'maintenance' && typeof website === 'string' && website.trim()) {
      return NextResponse.json({ error: 'Unable to send message' }, { status: 400 });
    }

    const secret = process.env.TURNSTILE_SECRET_KEY?.includes('your-cloudflare-turnstile-secret-key')
      ? undefined
      : process.env.TURNSTILE_SECRET_KEY;
    const token = body.turnstileToken;
    // Turnstile is optional: when no secret is configured, skip verification instead of blocking mail.
    if (secret && (typeof token !== 'string' || !token)) {
      return NextResponse.json({ error: 'Human verification is required' }, { status: 400 });
    }
    if (secret && typeof token === 'string') {
      const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token, remoteip: request.headers.get('x-forwarded-for') || '' }),
      });
      const verification = await verificationResponse.json();
      if (verification.success !== true) {
        return NextResponse.json({ error: 'Human verification failed' }, { status: 400 });
      }
    }

    // Validate all inputs
    const nameValidation = validateName(name);
    if (!nameValidation.isValid || !nameValidation.sanitized) {
      return NextResponse.json({ error: nameValidation.error }, { status: 400 });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid || !emailValidation.sanitized) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    const subjectValidation = validateSubject(subject);
    if (!subjectValidation.isValid || !subjectValidation.sanitized) {
      return NextResponse.json({ error: subjectValidation.error }, { status: 400 });
    }

    const messageValidation = validateMessage(message);
    if (!messageValidation.isValid || !messageValidation.sanitized) {
      return NextResponse.json({ error: messageValidation.error }, { status: 400 });
    }

    const enquiryMessage = typeof product === 'string' && product
      ? `Product: ${product}\nQuantity: ${typeof quantity === 'string' && quantity ? quantity : '1'}\n\n${messageValidation.sanitized}`
      : messageValidation.sanitized;

    // Route to appropriate support email based on subject keywords
    let contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@ghkpep.com';
    const subjectLower = subjectValidation.sanitized.toLowerCase();
    const messageLower = messageValidation.sanitized.toLowerCase();
    
    if (source === 'maintenance') {
      contactEmail = process.env.NEXT_PUBLIC_SOCIAL_EMAIL || 'social@ghkpep.com';
    } else if (subjectLower.includes('order') || messageLower.includes('order') || subjectLower.includes('payment') || subjectLower.includes('shipping')) {
      contactEmail = process.env.NEXT_PUBLIC_ORDERS_EMAIL || 'orders@ghkpep.com';
    } else if (subjectLower.includes('privacy') || subjectLower.includes('data') || subjectLower.includes('gdpr')) {
      contactEmail = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || 'privacy@ghkpep.com';
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from('contact_messages').insert({
        name: nameValidation.sanitized,
        email: emailValidation.sanitized,
        institution: typeof institution === 'string' ? institution.slice(0, 255) : null,
        subject: subjectValidation.sanitized,
        message: enquiryMessage,
        status: 'new',
      });
      if (error) {
        // Non-fatal: the email below is the primary delivery path; the DB row is a convenience copy.
        console.error('Failed to save contact message:', error);
      }
    }

    // Send email to support
    await sendEmail(resend, {
      from: getFromAddress('GHK Contact Form'),
      to: [contactEmail],
      subject: `Contact Form: ${subjectValidation.sanitized}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8298aa;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${nameValidation.sanitized}</p>
            <p><strong>Email:</strong> ${emailValidation.sanitized}</p>
            ${institution ? `<p><strong>Institution:</strong> ${institution}</p>` : ''}
            <p><strong>Subject:</strong> ${subjectValidation.sanitized}</p>
            ${product ? `<p><strong>Product:</strong> ${product}</p>` : ''}
            ${quantity ? `<p><strong>Quantity:</strong> ${quantity}</p>` : ''}
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #8298aa;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${messageValidation.sanitized}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #7b898e; font-size: 12px;">
            <p>This email was sent from the GHK contact form.</p>
          </div>
        </div>
      `,
      replyTo: emailValidation.sanitized,
    });

    // Send confirmation email to the user
    await sendEmail(resend, {
      from: getFromAddress(),
      to: [emailValidation.sanitized],
      subject: 'We received your message - GHK Peptides',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8298aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
          </div>
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p style="color: #7b898e; line-height: 1.6;">
            We've received your message and our team will get back to you within 24 hours.
          </p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap; margin: 10px 0 0 0; color: #555;">${messageValidation.sanitized}</p>
          </div>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
            <p>This is an automated confirmation email.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
