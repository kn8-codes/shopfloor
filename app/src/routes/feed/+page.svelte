<script>
  import { getRequestsForFeed } from '$lib/data/sample';
  import RequestCard from '$lib/components/RequestCard.svelte';

  const requests = getRequestsForFeed();
</script>

<svelte:head><title>ShopFloor — Neighborhood feed</title></svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Neighborhood feed</div>
      <h1>Nearby problems first.</h1>
      <p>ShopFloor starts with local practical help. Feed order should eventually privilege neighborhood closeness over generic engagement noise.</p>
      <p><a class='inline-link' href='/new-request'>Post a new request</a></p>
    </div>
  </div>

  <div class="grid">
    {#each requests as request}
      <RequestCard {request} />
    {/each}
  </div>
</div>

<style>
  .page{max-width:1100px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
  .eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{margin:10px 0 12px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}p{color:#9da7b3;max-width:60ch;line-height:1.6}
  .inline-link{color:#f59e0b;text-decoration:none;font-weight:700}
  @media (max-width:900px){.grid{grid-template-columns:1fr}.header{flex-direction:column}}
</style>
