import { supabase, supabaseEnabled } from '$lib/supabase';
import { getProfileBundle, getRequestById, getRequestsForFeed } from '$lib/data/sample';

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

  const { data: timeHistory } = await supabase
    .from('time_ledger_entries_with_people')
    .select('*')
    .or(`requester_id.eq.${profile.id},helper_id.eq.${profile.id}`)
    .order('created_at', { ascending: false });

  const normalizedTimeHistory = (timeHistory ?? []).map((entry) => ({
    ...entry,
    hours: Number(entry.hours),
    role: entry.helper_id === profile.id ? 'helped' : 'received',
    requester: {
      handle: entry.requester_handle,
      display_name: entry.requester_display_name
    },
    helper: {
      handle: entry.helper_handle,
      display_name: entry.helper_display_name
    }
  }));

  const timeSummary = normalizedTimeHistory.reduce(
    (summary, entry) => {
      if (entry.helper_id === profile.id) {
        summary.hoursHelped += entry.hours;
      }
      if (entry.requester_id === profile.id) {
        summary.hoursReceived += entry.hours;
      }
      return summary;
    },
    { hoursHelped: 0, hoursReceived: 0 }
  );

  return {
    profile: {
      ...profile,
      needs: []
    },
    tools: [],
    fieldNotes: fieldNotes ?? [],
    timeSummary,
    timeHistory: normalizedTimeHistory
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

  const { data: responses } = await supabase
    .from('request_responses_with_author')
    .select('*')
    .eq('request_id', id)
    .order('created_at', { ascending: true });

  const { data: ledgerEntries } = await supabase
    .from('time_ledger_entries_with_people')
    .select('*')
    .eq('request_id', id)
    .order('created_at', { ascending: true });

  return {
    ...request,
    author: {
      handle: request.author_handle,
      display_name: request.author_display_name,
      neighborhood: request.author_neighborhood
    },
    created_at_label: 'live record',
    responses: (responses ?? []).map((response) => ({
      ...response,
      author: {
        handle: response.author_handle,
        display_name: response.author_display_name,
        neighborhood: response.author_neighborhood
      }
    })),
    ledgerEntries: (ledgerEntries ?? []).map((entry) => ({
      ...entry,
      requester: {
        handle: entry.requester_handle,
        display_name: entry.requester_display_name
      },
      helper: {
        handle: entry.helper_handle,
        display_name: entry.helper_display_name
      }
    }))
  };
}

export async function loadFeedRequests() {
  if (!supabaseEnabled || !supabase) {
    return getRequestsForFeed();
  }

  const { data: requests, error } = await supabase
    .from('help_requests_with_author')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !requests) {
    return getRequestsForFeed();
  }

  return requests.map((request) => ({
    ...request,
    body: request.description,
    created_at_label: request.created_at ? new Date(request.created_at).toLocaleDateString() : 'live record',
    author: {
      handle: request.author_handle,
      display_name: request.author_display_name,
      neighborhood: request.author_neighborhood
    }
  }));
}
