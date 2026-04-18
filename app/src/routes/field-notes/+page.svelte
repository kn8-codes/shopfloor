<script>
  import { fieldNotes } from '$lib/data/sample';
</script>

<svelte:head><title>ShopFloor — Field notes</title></svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Field notes</div>
      <h1>Keep the fix. Don’t lose it in the group chat.</h1>
    </div>
    <a class="btn" href="/">Home</a>
  </div>
  <div class="stack">
    {#each fieldNotes as note}
      <article class="card">
        <div class="meta">
          <span>{note.category}</span>
          <span>{note.neighborhood}</span>
          <span>{note.safety}</span>
          <span>{note.cost}</span>
        </div>
        <h2>{note.title}</h2>
        <p>{note.body}</p>
        <p class="muted">Time: {note.time}</p>
      </article>
    {/each}
  </div>
</div>

<style>
  :global(body){margin:0;font-family:Inter,system-ui,sans-serif;background:#0d0f12;color:#ece7dc}.page{max-width:980px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
  .eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.btn{text-decoration:none;padding:12px 14px;border-radius:12px;background:#f59e0b;color:#111;font-weight:700}
  .stack{display:grid;gap:16px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-left:3px solid #34d399;border-radius:18px;padding:20px}.meta{display:flex;flex-wrap:wrap;gap:8px}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}
  p,.muted{color:#9da7b3;line-height:1.6}
  @media (max-width:900px){.header{flex-direction:column}}
</style>
