<script>
  import ToolCard from '$lib/components/ToolCard.svelte';
  import FieldNoteCard from '$lib/components/FieldNoteCard.svelte';

  let { data } = $props();
</script>

<svelte:head><title>ShopFloor — {data.profile?.display_name ?? 'Shop card'}</title></svelte:head>

{#if data.profile}
  <div class="page">
    <a class="back" href="/feed">← Back to feed</a>
    <div class="card hero">
      <div>
        <div class="eyebrow">Shop card</div>
        <h1>{data.profile.display_name}</h1>
        <p class="muted neighborhood">{data.profile.neighborhood}</p>
        <p>{data.profile.bio}</p>
      </div>
      <div class="stats">
        <span>{data.profile.completed_help_count} completed helps</span>
        <span>{data.profile.field_note_count} field notes</span>
        <span>{data.profile.help_style}</span>
      </div>
    </div>

    <div class="section-grid">
      <section class="card">
        <div class="minihead">Skills</div>
        <div class="chips">{#each data.profile.skills as skill}<span>{skill}</span>{/each}</div>
      </section>

      <section class="card">
        <div class="minihead">Needs help with</div>
        <div class="chips">{#each data.profile.needs as need}<span>{need}</span>{/each}</div>
      </section>
    </div>

    <section class="card section">
      <div class="minihead">Tools and resources</div>
      <p class="section-copy">Structured inventory with lendable and availability flags, but no full lending logistics yet.</p>
      <div class="stack">
        {#each data.tools as tool}
          <ToolCard {tool} />
        {/each}
      </div>
    </section>

    <section class="card section">
      <div class="minihead">Field notes</div>
      <p class="section-copy">Field notes lead the trust signal. The work is real when the fix is legible.</p>
      <div class="stack">
        {#each data.fieldNotes as note}
          <FieldNoteCard {note} />
        {/each}
      </div>
    </section>
  </div>
{:else}
  <div class="page"><p>Shop card not found.</p></div>
{/if}

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.back{color:#9da7b3;text-decoration:none;display:inline-block;margin-bottom:16px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.hero{display:grid;grid-template-columns:1.4fr .9fr;gap:20px}.eyebrow,.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.neighborhood{font-size:18px;color:#ece7dc}.stats,.chips{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start}.stats span,.chips span{padding:8px 11px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.section-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.section{margin-top:18px}.section-copy,p{color:#9da7b3;line-height:1.6}.stack{display:grid;gap:14px;margin-top:14px}h1{margin:10px 0}@media (max-width:900px){.hero,.section-grid{grid-template-columns:1fr}}
</style>
