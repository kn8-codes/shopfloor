# ShopFloor Knowledge Base Implementation

Status: Sprint 1 implementation guide  
Created: 2026-06-09  
Owner: Nate / Egon  
Audience: any agent working on ShopFloor KB

## Purpose

The ShopFloor knowledge base is the first reusable public knowledge layer for the alpha.

It should make ShopFloor useful even before the social/request network is dense. A visitor should be able to learn what a tool is, how to think about a repair safely, when to stop, and what practical next step makes sense.

Core principle:

> Field notes are what happened. Knowledge base entries are what we learned.

## Sprint 1 decision

Start with a curated, file-backed Markdown knowledge base rendered by SvelteKit.

Do **not** start with Supabase-backed KB tables.
Do **not** build a CMS yet.
Do **not** accept user-generated KB entries yet.

Reason:

- Markdown is fast to ship.
- Nate and agents can edit it directly.
- Git diffs make review easy.
- Content remains durable even if app/database shape changes.
- The schema can mature before becoming database state.

Future path:

- Markdown source now.
- Optional generated index/search later.
- Optional Supabase index later after structure proves itself.

## Alpha connection

The KB connects to ShopFloor alpha in four ways:

1. **Immediate utility** — even with few requests, the site can teach useful practical basics.
2. **Trust** — public, careful, safety-first guides show ShopFloor is not a random gig-board.
3. **Request support** — request pages can link to relevant guides and tool definitions.
4. **Content flywheel** — field notes and repair experiences can become curated KB entries after review.

Examples:

- A no-charge phone request can link to `No-charge first checks`, `USB-C receptacle`, and `Multimeter`.
- A data recovery question can link to `Data retrieval triage` and `Privacy-first handling`.
- A tool lending post can link to `Heat gun` or `Multimeter` so beginners know what they are asking for.

## Information architecture

Use wiki-style Markdown files organized by type.

Recommended source root:

```text
app/src/lib/content/kb/
```

Recommended directories:

```text
app/src/lib/content/kb/
  tools/
    multimeter.md
    usb-c-receptacle.md
    heat-gun.md
  guides/
    usb-c-port-failure.md
    data-retrieval-triage.md
    no-charge-first-checks.md
  concepts/
    privacy-first-handling.md
    stop-conditions.md
  templates/
    kb-entry-template.md
```

Published routes:

```text
/knowledge
/knowledge/[slug]
```

Slug rule:

- Slug is directory plus filename without `.md`, unless frontmatter overrides later.
- Example: `tools/multimeter.md` becomes `/knowledge/tools/multimeter`.
- Example: `guides/data-retrieval-triage.md` becomes `/knowledge/guides/data-retrieval-triage`.

## Entry types

### Tool entry

Defines a thing.

Examples:

- Multimeter
- USB-C receptacle
- Heat gun
- Spudger
- Soldering iron

Tool entries answer:

- What is it?
- What is it used for?
- What does a beginner need to know?
- What can go wrong?
- When should someone stop?

### Guide entry

Explains a practical path.

Examples:

- USB-C port failure
- Data retrieval triage
- No-charge first checks
- How to document a repair request

Guide entries answer:

- What problem does this help with?
- What should someone check first?
- What tools might be involved?
- What are the stop conditions?
- When should someone ask for experienced help?

### Concept entry

Defines a principle.

Examples:

- Privacy-first handling
- Stop conditions
- Chain of custody
- Dignity-first help

Concept entries explain why ShopFloor handles something a certain way.

## Frontmatter schema

Every KB entry must start with YAML frontmatter.

Required fields:

```yaml
---
title: Human readable title
summary: One or two sentence summary.
type: tool | guide | concept | template
status: starter | draft | reviewed | field-tested | deprecated
updated: YYYY-MM-DD
tags:
  - repair
  - tools
related:
  - tools/multimeter
  - concepts/stop-conditions
---
```

Field meanings:

- `title`: public page title.
- `summary`: appears on index cards and previews.
- `type`: controls grouping and future filtering.
- `status`: indicates maturity. Most Sprint 1 entries begin as `starter`.
- `updated`: public freshness marker.
- `tags`: simple topical terms.
- `related`: canonical slugs for related entries.

Optional future fields:

```yaml
source_artifacts:
  - /mesh/path/to/source.md
reviewed_by:
  - Nate
public_safety_notes:
  - Do not imply professional repair advice.
```

## Wiki links

Authors may use wiki links in body copy.

Syntax:

```text
[[Multimeter]]
[[USB-C receptacle]]
[[Data retrieval triage]]
[[Stop conditions]]
```

Renderer behavior for Sprint 1:

1. Convert known wiki links to KB routes.
2. Render unknown wiki links as readable plain text or a non-breaking placeholder link.
3. Do not fail the build because a wiki link target is missing.

Recommended mapping strategy:

- Build a title-to-slug map from all KB entries.
- Normalize titles by lowercasing and stripping punctuation.
- Resolve `[[Multimeter]]` to the entry whose title normalizes to `multimeter`.

