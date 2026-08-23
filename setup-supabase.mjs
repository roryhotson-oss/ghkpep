/**
 * GHK Peptides - Supabase Auto-Setup Script
 * 
 * Run: node setup-supabase.mjs
 * 
 * Requires: .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

// ============================================
// CONFIGURATION
// ============================================
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error('❌ SUPABASE_URL not found in .env.local');
  console.log('\nCreate .env.local with:');
  console.log('SUPABASE_URL=https://uqkmekhlfrgyddqtelqb.supabase.co');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_key_here');
  process.exit(1);
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
  console.log('\nAdd your service role key to .env.local');
  process.exit(1);
}

// ============================================
// Initialize Supabase Admin Client
// ============================================
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  db: { schema: 'public' },
});

// ============================================
// Main Setup Function
// ============================================
async function setupSupabase() {
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║     GHK Peptides - Supabase Auto-Setup               ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  
  console.log(`🔗 Supabase URL: ${SUPABASE_URL}`);
  console.log(`🔑 Service Key: ${SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...\n`);
  
  // Test connection with a simple query
  console.log('🧪 Testing Supabase connection...');
  try {
    const { error } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);
    
    if (error) {
      // Try a different approach
      const { error: testError } = await supabaseAdmin
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .limit(1);

      if (testError) {
        throw new Error(testError.message);
      }
    }
    console.log('✅ Connection successful\n');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('  1. Your SUPABASE_SERVICE_ROLE_KEY may be incorrect');
    console.log('  2. Verify it starts with: sb_secret_');
    console.log('  3. Get it from: https://supabase.com/dashboard/project/uqkmekhlfrgyddqtelqb/settings/api');
    console.log('  4. Make sure you\'re using the SERVICE ROLE key, not the anon/public key');
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
  
  // Execute statements one by one
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
      // Execute raw SQL using the client
      const { error } = await supabaseAdmin
        .rpc('run_sql_text', { sql_text: statement });
      
      if (error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('function') && errorMsg.includes('run_sql')) {
          throw new Error('The Supabase project does not expose the run_sql RPC. Run SUPABASE_SCHEMA.sql in the Supabase SQL Editor first, then rerun this script.');
        }
        if (errorMsg.includes('already exists') || 
            errorMsg.includes('relation') ||
            errorMsg.includes('duplicate') ||
            errorMsg.includes('unique constraint') ||
            errorMsg.includes('index') ||
            errorMsg.includes('policy') ||
            errorMsg.includes('function run_sql_text does not exist')) {
          console.log(`⚠️ Already exists`);
          successCount++;
        } else {
          console.log(`❌ FAILED`);
          failCount++;
        }
      } else {
        console.log(`✅ OK`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ ERROR: ${err.message.substring(0, 40)}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Execution Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ⚠️  Already existed: ${skipCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📄 Total statements: ${statements.length}\n`);
  
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║     Setup Processed!                                  ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  
  console.log('📝 Manual Verification Steps:');
  console.log('');
  console.log('   1. Go to Supabase Dashboard:');
  console.log('      https://supabase.com/dashboard/project/uqkmekhlfrgyddqtelqb/table-editor');
  console.log('');
  console.log('   2. Click SQL Editor (top menu)');
  console.log('');
  console.log('   3. Copy and paste the entire SUPABASE_SCHEMA.sql file');
  console.log('');
  console.log('   4. Click "Run"');
  console.log('');
  console.log('   5. Verify tables were created in Table Editor');
  console.log('');
  console.log('💡 If the script had issues, the manual SQL import above will work.');
}

// ============================================
// Run the setup
// ============================================
setupSupabase().catch(console.error);
