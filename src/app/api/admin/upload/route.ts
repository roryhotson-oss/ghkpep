import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

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
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const slug = formData.get('slug') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PNG, JPEG, WebP, SVG' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    // Generate filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const filename = slug ? `${slug}.${ext}` : `upload-${Date.now()}.${ext}`;
    const filePath = path.join(process.cwd(), 'public', 'images', filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/images/${filename}`,
      filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
