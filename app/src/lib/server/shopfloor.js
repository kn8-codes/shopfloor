import { supabase, supabaseEnabled } from '$lib/supabase';
import { getProfileBundle, getRequestById } from '$lib/data/sample';

/** @param {string} message */
function loadError(message) {
  return {
    error: message,
    demo: false
  };
}

/** @param {string} handle */
export async function loadShopCard(handle) {
  if (!supabaseEnabled || !supabase) {
    const sample = getProfileBundle(handle);
    return sample ? { ...sample, demo: true } : { profile: null, demo: true };
  }

  const { data: profile, error } = await supabase
    .from('shop_cards')
    .select('*')
    .eq('handle', handle)
    .maybeSingle();

  if (error) {
    return loadError('Could not load this shop card from live data.');
  }

  if (!profile) {
    return { profile: null, demo: false };
  }

  const { data: fieldNotes, error: fieldNotesError } = await supabase
    .from('field_notes')
    .select('*')
    .eq('author_id', profile.id)
    .order('created_at', { ascending: false });

  if (fieldNotesError) {
    return loadError('Could not load this shop card field notes from live data.');
  }

  return {
    profile: {
      ...profile,
      needs: []
    },
    tools: [],
    fieldNotes: fieldNotes ?? [],
    demo: false
  };
}

/** @param {string} id */
export async function loadRequestDetail(id) {
  if (!supabaseEnabled || !supabase) {
    const request = getRequestById(id);
    return request ? { request: { ...request, demo: true }, demo: true } : { request: null, demo: true };
  }

  const { data: request, error } = await supabase
    .from('help_requests_with_author')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    return {
      request: null,
      demo: false,
      error: 'Could not load this request from live data.'
    };
  }

  if (!request) {
    return { request: null, demo: false };
  }

  return {
    request: {
      ...request,
      author: {
        handle: request.author_handle,
        display_name: request.author_display_name,
        neighborhood: request.author_neighborhood
      },
      created_at_label: 'live record',
      responses: [],
      demo: false
    },
    demo: false
  };
}
