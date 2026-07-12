import { loadFieldNotes } from '$lib/server/shopfloor';

export async function load() {
  return await loadFieldNotes();
}
