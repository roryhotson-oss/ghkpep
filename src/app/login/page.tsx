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

        <div className="bg-[#141414] rounded-xl p-8 border border-[#2b3538]">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button type="button" onClick={() => handleOAuth('google')} disabled={loading} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition disabled:opacity-50">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <button type="button" onClick={() => handleOAuth('apple')} disabled={loading} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white font-medium rounded-lg border border-[#333] hover:bg-[#1a1a1a] transition disabled:opacity-50">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2b3538]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#141414] text-[#a7b0b2]">or</span>
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
                className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
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
                className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
                placeholder="Password"
                minLength={8}
                required
              />
            </div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-[#8298aa] text-black font-bold rounded-lg hover:bg-[#657c8f] transition text-lg mb-4"
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