If no match exists:

- Render as `<span class="missing-wiki-link">Multimeter</span>` or plain text.
- Later, missing links can become a content backlog.

## Template: tool entry

```markdown
---
title: Multimeter
summary: A multimeter is a handheld test tool for measuring voltage, resistance, and continuity.
type: tool
status: starter
updated: 2026-06-09
tags:
  - tools
  - electronics
related:
  - guides/no-charge-first-checks
  - concepts/stop-conditions
---

# Multimeter

## What it is

Plain-language definition.

## What it is used for

Common safe uses.

## Beginner-safe first use

One small thing someone can safely try.

## Safety / stop conditions

When to stop and ask for experienced help.

## Related entries

- [[No-charge first checks]]
- [[Stop conditions]]
```

## Template: guide entry

```markdown
---
title: No-charge first checks
summary: Simple first checks before assuming a device needs repair.
type: guide
status: starter
updated: 2026-06-09
tags:
  - repair
  - electronics
related:
  - tools/multimeter
  - concepts/stop-conditions
---

# No-charge first checks

## What problem this helps with

Describe the symptom.

## Quick triage

Short beginner-safe checklist.

## Tools and materials

- [[Multimeter]] if appropriate

## Safety / stop conditions

When to stop.

## What to try first

Step-by-step path.

## When to ask for experienced help

Escalation criteria.

## Related entries

- [[Multimeter]]
- [[Stop conditions]]
```

## Rendering implementation plan

Minimal implementation:

1. Add `gray-matter` for frontmatter parsing.
2. Add `marked` or a small Markdown renderer for HTML output.
3. Create `app/src/lib/content/kb.js`.
4. Use `import.meta.glob('/src/lib/content/kb/**/*.md', { query: '?raw', import: 'default', eager: true })` to load Markdown as raw text.
5. Parse frontmatter and body.
6. Build title/slug indexes.
7. Convert wiki links before Markdown rendering or after body load.
8. Expose:
   - `getKnowledgeEntries()`
   - `getKnowledgeEntry(slug)`
   - `resolveWikiLinks(markdown)`
9. Add `/knowledge/+page.server.js` and `/knowledge/+page.svelte`.
10. Add `/knowledge/[...slug]/+page.server.js` and `/knowledge/[...slug]/+page.svelte` or use `[slug]` if slugs are flat.

Prefer catch-all `[...slug]` because entries are organized by directory.

Recommended routes:

```text
app/src/routes/knowledge/+page.server.js
app/src/routes/knowledge/+page.svelte
app/src/routes/knowledge/[...slug]/+page.server.js
app/src/routes/knowledge/[...slug]/+page.svelte
```

## Styling expectations

Keep it simple.

Index page:

- page title;
- short explanation;
- grouped sections for tools, guides, concepts;
- cards with title, summary, status, tags.

Detail page:

- title;
- summary;
- status;
- rendered Markdown body;
- related entries if frontmatter includes `related`.

No heavy design pass in Sprint 1.

## Agent content workflow

Agents can fan out content safely if they follow this shape.

For each content task:

1. Write only Markdown entries.
2. Use the frontmatter schema.
3. Use cautious beginner-safe language.
4. Include stop conditions.
5. Use wiki links for terms that should become reusable definitions.
6. Do not invent professional credentials.
7. Do not promise a repair will work.
8. Do not include private person data.
9. Mark entries `status: starter` unless Nate reviewed them.
10. Write a receipt listing files created and open questions.

Good starter batches:

- tool definitions;
- repair triage guides;
- privacy/data handling concepts;
- request-writing guides;
- local support/resource definitions.

## Nate review workflow

Nate edits Markdown directly or through agent-assisted drafts.

Status progression:

```text
starter -> draft -> reviewed -> field-tested
```

Definitions:

- `starter`: agent-created placeholder, useful but not authoritative.
- `draft`: improved and shaped, still needs review.
- `reviewed`: Nate has read/approved for public alpha.
- `field-tested`: confirmed useful through real use.

## What not to build yet

Do not build these in Sprint 1 unless Nate explicitly reopens scope:

- Supabase KB tables.
- Full-text database search.
- User-submitted KB entries.
- Admin editor UI.
- Commenting.
- Ratings.
- AI-generated public advice without review.
- Personal case histories with identifiable data.

## Build/test expectations

After implementation:

```bash
cd app
npm ci
npm run check
npm run build
```

Record evidence in:

```text
docs/EVIDENCE.md
STATE.md
```

Receipt to Gatekeeper:

```text
/mesh/30_RECEIPTS/<agent>/YYYY-MM-DD__receipt__shopfloor-kb-<task>.md
```

## First useful content set

Minimum useful alpha set:

Tools:

- Multimeter
- USB-C receptacle
- Heat gun

Guides:

- USB-C port failure
- Data retrieval triage
- No-charge first checks

Concepts:

- Stop conditions
- Privacy-first handling

Template:

- KB entry template

If these exist and render, the knowledge base is useful enough to continue editing tomorrow.
