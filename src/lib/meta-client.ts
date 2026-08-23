const GRAPH_VERSION = 'v23.0';

export function getMissingMetaCredentials(): string[] {
  const required = ['META_PAGE_ID', 'META_PAGE_ACCESS_TOKEN'];
  return required.filter((name) => !process.env[name]);
}

export async function publishFacebookPost(content: string): Promise<string> {
  const missing = getMissingMetaCredentials();
  if (missing.length > 0) {
    throw new Error(`Missing Meta credentials: ${missing.join(', ')}.`);
  }

  const pageId = process.env.META_PAGE_ID as string;
  const accessToken = process.env.META_PAGE_ACCESS_TOKEN as string;
  const endpoint = `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/feed`;
  const payload = new URLSearchParams({
    message: content.slice(0, 63206),
    access_token: accessToken,
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload.toString(),
  });

  const data = await response.json() as { id?: string; error?: { message?: string; code?: number } };
  if (!response.ok || !data.id) {
    throw new Error(data.error?.message || `Meta publishing failed (${response.status})`);
  }

  return data.id;
}