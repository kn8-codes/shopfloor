import { getRequestById } from '$lib/data/sample';

export function load({ params }) {
  return { request: getRequestById(params.id) };
}
