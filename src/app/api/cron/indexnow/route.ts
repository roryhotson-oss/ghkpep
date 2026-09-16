import { NextRequest, NextResponse } from 'next/server';
import { getCommerceProducts } from '@/lib/commerce-store';

const INDEXNOW_KEY = 'ea81966f5ba61c64eaaef82ff6b84461';
const BASE_URL = 'https://www.ghkpep.com';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
];

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await getCommerceProducts();
  const staticPaths = [
    '',
    '/shop',
    '/coa',
    '/testing',
    '/quality',
    '/subscriptions',
    '/about',
    '/contact',
    '/shipping',
    '/returns',
    '/terms',
    '/privacy',
    '/news',
    '/blog',
  ];
  const urlList = [
    ...staticPaths.map((p) => `${BASE_URL}${p}`),
    ...products.map((p) => `${BASE_URL}/shop/${p.slug}`),
  ];

  const payload = {
    host: 'www.ghkpep.com',
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const results: Record<string, number> = {};
  let anyOk = false;
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });
      results[endpoint] = res.status;
      if (res.status >= 200 && res.status < 300) anyOk = true;
    } catch (err) {
      console.error('IndexNow submission failed for', endpoint, err);
      results[endpoint] = 0;
    }
  }

  return NextResponse.json({
    ok: anyOk,
    submitted: urlList.length,
    results,
  });
}
