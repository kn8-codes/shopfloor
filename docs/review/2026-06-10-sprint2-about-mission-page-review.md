# ShopFloor Sprint 2 Review Packet — About/Mission Page

Date: 2026-06-10  
Branch: `sprint2/about-mission-page-2026-06-10`  
Owner: Egon  
Scope: public/product content only; no infrastructure, no Supabase migration, no deploy

## What changed

Added a public About/mission page:

```text
app/src/routes/about/+page.svelte
```

Wired it into navigation:

```text
app/src/lib/components/AppShell.svelte
```

Fixed the duplicate homepage CTA:

```text
app/src/routes/+page.svelte
```

Before: both hero buttons went to `/feed`.  
After: primary goes to `/feed`; secondary goes to `/about` with label `Read the mission`.

Updated project state/evidence:

```text
STATE.md
NEXT.md
docs/EVIDENCE.md
```

## Verification

Ran from `app/`:

```text
npm run check && npm run build
```

Result:

```text
svelte-check found 0 errors and 0 warnings
vite build passed
```

Route smoke:

```text
npm run preview -- --host 127.0.0.1 --port 4174
curl -sS -D - http://127.0.0.1:4174/about
```

Result:

```text
HTTP 200
<title>About ShopFloor</title>
contains: Aid is the visible action
contains: No gig-economy cosplay
```

## Copy to review tonight

The page headline:

```text
Aid is the visible action. Relationship is the infrastructure.
```

Primary framing:

```text
ShopFloor is a neighborhood repair and mutual-aid network for Akron. It starts with ordinary broken things: a dead charger, a car that will not start, a tool nobody owns alone, a form someone cannot get through, a fridge that might be one bad outlet away from the landfill.
```

Product guardrail:

```text
The point is not to make help feel like an app. The point is to make it easier for practical people nearby to find each other, solve real problems, and leave behind enough knowledge that the next person does not have to start from zero.
```

Anti-gig-economy section:

```text
ShopFloor should not recreate the same extractive mechanics that already make working people compete for crumbs: star ratings, public shame, fake productivity metrics, auction-style labor, or help that only moves if money moves first.
```

Alpha safety boundary:

```text
ShopFloor should help people act sooner without pretending every neighbor is a licensed contractor, mechanic, electrician, social worker, or data-recovery lab. Some work is simple. Some work needs a professional. Knowing the difference is part of the system.
```

Closing promise:

```text
A good ShopFloor session should end with someone helped, someone less alone, and a field note or guide that makes the next repair easier. That is the flywheel: help, trust, memory, repeat.
```

## Nate edit questions

1. Is the headline right, or too abstract for a first public About page?
2. Is “No gig-economy cosplay” acceptable public voice, or should it be softened?
3. Does the safety boundary read protective, or does it sound too cautious/legal?
4. Should this page say “Akron” heavily, or keep the door open to “neighborhood-first” generally?
5. Should `/about` be publishable after edits, or stay alpha/internal until a first community tester pass?

## Recommended next after review

If Nate likes the page:

1. Commit this branch.
2. Merge/push after approval.
3. Preview/deploy app with `/about` and `/knowledge` visible.
4. Next product slice: field-note creation path.

If Nate dislikes the voice:

1. Keep implementation.
2. Patch only text in `app/src/routes/about/+page.svelte`.
3. Re-run `npm run check`.

No database work is needed for this slice. Good. Databases can wait their turn in the cellar.
