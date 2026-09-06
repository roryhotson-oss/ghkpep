'use client';

import { useState } from 'react';

export default function AdminSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');

  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Saving...');
    const response = await fetch('/api/admin/security', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    const data = await response.json();
    setStatus(response.ok ? 'Admin password changed successfully.' : (data.error || 'Password change failed.'));
    if (response.ok) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return <div className="p-6 lg:p-8 max-w-2xl">
    <div className="mb-8"><h1 className="text-3xl font-bold text-white mb-2">Security</h1><p className="text-[#a7b0b2]">Change the admin password without exposing it to the browser or storing it as plain text.</p></div>
    <form onSubmit={changePassword} className="text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-xl p-6 space-y-4">
      <div><label className="block text-sm text-white font-medium mb-2">Current password</label><input required type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-white text-sm" /></div>
      <div><label className="block text-sm text-white font-medium mb-2">New password</label><input required minLength={12} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-white text-sm" /><p className="text-[#7b898e] text-xs mt-2">Use at least 12 characters.</p></div>
      <div><label className="block text-sm text-white font-medium mb-2">Confirm new password</label><input required minLength={12} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-white text-sm" /></div>
      <div className="flex items-center gap-4"><button type="submit" className="px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-lg">Change Password</button>{status && <span className="text-sm text-[#a7b0b2]">{status}</span>}</div>
    </form>
  </div>;
}