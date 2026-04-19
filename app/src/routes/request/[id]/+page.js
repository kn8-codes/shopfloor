import { loadRequestDetail } from '$lib/server/shopfloor';

export async function load({ params }) {
  return { request: await loadRequestDetail(params.id) };
}
