import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkAdmin } from '@/lib/admin-auth';

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

    const extensionByType: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
    };
    if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) {
      return NextResponse.json({ error: 'Invalid image slug' }, { status: 400 });
    }
    const ext = extensionByType[file.type];
    const filename = slug ? `${slug}.${ext}` : `upload-${Date.now()}.${ext}`;
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(imagesDir, filename);
    if (path.dirname(filePath) !== imagesDir) {
      return NextResponse.json({ error: 'Invalid upload path' }, { status: 400 });
    }

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
