<script>
  import RequestCard from '$lib/components/RequestCard.svelte';

  /** @type {{ data: { requests?: Array<Record<string, unknown>>, demo?: boolean, error?: string } }} */
  let { data } = $props();
  const requests = $derived(data.requests ?? []);
</script>

<svelte:head><title>ShopFloor — Neighborhood feed</title></svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Neighborhood feed</div>
      <h1>Nearby problems first.</h1>
      <p>ShopFloor starts with local practical help. Feed order should eventually privilege neighborhood closeness over generic engagement noise.</p>
      <p><a class="inline-link" href="/new-request">Post a new request</a></p>
    </div>
  </div>

  {#if data.demo}
    <section class="notice" aria-label="Sample feed notice">
      <strong>Sample alpha feed.</strong>
      Supabase live data is not configured or could not be loaded here, so these cards are examples rather than live neighborhood requests. Treat them as prototype fixtures for testing the workflow, not as active calls for help.
    </section>
  {:else}
    <section class="notice live" aria-label="Live feed notice">
      <strong>Live alpha feed.</strong>
      Showing safe-to-share requests from the current ShopFloor data source.
    </section>
  {/if}

  {#if data.error}
    <section class="notice warning" aria-label="Feed loading warning">
      {data.error}
    </section>
  {/if}

  {#if requests.length}
    <div class="grid">
      {#each requests as request (request.id)}
        <RequestCard {request} />
      {/each}
    </div>
  {:else}
    <section class="empty card">
      <h2>No public requests yet.</h2>
      <p>When a safe-to-share request is posted, it will appear here.</p>
    </section>
  {/if}
</div>

<style>
  .page{max-width:1100px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
  .eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{margin:10px 0 12px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}p{color:#9da7b3;max-width:60ch;line-height:1.6}
  .inline-link{color:#f59e0b;text-decoration:none;font-weight:700}
  .notice{border:1px solid #2a313d;background:#151a21;color:#aab3bf;border-radius:14px;padding:14px 16px;margin-bottom:18px;line-height:1.5}
  .notice strong{color:#ece7dc}.notice.live{border-color:rgba(52,211,153,.45)}.notice.warning{border-color:rgba(245,158,11,.55)}
  .card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:18px}.empty h2{margin-top:0}.empty p{margin-bottom:0}
  @media (max-width:900px){.grid{grid-template-columns:1fr}.header{flex-direction:column}}
</style>
