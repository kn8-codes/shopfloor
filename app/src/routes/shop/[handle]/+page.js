import { helpers } from '$lib/data/sample';

export function load({ params }) {
  const helper = helpers.find((item) => item.handle === params.handle);
  return { helper };
}
