import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/** Placeholder values shipped in the sample env would otherwise cause slow DNS failures on every request. */
function isPlaceholder(value: string) {
  return /your-project|your_project|example\.supabase|changeme|<.*>/i.test(value);
}

/** Abort any request that takes longer than this, so the site falls back to local data fast. */
const SUPABASE_TIMEOUT_MS = 3000;

function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;
  if (isPlaceholder(url) || isPlaceholder(serviceRoleKey)) return null;
  client ??= createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: fetchWithTimeout },
  });
  return client;
}
