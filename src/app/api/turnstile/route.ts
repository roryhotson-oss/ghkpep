import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const rawSecret = process.env.TURNSTILE_SECRET_KEY;
  const secret = rawSecret?.includes('your-cloudflare-turnstile-secret-key')
    ? (process.env.NODE_ENV !== 'production' ? '1x0000000000000000000000000000000AA' : undefined)
    : rawSecret;
  if (!secret) return NextResponse.json({ error: 'Cloudflare verification is not configured' }, { status: 503 });

  try {
    const { token } = await request.json();
    if (typeof token !== 'string' || !token) return NextResponse.json({ error: 'Cloudflare verification is required' }, { status: 400 });
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: request.headers.get('x-forwarded-for') || '' }),
    });
    const result = await response.json();
    return NextResponse.json({ success: result.success === true }, { status: result.success === true ? 200 : 400 });
  } catch {
    return NextResponse.json({ error: 'Cloudflare verification failed' }, { status: 500 });
  }
}