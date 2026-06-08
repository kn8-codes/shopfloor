import { loadFeedRequests } from '$lib/server/shopfloor';

export async function load() {
  return { requests: await loadFeedRequests() };
}
