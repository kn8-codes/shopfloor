<script>
  import FieldNoteCard from '$lib/components/FieldNoteCard.svelte';

  let { data } = $props();
  const notes = $derived(data.notes ?? []);
</script>

<svelte:head><title>ShopFloor — Field notes</title></svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Field notes</div>
      <h1>Keep the fix. Don’t lose it in the group chat.</h1>
      <p>
        Field notes preserve what worked after useful help happens: the problem, the fix, the limits,
        and the neighbor-level lesson. They are not ratings, content bait, or a scoreboard.
      </p>
    </div>
    <a class="secondary" href="/field-notes/new">Write a field note</a>
  </div>

  {#if data.demo}
    <div class="notice warn">Showing sample field notes until live Supabase data is configured and approved.</div>
  {:else if data.warning}
    <div class="notice warn">{data.warning}</div>
  {/if}

  {#if notes.length === 0}
    <div class="empty">
      <h2>No field notes yet.</h2>
      <p>The first useful proof should come after a helped or resolved request, not from performative posting.</p>
      <a class="secondary" href="/field-notes/new">Draft the first field note</a>
    </div>
  {:else}
    <div class="stack">
      {#each notes as note}
        <div id={note.id}>
          <FieldNoteCard {note} />
          <p class="author">By <a href={`/shop/${note.author?.handle ?? ''}`}>@{note.author?.handle ?? 'unknown'}</a></p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
  .eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.stack{display:grid;gap:16px}.secondary{color:#f59e0b;text-decoration:none;font-weight:800;padding-top:8px}p{color:#9da7b3;line-height:1.6}.author{margin:8px 6px 0}.author a{color:#9da7b3}.notice,.empty{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px;margin-bottom:18px;color:#9da7b3}.warn{color:#f5c96a}.empty h2{margin-top:0}@media (max-width:800px){.header{display:block}.secondary{display:inline-block;margin-top:8px}}
</style>
