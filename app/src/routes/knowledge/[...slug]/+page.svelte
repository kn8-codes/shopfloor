<script>
  let { data } = $props();
</script>

<svelte:head><title>ShopFloor — {data.entry.meta.title}</title></svelte:head>

<div class="page">
  <a class="back" href="/knowledge">← Back to knowledge base</a>

  <article class="card">
    <div class="meta">
      <span>{data.entry.meta.type}</span>
      <span>{data.entry.meta.status}</span>
      {#if data.entry.meta.updated}
        <span>Updated {data.entry.meta.updated}</span>
      {/if}
    </div>
    <h1>{data.entry.meta.title}</h1>
    <p class="summary">{data.entry.meta.summary}</p>

    <div class="body">
      {@html data.entry.html}
    </div>

    {#if data.entry.meta.related.length}
      <aside class="related">
        <h2>Related entries</h2>
        <ul>
          {#each data.entry.meta.related as slug}
            <li><a href={`/knowledge/${slug}`}>{slug}</a></li>
          {/each}
        </ul>
      </aside>
    {/if}
  </article>
</div>

<style>
  .page{max-width:900px;margin:0 auto;padding:24px}.back{color:#9da7b3;text-decoration:none;display:inline-block;margin-bottom:16px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:24px}.meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.meta span{color:#9da7b3;border:1px solid #2a313d;border-radius:999px;padding:4px 8px;font-size:12px}h1{font-size:42px;line-height:1.05;margin:8px 0 12px}.summary{font-size:18px;color:#c8d0da}.body{color:#ece7dc;line-height:1.65}.body :global(h1){font-size:32px;margin-top:28px}.body :global(h2){font-size:24px;margin-top:28px}.body :global(p),.body :global(li){color:#b5bfca}.body :global(a){color:#f59e0b}.body :global(code){background:#0d0f12;border:1px solid #2a313d;border-radius:6px;padding:1px 4px}.related{border-top:1px solid #2a313d;margin-top:28px;padding-top:18px}.related h2{font-size:20px}.related a{color:#f59e0b}
</style>
