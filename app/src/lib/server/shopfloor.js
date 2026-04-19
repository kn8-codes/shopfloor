import { supabase, supabaseEnabled } from '$lib/supabase';
import { getProfileBundle, getRequestById } from '$lib/data/sample';

/** @param {string} handle */
export async function loadShopCard(handle) {
  if (!supabaseEnabled || !supabase) {
    return getProfileBundle(handle);
  }

  const { data: profile, error } = await supabase
    .from('shop_cards')
    .select('*')
    .eq('handle', handle)
    .maybeSingle();

  if (error || !profile) {
    return getProfileBundle(handle);
  }

  const { data: fieldNotes } = await supabase
    .from('field_notes')
    .select('*')
    .eq('author_id', profile.id)
    .order('created_at', { ascending: false });

  return {
    profile: {
      ...profile,
      needs: []
    },
    tools: [],
    fieldNotes: fieldNotes ?? []
  };
}

/** @param {string} id */
export async function loadRequestDetail(id) {
  if (!supabaseEnabled || !supabase) {
    return getRequestById(id);
  }

  const { data: request, error } = await supabase
    .from('help_requests_with_author')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !request) {
    return getRequestById(id);
  }

  return {
    ...request,
    author: {
      handle: request.author_handle,
      display_name: request.author_display_name,
      neighborhood: request.author_neighborhood
    },
    created_at_label: 'live record',
    responses: []
  };
}
