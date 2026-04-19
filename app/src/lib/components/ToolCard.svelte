<script>
  let { tool } = $props();
</script>

<div class="tool-card">
  <div class="topline">
    <h3>{tool.name}</h3>
    <span class:available={tool.availability_status === 'available'} class:limited={tool.availability_status === 'limited'} class:unavailable={tool.availability_status === 'unavailable'}>{tool.availability_status}</span>
  </div>
  <p>{tool.description}</p>
  <div class="chips">
    <span>{tool.category}</span>
    <span>{tool.condition}</span>
    <span>{tool.lendable ? 'lendable' : 'not lendable'}</span>
  </div>
  {#if tool.notes}
    <p class="note">{tool.notes}</p>
  {/if}
</div>

<style>
  .tool-card{background:#161a20;border:1px solid #2a313d;border-radius:16px;padding:16px}.topline{display:flex;justify-content:space-between;gap:12px;align-items:center}h3{margin:0;color:#ece7dc;font-size:17px}
  p{color:#9da7b3;line-height:1.5}.chips{display:flex;flex-wrap:wrap;gap:8px}.chips span,.topline span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3;font-size:12px}.available{border-color:#1f7a4d !important;color:#73e2aa !important}.limited{border-color:#8a6413 !important;color:#f5c96a !important}.unavailable{border-color:#7a2f2f !important;color:#ff9c9c !important}.note{margin-top:10px;font-size:14px}
</style>
