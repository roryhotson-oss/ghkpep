import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateToken, getAdminCredentials, verifyToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const credentials = getAdminCredentials();
    if (credentials && email === credentials.email && password === credentials.password) {
      const token = generateToken(email);
      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({
        success: true,
        user: { email, role: 'admin' },
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session');

  if (token && verifyToken(token.value)) {
    const credentials = getAdminCredentials();
    return NextResponse.json({ authenticated: true, email: credentials?.email });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
