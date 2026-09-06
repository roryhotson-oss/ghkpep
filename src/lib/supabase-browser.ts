import { createBrowserClient } from '@supabase/ssr';

let client: ReturnType<typeof createBrowserClient> | null = null;

/** Placeholder values shipped in the sample env would otherwise cause slow DNS failures on every request. */
function isPlaceholder(value: string) {
  return /your-project|your_project|example\.supabase|changeme|<.*>/i.test(value);
}

export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (isPlaceholder(url) || isPlaceholder(anonKey)) return null;
  client ??= createBrowserClient(url, anonKey);
  return client;
}
