import { getKnowledgeGroups } from '$lib/content/kb';

export function load() {
  return {
    groups: getKnowledgeGroups()
  };
}
