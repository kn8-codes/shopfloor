import { supabase, supabaseEnabled } from '$lib/supabase';
import {
  field_notes,
  getLocalSupportOptionsForRequest,
  getProfileBundle,
  getProfileById,
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

function sampleFieldNoteCreationResult() {
  return {
    requestOptions: getRequestsForFeed()
      .filter((request) => ['in_progress', 'resolved'].includes(request.status))
      .map((request) => ({
        id: request.id,
        title: request.title,
        status: request.status,
        neighborhood: request.neighborhood,
        author_handle: getProfileById(request.author_id)?.handle ?? 'unknown',
        demo: true
      })),
    demo: true
  };
}

function sampleFieldNotesResult() {
  return {
    notes: field_notes
      .map((note) => ({ ...note, author: getProfileById(note.author_id), demo: true }))
      .filter((note) => note.author),
    demo: true
  };
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

export async function loadFieldNotes() {
  if (!supabaseEnabled || !supabase) {
    return sampleFieldNotesResult();
  }

  const { data: notes, error } = await supabase
    .from('field_notes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return {
      ...sampleFieldNotesResult(),
      warning: 'Could not load live field notes, so this page is showing sample alpha data.'
    };
  }

  const authorIds = [...new Set((notes ?? []).map((note) => note.author_id).filter(Boolean))];
  let authorsById = new Map();

  if (authorIds.length > 0) {
    const { data: authors, error: authorsError } = await supabase
      .from('shop_cards')
      .select('id, handle, display_name, neighborhood')
      .in('id', authorIds);

    if (!authorsError) {
      authorsById = new Map((authors ?? []).map((author) => [author.id, author]));
    }
  }

  return {
    notes: (notes ?? []).map((note) => ({
      ...note,
      author: authorsById.get(note.author_id) ?? null,
      demo: false
    })),
    demo: false
  };
}

export async function loadFieldNoteCreationContext() {
  if (!supabaseEnabled || !supabase) {
    return sampleFieldNoteCreationResult();
  }

  const { data: requests, error } = await supabase
    .from('help_requests_with_author')
    .select('id, title, status, neighborhood, author_handle')
    .eq('safe_to_share', true)
    .in('status', ['in_progress', 'resolved'])
    .order('updated_at', { ascending: false })
    .limit(20);

  if (error) {
    return {
      ...sampleFieldNoteCreationResult(),
      warning: 'Could not load live helped/resolved requests, so this form is showing sample request options.'
    };
  }

  return {
    requestOptions: requests ?? [],
    demo: false
  };
}
