import { getProfileBundle } from '$lib/data/sample';

export function load({ params }) {
  return getProfileBundle(params.handle) ?? { profile: null, tools: [], fieldNotes: [] };
}
