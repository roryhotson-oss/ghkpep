import { NextRequest, NextResponse } from 'next/server';
import { changeAdminPassword, checkAdmin, verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { currentPassword, newPassword, confirmPassword } = await request.json();
    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || newPassword.length < 12) {
      return NextResponse.json({ error: 'Use a new password with at least 12 characters.' }, { status: 400 });
    }
    if (newPassword !== confirmPassword) return NextResponse.json({ error: 'New passwords do not match.' }, { status: 400 });
    if (!(await verifyAdminPassword(currentPassword))) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
    await changeAdminPassword(newPassword);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin password change error:', error);
    return NextResponse.json({ error: 'Password could not be changed. Configure Supabase first.' }, { status: 503 });
  }
}