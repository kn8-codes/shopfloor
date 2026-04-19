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
        <span class:urgent={data.request.urgency === 'urgent'}>{data.request.urgency}</span>
      </div>
      <h1>{data.request.title}</h1>
      <p class="sub">Posted by @{data.request.author?.handle ?? 'unknown'} • {data.request.created_at_label}</p>
      <p>{data.request.description}</p>
      <p class="muted">Budget / barter note: {data.request.budget_note}</p>
    </div>

    <div class="section card">
      <div class="minihead">Responses</div>
      {#if data.request.responses?.length}
        {#each data.request.responses as response}
          <div class="response">
            <div class="meta tight">
              <span>{response.response_type}</span>
              <span>@{response.author?.handle ?? 'unknown'}</span>
            </div>
            <p>{response.message}</p>
          </div>
        {/each}
      {:else}
        <p>No responses yet.</p>
      {/if}
    </div>

    <div class="section callout">
      <div class="minihead">Closure rule</div>
      <p>In this MVP direction, a resolved request should produce a field note before it can close. The knowledge is part of the work.</p>
    </div>
  </div>
{:else}
  <div class="page"><p>Request not found.</p></div>
{/if}

<style>
  .page{max-width:900px;margin:0 auto;padding:24px}.back{color:#9da7b3;text-decoration:none;display:inline-block;margin-bottom:16px}
  .card,.callout{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.section{margin-top:18px}.meta{display:flex;flex-wrap:wrap;gap:8px}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.urgent{background:#fbbf24 !important;color:#111 !important;border-color:transparent !important;font-weight:700}
  h1{margin:14px 0}.sub,.muted,p{color:#9da7b3;line-height:1.6}.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700;margin-bottom:12px}.response+.response{margin-top:14px;padding-top:14px;border-top:1px solid #2a313d}.tight span{font-size:12px}
</style>
