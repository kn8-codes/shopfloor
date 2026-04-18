<script>
  let { data } = $props();
</script>

<svelte:head><title>ShopFloor — {data.request?.title ?? 'Request'}</title></svelte:head>

{#if data.request}
  <div class="page">
    <a class="back" href="/feed">← Back to feed</a>
    <div class="card">
      <div class="meta">
        <span>{data.request.category}</span>
        <span>{data.request.neighborhood}</span>
        <span class:urgent={data.request.urgency === 'Urgent'}>{data.request.urgency}</span>
      </div>
      <h1>{data.request.title}</h1>
      <p class="sub">Posted by {data.request.author} • {data.request.postedAgo}</p>
      <p>{data.request.body}</p>
      <p class="muted">Budget / barter note: {data.request.budget}</p>
    </div>
  </div>
{:else}
  <div class="page"><p>Request not found.</p></div>
{/if}

<style>
  :global(body){margin:0;font-family:Inter,system-ui,sans-serif;background:#0d0f12;color:#ece7dc}.page{max-width:900px;margin:0 auto;padding:24px}.back{color:#9da7b3;text-decoration:none;display:inline-block;margin-bottom:16px}
  .card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.meta{display:flex;flex-wrap:wrap;gap:8px}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.urgent{background:#fbbf24 !important;color:#111 !important;border-color:transparent !important;font-weight:700}
  h1{margin:14px 0}.sub,.muted,p{color:#9da7b3;line-height:1.6}
</style>
