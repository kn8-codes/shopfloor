import { requests } from '$lib/data/sample';

export function load({ params }) {
  const request = requests.find((item) => item.id === params.id);
  return { request };
}
