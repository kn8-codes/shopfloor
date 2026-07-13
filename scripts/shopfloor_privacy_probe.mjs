#!/usr/bin/env node
/**
 * ShopFloor privacy probe.
 *
 * Usage, from repo root after explicit live-verification approval:
 *   PUBLIC_SUPABASE_URL=... PUBLIC_SUPABASE_ANON_KEY=... node scripts/shopfloor_privacy_probe.mjs --confirm-live
 *
 * Default behavior refuses to touch live Supabase. This prevents accidental use when env vars are
 * already exported in the shell.
 *
 * Read-only live mode:
 *   node scripts/shopfloor_privacy_probe.mjs --confirm-live
 *
 * Write-denial live mode, after explicit approval:
 *   node scripts/shopfloor_privacy_probe.mjs --confirm-live --include-write-denial
 *
 * Reads PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY from the process env.
 * Does not print secret values.
 */

import { createRequire } from 'node:module';

const requireFromApp = createRequire(new URL('../app/package.json', import.meta.url));
const { createClient } = requireFromApp('@supabase/supabase-js');

const args = new Set(process.argv.slice(2));
const confirmLive = args.has('--confirm-live');
const includeWriteDenial = args.has('--include-write-denial');
const help = args.has('--help') || args.has('-h');

if (help) {
  console.log(`ShopFloor privacy probe\n\nUsage:\n  node scripts/shopfloor_privacy_probe.mjs --confirm-live [--include-write-denial]\n\nDefault:\n  Refuse to touch live Supabase unless --confirm-live is passed.\n\nOptions:\n  --confirm-live          Required for any Supabase network probe.\n  --include-write-denial  Also attempt anon inserts that should be denied by RLS. Requires explicit live verification approval.\n\nEnvironment:\n  PUBLIC_SUPABASE_URL\n  PUBLIC_SUPABASE_ANON_KEY\n\nSecrets are never printed.`);
  process.exit(0);
}

const knownArgs = new Set(['--confirm-live', '--include-write-denial']);
const unknownArgs = [...args].filter((arg) => !knownArgs.has(arg));
if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(', ')}`);
  process.exit(2);
}

if (!confirmLive) {
  console.error('Refusing live Supabase probe: pass --confirm-live after explicit approval.');
  process.exit(2);
}

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

function errorSummary(error) {
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object') {
    return [error.code, error.message, error.details, error.hint].filter(Boolean).join(' | ') || JSON.stringify(error);
  }
  return String(error);
}

async function record(name, mode, fn) {
  try {
    const result = await fn();
    checks.push({ name, mode, ok: true, ...result });
  } catch (error) {
    checks.push({
      name,
      mode,
      ok: false,
      error: errorSummary(error)
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

await record('anon can count visible shop_cards', 'read-only', () => headCount('shop_cards'));
await record('anon can count safe help_requests', 'read-only', () => headCount('help_requests'));
await record('anon can count help_requests_with_author', 'read-only', () =>
  headCount('help_requests_with_author')
);
await record('anon can count public field_notes', 'read-only', () => headCount('field_notes'));

if (includeWriteDenial) {
  await record('anon insert shop_cards denied', 'write-denial', () =>
    expectInsertDenied('shop_cards', {
      id: '00000000-0000-0000-0000-000000000001',
      handle: 'anon_probe_should_fail',
      display_name: 'Anon Probe',
      neighborhood: 'Akron',
      bio: 'This insert should be denied by RLS.',
      skills: []
    })
  );

  await record('anon insert help_requests denied', 'write-denial', () =>
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

  await record('anon insert field_notes denied', 'write-denial', () =>
    expectInsertDenied('field_notes', {
      author_id: '00000000-0000-0000-0000-000000000001',
      title: 'Anon note should fail',
      problem: 'This field note insert should be denied by RLS.',
      fix: 'This field note insert should never become persistent data.',
      safety_level: 'temporary'
    })
  );
}

console.log(
  JSON.stringify(
    {
      ok: checks.every((check) => check.ok),
      checked_at: new Date().toISOString(),
      mode: includeWriteDenial ? 'read-only-plus-write-denial' : 'read-only',
      write_denial_checks_included: includeWriteDenial,
      secrets_printed: false,
      checks
    },
    null,
    2
  )
);

if (!checks.every((check) => check.ok)) {
  process.exit(1);
}
