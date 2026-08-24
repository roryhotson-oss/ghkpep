'use client';

import { usePathname } from 'next/navigation';
import AgeGate from './AgeGate';
import Header from './Header';

export default function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin || process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'false') return null;

  return (
    <>
      <AgeGate />
      <Header />
    </>
  );
}
