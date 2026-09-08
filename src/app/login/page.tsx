'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [useEmailCode, setUseEmailCode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadSession = async () => {
      const supabase = getSupabaseBrowser();
      if (!supabase) return;
      const sessionResult = await supabase.auth.getSession();
      const userEmail = sessionResult.data.session?.user.email;
      if (userEmail) {
        localStorage.setItem('user', JSON.stringify({ email: userEmail, name: userEmail.split('@')[0] }));
        router.push('/dashboard');
      }
    };
    void loadSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      const name = email.split('@')[0];
      localStorage.setItem('user', JSON.stringify({ email, name }));
      setLoading(false);
      router.push('/dashboard');
      return;
    }

    if (resetMode) {
      const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
      setLoading(false);
      setStatus(result.error ? result.error.message : 'Check your email for a password reset link.');
      return;
    }
    const result = isRegistering
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/login` } })
      : useEmailCode
      ? await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/login` } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (result.error) {
      setStatus(result.error.message);
      return;
    }
    if (useEmailCode) {
      setStatus('Check your email for a secure sign-in link.');
      return;
    }
    if (isRegistering && !result.data.session) {
      setStatus('Check your email to confirm your new account.');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    router.push('/dashboard');
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setStatus('Social sign-in is unavailable in preview. Use email instead.');
      return;
    }
    setLoading(true);
    const result = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}/login` } });
    if (result.error) {
      setStatus(result.error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Welcome</h1>
          <p className="text-[#e1e7e5] text-lg mb-2">{resetMode ? 'Reset your password' : isRegistering ? 'Create your account' : 'Sign in or create account'}</p>
          <p className="text-[#a7b0b2] text-sm">One account for shopping and the partner program.</p>
        </div>

        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-8 border-4 border-[#FBFAF7] shadow-md">
          {/* Quick Contact */}
          <div className="space-y-3 mb-6">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '447538373481'}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#20bd5a] transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contact us on WhatsApp
            </a>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@ghkpep.com'}`}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#111d2c] text-white font-medium rounded-lg border border-[#FBFAF7]/70 hover:bg-[#16283c] transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email Support
            </a>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#FBFAF7]/70"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-[#e6edf3] bg-[#0c1622] text-[#a7b0b2]">or</span>
            </div>
          </div>

          {/* Email Login */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-[#a7b0b2] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
                placeholder="researcher@lab.com"
                required
              />
            </div>
              {!useEmailCode && !resetMode && <div className="mb-4">
              <label className="block text-sm text-[#a7b0b2] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
                placeholder="Password"
                minLength={8}
                required
              />
            </div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-lg hover:bg-[#16283c] transition text-lg mb-4"
            >
              {loading ? 'Please wait...' : resetMode ? 'Email me a reset link' : isRegistering ? 'Create account' : useEmailCode ? 'Email me a sign-in link' : 'Sign in with Email'}
            </button>

            {!resetMode && <button
              type="button"
              onClick={() => setUseEmailCode(!useEmailCode)}
              className="w-full text-[#8298aa] text-sm hover:underline"
            >
              {useEmailCode ? 'Use password instead' : 'Email me a sign-in code'}
            </button>}
            {!resetMode && !useEmailCode && <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="w-full mt-3 text-[#8298aa] text-sm hover:underline">{isRegistering ? 'Already have an account? Sign in' : 'New customer? Create an account'}</button>}
            {!resetMode && !isRegistering && !useEmailCode && <button type="button" onClick={() => setResetMode(true)} className="w-full mt-3 text-[#a7b0b2] text-xs hover:text-[#8298aa]">Forgot password?</button>}
            {resetMode && <button type="button" onClick={() => setResetMode(false)} className="w-full mt-3 text-[#8298aa] text-sm hover:underline">Back to sign in</button>}
          </form>
          {status && <p className="mt-4 text-center text-sm text-[#a7b0b2]" role="status">{status}</p>}
        </div>

        <div className="mt-6 text-center text-xs text-[#7b898e]">
          <p>
            By continuing you agree to our{' '}
            <Link href="/terms" className="text-[#8298aa] hover:underline">Terms</Link>,{' '}
            <Link href="/privacy" className="text-[#8298aa] hover:underline">Privacy</Link> and{' '}
            <Link href="/about" className="text-[#8298aa] hover:underline">Research Use Disclaimer</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
