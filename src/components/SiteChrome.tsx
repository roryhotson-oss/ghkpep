'use client';

import { usePathname } from 'next/navigation';
import AgeGate from './AgeGate';
import Header from './Header';
import Footer from './Footer';

export default function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <>
      <AgeGate />
      <Header />
    </>
  );
}
