import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

const allowedTypes: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Payment proof image is required' }, { status: 400 });
    }

    const extension = allowedTypes[file.type];
    if (!extension) {
      return NextResponse.json({ error: 'Only PNG, JPEG, and WebP images are allowed' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Payment proof must be 5MB or smaller' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const filename = `${crypto.randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    if (supabase) {
      await supabase.storage.createBucket('payment-proofs', { public: false }).catch(() => undefined);
      const { error } = await supabase.storage.from('payment-proofs').upload(filename, buffer, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data: signedFile, error: signedUrlError } = await supabase.storage.from('payment-proofs').createSignedUrl(filename, 60 * 60 * 24 * 7);
      if (signedUrlError || !signedFile?.signedUrl) throw signedUrlError || new Error('Could not create proof URL');
      return NextResponse.json({ url: signedFile.signedUrl, storagePath: filename });
    }

    const directory = path.join(process.cwd(), 'public', 'payment-proofs');
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, filename), buffer);

    return NextResponse.json({ url: `/payment-proofs/${filename}` });
  } catch (error) {
    console.error('Payment proof upload error:', error);
    return NextResponse.json({ error: 'Could not upload payment proof' }, { status: 500 });
  }
}