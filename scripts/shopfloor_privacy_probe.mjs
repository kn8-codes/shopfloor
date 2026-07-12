#!/usr/bin/env node
/**
 * ShopFloor privacy probe.
 *
 * Usage, from repo root after explicit live-verification approval:
 *   node scripts/shopfloor_privacy_probe.mjs
 *
 * Reads PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY from the process env.
 * Does not print secret values.
 */

import { createClient } from '@supabase/supabase-js';

const required = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY'];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing required env: ${missing.join(', ')}`);
  process.exit(2);
}

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

const checks = [];

async function record(name, fn) {
  try {
    const result = await fn();
    checks.push({ name, ok: true, ...result });
  } catch (error) {
    checks.push({
      name,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

async function headCount(table) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  if (error) throw error;
  return { count };
}

async function expectInsertDenied(table, payload) {
  const { error } = await supabase.from(table).insert(payload).select('id').single();
  if (!error) {
    throw new Error(`anon insert unexpectedly succeeded for ${table}`);
  }
  return { denied: true, code: error.code ?? null, message: error.message };
}

await record('anon can count visible shop_cards', () => headCount('shop_cards'));
await record('anon can count safe help_requests', () => headCount('help_requests'));
await record('anon can count help_requests_with_author', () => headCount('help_requests_with_author'));
await record('anon can count public field_notes', () => headCount('field_notes'));

await record('anon insert shop_cards denied', () =>
  expectInsertDenied('shop_cards', {
    id: '00000000-0000-0000-0000-000000000001',
    handle: 'anon_probe_should_fail',
    display_name: 'Anon Probe',
    neighborhood: 'Akron',
    bio: 'This insert should be denied by RLS.',
    skills: []
  })
);

await record('anon insert help_requests denied', () =>
  expectInsertDenied('help_requests', {
    author_id: '00000000-0000-0000-0000-000000000001',
    title: 'Anon request should fail',
    description: 'This insert should be denied by RLS before it becomes data.',
    category: 'other',
    neighborhood: 'Akron',
    urgency: 'normal',
    safe_to_share: true
  })
);

await record('anon insert field_notes denied', () =>
  expectInsertDenied('field_notes', {
    author_id: '00000000-0000-0000-0000-000000000001',
    title: 'Anon note should fail',
    problem: 'This field note insert should be denied by RLS.',
    fix: 'This field note insert should never become persistent data.',
    safety_level: 'temporary'
  })
);

console.log(JSON.stringify({
  ok: checks.every((check) => check.ok),
  checked_at: new Date().toISOString(),
  checks
}, null, 2));

if (!checks.every((check) => check.ok)) {
  process.exit(1);
}
