<script>
  import { field_notes, getProfileById } from '$lib/data/sample';
  import FieldNoteCard from '$lib/components/FieldNoteCard.svelte';

  const notes = field_notes.map((note) => ({ ...note, author: getProfileById(note.author_id) })).filter((note) => note.author);
</script>

<svelte:head><title>ShopFloor — Field notes</title></svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Field notes</div>
      <h1>Keep the fix. Don’t lose it in the group chat.</h1>
      <p>Field notes are the public proof that something useful happened. In this direction, resolved requests should produce one before they close.</p>
    </div>
  </div>
  <div class="stack">
    {#each notes as note}
      <div>
        <FieldNoteCard {note} />
        <p class="author">By <a href={`/shop/${note.author?.handle ?? ''}`}>@{note.author?.handle ?? 'unknown'}</a></p>
      </div>
    {/each}
  </div>
</div>

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
  .eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.stack{display:grid;gap:16px}p{color:#9da7b3;line-height:1.6}.author{margin:8px 6px 0}.author a{color:#9da7b3}
</style>
