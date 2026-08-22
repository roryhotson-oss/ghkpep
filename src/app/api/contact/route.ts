import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateEmail, validateName, validateMessage, validateSubject } from '@/lib/validation';

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
    const { name, email, institution, subject, message } = body;

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

    // Get contact email from environment or use default
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'orders@ghkpep.com';

    // Send email to support
    await resend.emails.send({
      from: 'GHK Contact Form <onboarding@resend.dev>',
      to: [contactEmail],
      subject: `Contact Form: ${subjectValidation.sanitized}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4aa;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${nameValidation.sanitized}</p>
            <p><strong>Email:</strong> ${emailValidation.sanitized}</p>
            ${institution ? `<p><strong>Institution:</strong> ${institution}</p>` : ''}
            <p><strong>Subject:</strong> ${subjectValidation.sanitized}</p>
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #00d4aa;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${messageValidation.sanitized}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the GHK contact form.</p>
          </div>
        </div>
      `,
      replyTo: emailValidation.sanitized,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'GHK Peptides <onboarding@resend.dev>',
      to: [emailValidation.sanitized],
      subject: 'We received your message - GHK Peptides',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00d4aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
          </div>
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p style="color: #666; line-height: 1.6;">
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
