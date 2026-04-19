import { writable } from 'svelte/store';
import { supabase, supabaseEnabled } from '$lib/supabase';

/**
 * @typedef {{
 *   ready: boolean,
 *   enabled: boolean,
 *   session: import('@supabase/supabase-js').Session | null,
 *   user: import('@supabase/supabase-js').User | null
 * }} AuthSnapshot
 */

/** @type {AuthSnapshot} */
const initialAuthState = {
  ready: false,
  enabled: supabaseEnabled,
  session: null,
  user: null
};

export const authState = writable(initialAuthState);

export async function initAuth() {
  if (!supabaseEnabled || !supabase) {
    authState.set({ ready: true, enabled: false, session: null, user: null });
    return () => {};
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();

  authState.set({ ready: true, enabled: true, session, user: session?.user ?? null });

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange((_event, nextSession) => {
    authState.set({
      ready: true,
      enabled: true,
      session: nextSession,
      user: nextSession?.user ?? null
    });
  });

  return () => subscription.unsubscribe();
}

/** @param {string} email */
export async function sendMagicLink(email) {
  if (!supabaseEnabled || !supabase) {
    return { error: new Error('Supabase is not configured yet.') };
  }

  const redirectTo = `${window.location.origin}/login`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo
    }
  });

  return { error };
}

export async function signOut() {
  if (!supabaseEnabled || !supabase) return;
  await supabase.auth.signOut();
}
