import { loadShopCard } from '$lib/server/shopfloor';

export async function load({ params }) {
  return (await loadShopCard(params.handle)) ?? { profile: null, tools: [], fieldNotes: [] };
}
