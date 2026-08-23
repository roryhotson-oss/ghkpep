import { getSupabaseAdmin } from '@/lib/supabase-admin';

export interface PaymentSettings {
  paypalUrl: string;
  alipayUrl: string;
  alipayQrUrl: string;
  cryptoUrl: string;
  bankTransferUrl: string;
  wiseUrl: string;
  revolutDetails: string;
  coinbaseUrl: string;
  bitcoinAddress: string;
  ethereumAddress: string;
  usdtAddress: string;
}

const fallbackSettings: PaymentSettings = {
  paypalUrl: process.env.NEXT_PUBLIC_PAYPAL_URL || '',
  alipayUrl: process.env.NEXT_PUBLIC_ALIPAY_URL || '/contact',
  alipayQrUrl: process.env.NEXT_PUBLIC_ALIPAY_QR_URL || '',
  cryptoUrl: process.env.NEXT_PUBLIC_CRYPTO_PAYMENT_URL || '/contact',
  bankTransferUrl: process.env.NEXT_PUBLIC_BANK_TRANSFER_URL || '/contact',
  wiseUrl: process.env.NEXT_PUBLIC_WISE_URL || '/contact',
  revolutDetails: process.env.NEXT_PUBLIC_REVOLUT_DETAILS || '',
  coinbaseUrl: process.env.NEXT_PUBLIC_COINBASE_URL || '',
  bitcoinAddress: '',
  ethereumAddress: '',
  usdtAddress: '',
};

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallbackSettings;

  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', Object.keys(fallbackSettings));
  if (error || !data) return fallbackSettings;

  return data.reduce((settings, item) => ({ ...settings, [item.key]: item.value }), fallbackSettings);
}

export async function savePaymentSettings(settings: Partial<PaymentSettings>): Promise<PaymentSettings> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Supabase is not configured');

  const rows = Object.entries(settings).map(([key, value]) => ({ key, value: String(value).trim() }));
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
  if (error) throw error;
  return getPaymentSettings();
}
