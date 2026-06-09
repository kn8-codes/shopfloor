<script>
  let { data } = $props();

  /** @type {Record<string, string>} */
  const labels = {
    tool: 'Tools',
    guide: 'Guides',
    concept: 'Concepts'
  };
</script>

<svelte:head><title>ShopFloor — Knowledge base</title></svelte:head>

<div class="page">
  <div class="intro card">
    <div class="eyebrow">Knowledge base</div>
    <h1>Useful things should not vanish into the group chat.</h1>
    <p>
      The ShopFloor knowledge base is a starter library of tools, repair triage, safety rules, and practical lessons. Field notes are what happened. Knowledge base entries are what we learned.
    </p>
  </div>

  {#each Object.entries(data.groups) as [type, entries]}
    <section class="section">
      <div class="section-head">
        <h2>{labels[type] ?? type}</h2>
        <span>{entries.length} entries</span>
      </div>
      <div class="grid">
        {#each entries as entry}
          <a class="card entry" href={`/knowledge/${entry.slug}`}>
            <div class="entry-top">
              <span class="type">{entry.meta.type}</span>
              <span class="status">{entry.meta.status}</span>
            </div>
            <h3>{entry.meta.title}</h3>
            <p>{entry.meta.summary}</p>
            {#if entry.meta.tags.length}
              <div class="tags">
                {#each entry.meta.tags as tag}
                  <span>{tag}</span>
                {/each}
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  .page{max-width:1040px;margin:0 auto;padding:24px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.intro{margin-bottom:28px}.eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{font-size:42px;line-height:1.05;margin:10px 0 14px}h2{margin:0}p{color:#9da7b3;line-height:1.6}.section{margin:28px 0}.section-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;color:#9da7b3}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.entry{text-decoration:none;color:#ece7dc;display:flex;flex-direction:column;gap:10px}.entry:hover{border-color:#f59e0b}.entry h3{margin:0;font-size:22px}.entry p{margin:0}.entry-top{display:flex;justify-content:space-between;gap:12px}.type,.status,.tags span{color:#9da7b3;border:1px solid #2a313d;border-radius:999px;padding:4px 8px;font-size:12px}.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
</style>
