<script>
  let { data } = $props();
</script>

<svelte:head><title>ShopFloor — {data.helper?.display ?? 'Shop card'}</title></svelte:head>

{#if data.helper}
  <div class="page">
    <a class="back" href="/feed">← Back to feed</a>
    <div class="card">
      <h1>{data.helper.display}</h1>
      <p class="muted">{data.helper.neighborhood} • {data.helper.helpStyle}</p>
      <div class="stats">
        <span>{data.helper.completed} completed helps</span>
        <span>{data.helper.fieldNotes} field notes</span>
      </div>
      <h2>Skills</h2>
      <div class="chips">{#each data.helper.skills as skill}<span>{skill}</span>{/each}</div>
      <h2>Tools</h2>
      <div class="chips">{#each data.helper.tools as tool}<span>{tool}</span>{/each}</div>
      <h2>Needs help with</h2>
      <p class="muted">{data.helper.needs}</p>
    </div>
  </div>
{:else}
  <div class="page"><p>Shop card not found.</p></div>
{/if}

<style>
  :global(body){margin:0;font-family:Inter,system-ui,sans-serif;background:#0d0f12;color:#ece7dc}.page{max-width:900px;margin:0 auto;padding:24px}.back{color:#9da7b3;text-decoration:none;display:inline-block;margin-bottom:16px}
  .card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.stats,.chips{display:flex;flex-wrap:wrap;gap:10px}.stats span,.chips span{padding:8px 11px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}
  h1{margin-bottom:10px}h2{margin-top:22px}.muted,p{color:#9da7b3;line-height:1.6}
</style>
