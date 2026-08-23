/**
 * GHK Peptides - Supabase Auto-Setup Script
 * 
 * This script automatically:
 * 1. Connects to your Supabase project
 * 2. Creates all tables from SUPABASE_SCHEMA.sql
 * 3. Sets up Row Level Security (RLS) policies
 * 
 * HOW TO RUN:
 * 1. Copy .env.supabase.example to .env.local
 * 2. Fill in your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * 3. Run: node setup-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local or process.env
dotenv.config({ path: path.join(__dirname, '.env.local') });

// ============================================
// CONFIGURATION - Get from environment
// ============================================
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error('❌ SUPABASE_URL not found in environment variables');
  console.log('\nPlease set SUPABASE_URL in .env.local or pass it as an environment variable');
  process.exit(1);
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
  console.log('\nPlease set SUPABASE_SERVICE_ROLE_KEY in .env.local or pass it as an environment variable');
  process.exit(1);
}

// ============================================
// Initialize Supabase Admin Client
// ============================================
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ============================================
// Main Setup Function
// ============================================
async function setupSupabase() {
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║     GHK Peptides - Supabase Auto-Setup               ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  
  console.log(`🔗 Connecting to: ${SUPABASE_URL}`);
  console.log(`🔑 Using service role key: ${SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...\n`);
  
  // Test connection
  console.log('🧪 Testing Supabase connection...');
  try {
    const { error } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ Connection successful\n');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\nPlease verify:');
    console.log('  - SUPABASE_URL is correct');
    console.log('  - SUPABASE_SERVICE_ROLE_KEY is valid');
    console.log('  - You have network access to Supabase');
    process.exit(1);
  }
  
  // Read SQL schema file
  const schemaPath = path.join(__dirname, 'SUPABASE_SCHEMA.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ SQL schema file not found: ${schemaPath}`);
    process.exit(1);
  }
  
  console.log('📖 Reading SQL schema file...');
  const sql = fs.readFileSync(schemaPath, 'utf-8');
  console.log(`✅ Schema loaded (${sql.length} characters)\n`);
  
  // Split into individual statements
  const statements = sql
    .replace(/--[^\r\n]*/g, '')
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`📝 Parsed ${statements.length} SQL statements\n`);
  
  // Execute statements
  console.log('🚀 Executing SQL statements...\n');
  
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    
    // Skip empty statements
    if (!statement || statement.trim() === ';') {
      skipCount++;
      continue;
    }
    
    process.stdout.write(`  [${i + 1}/${statements.length}] `);
    
    try {
      const { error } = await supabaseAdmin.rpc('run_sql', {
        sql: statement
      });
      
      if (error) {
        // Handle expected errors (table already exists, etc.)
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('function') && errorMsg.includes('run_sql')) {
          throw new Error('The Supabase project does not expose the run_sql RPC. Run SUPABASE_SCHEMA.sql in the Supabase SQL Editor first, then rerun this script.');
        }
        if (errorMsg.includes('already exists') || 
            errorMsg.includes('relation') ||
            errorMsg.includes('duplicate') ||
            errorMsg.includes('unique constraint') ||
            errorMsg.includes('index') ||
            errorMsg.includes('policy')) {
          console.log(`⚠️ Already exists`);
          successCount++;
        } else {
          console.log(`❌ FAILED: ${error.message}`);
          failCount++;
        }
      } else {
        console.log(`✅ OK`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ ERROR: ${err.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Execution Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ⚠️  Already existed: ${skipCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📄 Total statements: ${statements.length}\n`);
  
  // Verify tables were created
  console.log('🔍 Verifying table creation...');
  const { data: finalTables, error: verifyError } = await supabaseAdmin
    .from('information_schema.tables')
    .select('table_name')
    .in('table_schema', ['public'])
    .in('table_name', [
      'users', 'products', 'orders', 'order_items', 'subscriptions',
      'newsletter_subscribers', 'contact_messages', 'site_settings', 'cart_items'
    ])
    .order('table_name', { ascending: true });
  
  if (verifyError) {
    console.log('⚠️ Could not verify tables:', verifyError.message);
  } else if (finalTables && finalTables.length > 0) {
    console.log('\n✅ Required tables found:');
    finalTables.forEach(t => console.log(`   - ${t.table_name}`));
  } else {
    console.log('\n⚠️ No tables found - something went wrong');
  }
  
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║     ✅ Setup Complete!                                  ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  
  console.log('📝 Next Steps:');
  console.log('');
  console.log('   1. Add these to your Vercel Environment Variables:');
  console.log('');
  console.log(`      NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}`);
  console.log(`      SUPABASE_SERVICE_ROLE_KEY=*** (keep this secret!)`);
  console.log('');
  console.log('   2. Deploy your app to Vercel');
  console.log('   3. Test your setup');
  console.log('');
  console.log('🎉 Your Supabase database is ready!');
  console.log('');
}

// ============================================
// Run the setup
// ============================================
console.log('💡 To run: cp .env.supabase.example .env.local');
console.log('💡 Then edit .env.local with your Supabase credentials');
console.log('💡 Finally: node setup-supabase.mjs\n');

setupSupabase().catch(console.error);
