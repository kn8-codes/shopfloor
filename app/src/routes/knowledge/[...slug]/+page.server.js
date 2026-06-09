import { error } from '@sveltejs/kit';
import { getKnowledgeEntry } from '$lib/content/kb';

/** @param {{ params: { slug: string } }} event */
export function load(event) {
  const slug = event.params.slug;
  const entry = getKnowledgeEntry(slug);

  if (!entry) {
    error(404, 'Knowledge base entry not found');
  }

  return { entry };
}
