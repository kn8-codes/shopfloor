import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseEnabled
  ? createClient(/** @type {string} */ (supabaseUrl), /** @type {string} */ (supabaseAnonKey), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

export async function getConnectionShape() {
  if (!supabaseEnabled || !supabase) {
    return {
      configured: false,
      ok: false,
      table: 'shop_cards',
      count: null,
      error: 'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY'
    };
  }

  const { count, error } = await supabase
    .from('shop_cards')
    .select('*', { count: 'exact', head: true });

  return {
    configured: true,
    ok: !error,
    table: 'shop_cards',
    count: count ?? 0,
    error: error?.message ?? null
  };
}
