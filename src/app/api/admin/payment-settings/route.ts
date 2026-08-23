import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { getPaymentSettings, savePaymentSettings, type PaymentSettings } from '@/lib/payment-settings';

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ settings: await getPaymentSettings() });
}

export async function PUT(request: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json() as Partial<PaymentSettings>;
  const allowedKeys: (keyof PaymentSettings)[] = [
    'paypalUrl', 'alipayUrl', 'alipayQrUrl', 'cryptoUrl', 'bankTransferUrl', 'wiseUrl', 'revolutDetails',
    'coinbaseUrl', 'bitcoinAddress', 'ethereumAddress', 'usdtAddress',
  ];
  const updates = Object.fromEntries(allowedKeys.filter((key) => typeof body[key] === 'string').map((key) => [key, body[key]]));
  try {
    return NextResponse.json({ settings: await savePaymentSettings(updates) });
  } catch (error) {
    console.error('Failed to save payment settings:', error);
    return NextResponse.json({ error: 'Supabase is not configured or settings could not be saved' }, { status: 503 });
  }
}