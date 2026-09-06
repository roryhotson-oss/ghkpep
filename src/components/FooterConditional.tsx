'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterConditional() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') return null;

  return <Footer />;
}
