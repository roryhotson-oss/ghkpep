import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });

  const { data, error } = await supabase
    .from('contact_messages')
    .select('id, name, email, institution, subject, message, status, created_at')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  return NextResponse.json({ messages: data });
}

export async function PATCH(request: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });

  const body = await request.json();
  const statuses = ['new', 'read', 'responded'];
  if (typeof body.id !== 'string' || !statuses.includes(body.status)) {
    return NextResponse.json({ error: 'Valid message id and status are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .update({ status: body.status })
    .eq('id', body.id)
    .select('id, status')
    .single();
  if (error) return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  return NextResponse.json({ message: data });
}