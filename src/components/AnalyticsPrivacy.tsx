'use client';

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';

export default function AnalyticsPrivacy() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        const consent = localStorage.getItem('ghk-cookie-consent');
        if (!consent || (consent !== 'all' && !consent.startsWith('custom:analytics=true'))) {
          return null;
        }
        const url = new URL(event.url);
        url.search = '';
        if (/\/(admin|api|private)(\/|$)/.test(url.pathname)) {
          return null;
        }
        return { ...event, url: url.toString() };
      }}
    />
  );
}
