/** @typedef {{ title: string; summary: string; type: string; status: string; updated?: string; tags: string[]; related: string[] }} KnowledgeMeta */
/** @typedef {{ slug: string; path: string; meta: KnowledgeMeta; body: string; html: string }} KnowledgeEntry */

const rawModules = import.meta.glob('/src/lib/content/kb/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/** @param {string} value */
function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** @param {string} value */
function slugify(value) {
  return normalizeTitle(value).replace(/\s+/g, '-');
}

/** @param {string} raw */
function parseScalar(raw) {
  const value = raw.trim();
  if (!value) return '';
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return value.replace(/^['"]|['"]$/g, '');
}

/** @param {unknown} value */
function toStringArray(value) {
  return Array.isArray(value) ? value.map(String) : [];
}

/** @param {string} text */
function parseFrontmatter(text) {
  if (!text.startsWith('---')) return { meta: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: text };

  const block = text.slice(3, end).trim();
  const body = text.slice(end + 4).trim();
  /** @type {Record<string, string | string[]>} */
  const meta = {};
  let currentListKey = '';

  for (const line of block.split('\n')) {
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentListKey) {
      const current = meta[currentListKey];
      meta[currentListKey] = [...toStringArray(current), listMatch[1].trim()];
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (!rawValue.trim()) {
      meta[key] = [];
      currentListKey = key;
      continue;
    }
    meta[key] = parseScalar(rawValue);
    currentListKey = '';
  }

  return { meta, body };
}

/** @param {string} value */
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {string} text */
function renderInline(text) {
  let value = escapeHtml(text);
  value = value.replace(/`([^`]+)`/g, '<code>$1</code>');
  value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return value;
}

/** @param {string} markdown */
function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let inList = false;

  function closeList() {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = trimmed.match(/^-\s+(.*)$/);
    if (bullet) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInline(trimmed)}</p>`);
  }

  closeList();
  return html.join('\n');
}

/** @type {KnowledgeEntry[]} */
const entries = Object.entries(rawModules)
  .map(([path, raw]) => {
    const relative = path.replace('/src/lib/content/kb/', '').replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(String(raw));
    const type = String(meta.type || meta.category || relative.split('/')[0] || 'guide');
    const title = String(meta.title || relative.split('/').pop() || relative);
    const summary = String(meta.summary || 'Starter ShopFloor knowledge base entry.');
    const tags = Array.isArray(meta.tags) ? meta.tags.map(String) : [];
    const related = Array.isArray(meta.related) ? meta.related.map(String) : [];
    return {
      slug: relative,
      path,
      meta: {
        title,
        summary,
        type,
        status: String(meta.status || 'starter'),
        updated: meta.updated ? String(meta.updated) : undefined,
        tags,
        related
      },
      body,
      html: ''
    };
  })
  .filter((entry) => entry.meta.type !== 'template')
  .sort((a, b) => a.meta.title.localeCompare(b.meta.title));

const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
const byTitle = new Map(entries.map((entry) => [normalizeTitle(entry.meta.title), entry]));

/** @param {string} markdown */
function resolveWikiLinks(markdown) {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_match, label) => {
    const key = normalizeTitle(String(label));
    const entry = byTitle.get(key) || bySlug.get(slugify(String(label))) || bySlug.get(String(label));
    if (!entry) return String(label);
    return `[${entry.meta.title}](/knowledge/${entry.slug})`;
  });
}

for (const entry of entries) {
  entry.html = markdownToHtml(resolveWikiLinks(entry.body));
}

export function getKnowledgeEntries() {
  return entries;
}

/** @param {string} slug */
export function getKnowledgeEntry(slug) {
  return bySlug.get(slug);
}

export function getKnowledgeGroups() {
  return entries.reduce((groups, entry) => {
    const key = entry.meta.type || 'guide';
    groups[key] = groups[key] || [];
    groups[key].push(entry);
    return groups;
  }, /** @type {Record<string, KnowledgeEntry[]>} */ ({}));
}
