import { loadRequestDetail } from '$lib/server/shopfloor';

export async function load({ params }) {
  return await loadRequestDetail(params.id);
}
