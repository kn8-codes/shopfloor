import { loadFieldNoteCreationContext } from '$lib/server/shopfloor';

export async function load() {
  return await loadFieldNoteCreationContext();
}
