'use client';

import { usePathname } from 'next/navigation';
import AgeGate from './AgeGate';
import CookieBanner from './CookieBanner';
import Header from './Header';

export default function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'false') {
    return <CookieBanner />;
  }

  return (
    <>
      <AgeGate />
      <Header />
    </>
  );
}
