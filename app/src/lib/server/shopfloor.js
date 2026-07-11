import { supabase, supabaseEnabled } from '$lib/supabase';
import {
  getLocalSupportOptionsForRequest,
  getProfileBundle,
  getRequestById,
  getRequestsForFeed
} from '$lib/data/sample';

/** @param {string} message */
function loadError(message) {
  return {
    error: message,
    demo: false
  };
}

function sampleFeedResult() {
  return {
    requests: getRequestsForFeed().map((request) => ({
      ...request,
      body: request.description,
      demo: true
    })),
    demo: true
  };
}

/** @param {string} id */
function sampleRequestDetailResult(id) {
  const request = getRequestById(id);
  return request
    ? {
        request: { ...request, demo: true },
        localSupportOptions: getLocalSupportOptionsForRequest(request),
        demo: true
      }
    : { request: null, localSupportOptions: [], demo: true };
}

export async function loadFeedRequests() {
  if (!supabaseEnabled || !supabase) {
    return sampleFeedResult();
  }

  const { data: requests, error } = await supabase
    .from('help_requests_with_author')
    .select('*')
    .eq('safe_to_share', true)
    .in('status', ['open', 'in_progress', 'resolved'])
    .order('created_at', { ascending: false });

  if (error) {
    return {
      ...sampleFeedResult(),
      error: 'Could not load live requests, so this feed is showing sample alpha data.'
    };
  }

  return {
    requests: (requests ?? []).map((request) => ({
      ...request,
      body: request.description,
      author: {
        handle: request.author_handle,
        display_name: request.author_display_name,
        neighborhood: request.author_neighborhood
      },
      created_at_label: 'live record',
      demo: false
    })),
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
    return sampleRequestDetailResult(id);
  }

  const { data: request, error } = await supabase
    .from('help_requests_with_author')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    const sample = sampleRequestDetailResult(id);
    return sample.request
      ? {
          ...sample,
          warning: 'Could not load this request from live data, so this page is showing sample alpha data.'
        }
      : {
          request: null,
          localSupportOptions: [],
          demo: false,
          error: 'Could not load this request from live data.'
        };
  }

  if (!request) {
    return { request: null, localSupportOptions: [], demo: false };
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
    localSupportOptions: getLocalSupportOptionsForRequest(request),
    demo: false
  };
}
