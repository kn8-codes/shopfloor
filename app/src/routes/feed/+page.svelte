<script>
  import { requests } from '$lib/data/sample';
  import RequestCard from '$lib/components/RequestCard.svelte';
</script>

<svelte:head><title>ShopFloor — Neighborhood feed</title></svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Neighborhood feed</div>
      <h1>Real asks from around the city.</h1>
      <p>Not content. Not engagement bait. Just what broke, who needs help, and who might know what to do.</p>
    </div>
    <a class="btn" href="/">Home</a>
  </div>

  <div class="grid">
    {#each requests as request}
      <RequestCard {request} />
    {/each}
  </div>
</div>

<style>
  :global(body){margin:0;font-family:Inter,system-ui,sans-serif;background:#0d0f12;color:#ece7dc}
  .page{max-width:1100px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
  .eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.btn{text-decoration:none;padding:12px 14px;border-radius:12px;background:#f59e0b;color:#111;font-weight:700}
  h1{margin:10px 0 12px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}p{color:#9da7b3;max-width:60ch}
  @media (max-width:900px){.grid{grid-template-columns:1fr}.header{flex-direction:column}}
</style>
