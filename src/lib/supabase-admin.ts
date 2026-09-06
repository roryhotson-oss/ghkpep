import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/** Placeholder values shipped in the sample env would otherwise cause slow DNS failures on every request. */
function isPlaceholder(value: string) {
  return /your-project|your_project|example\.supabase|changeme|<.*>/i.test(value);
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;
  if (isPlaceholder(url) || isPlaceholder(serviceRoleKey)) return null;
  client ??= createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}
