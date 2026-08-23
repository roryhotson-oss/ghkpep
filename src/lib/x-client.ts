import { createHmac, randomBytes } from 'crypto';

const TWEET_URL = 'https://api.x.com/2/tweets';

function percentEncode(value: string): string {
  return encodeURIComponent(value).replace(/[!*'()]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

// Builds the OAuth 1.0a "Authorization" header required by POST /2/tweets (app-only bearer tokens cannot post).
function buildOAuthHeader(method: string, url: string, credentials: { apiKey: string; apiSecret: string; accessToken: string; accessSecret: string }): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: credentials.apiKey,
    oauth_nonce: randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: credentials.accessToken,
    oauth_version: '1.0',
  };
  const baseParams = Object.entries(oauthParams).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${percentEncode(key)}=${percentEncode(value)}`).join('&');
  const signatureBase = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(baseParams)}`;
  const signingKey = `${percentEncode(credentials.apiSecret)}&${percentEncode(credentials.accessSecret)}`;
  const signature = createHmac('sha1', signingKey).update(signatureBase).digest('base64');
  const headerParams = { ...oauthParams, oauth_signature: signature };
  return 'OAuth ' + Object.entries(headerParams).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${percentEncode(key)}="${percentEncode(value)}"`).join(', ');
}

export function getMissingXCredentials(): string[] {
  const required = ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET'];
  return required.filter((name) => !process.env[name]);
}

export async function publishTweet(content: string): Promise<string> {
  const missing = getMissingXCredentials();
  if (missing.length > 0) throw new Error(`Missing X credentials: ${missing.join(', ')}. Posting to X requires a user-context OAuth 1.0a token, not an app-only bearer token.`);
  const credentials = {
    apiKey: process.env.X_API_KEY as string,
    apiSecret: process.env.X_API_SECRET as string,
    accessToken: process.env.X_ACCESS_TOKEN as string,
    accessSecret: process.env.X_ACCESS_SECRET as string,
  };
  const response = await fetch(TWEET_URL, {
    method: 'POST',
    headers: { Authorization: buildOAuthHeader('POST', TWEET_URL, credentials), 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: content.slice(0, 280) }),
  });
  const data = await response.json();
  if (!response.ok || !data.data?.id) throw new Error(data.detail || data.title || `X publishing failed (${response.status})`);
  return data.data.id as string;
}
