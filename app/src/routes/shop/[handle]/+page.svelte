<script>
  import ToolCard from '$lib/components/ToolCard.svelte';
  import FieldNoteCard from '$lib/components/FieldNoteCard.svelte';

  let { data } = $props();

  /** @param {number | string | null | undefined} hours */
  function formatHours(hours) {
    return Number(hours ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
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
        {#if data.profile.needs?.length}
          <div class="chips">{#each data.profile.needs as need}<span>{need}</span>{/each}</div>
        {:else}
          <p class="section-copy">Nothing listed yet.</p>
        {/if}
      </section>
    </div>

    <section class="card section">
      <div class="minihead">Time history</div>
      <p class="section-copy">Simple receipts only. Hours helped and received are trust signals, not debt.</p>
      <div class="time-summary">
        <span><strong>{formatHours(data.timeSummary?.hoursHelped)}</strong> hours helped</span>
        <span><strong>{formatHours(data.timeSummary?.hoursReceived)}</strong> hours received</span>
      </div>
      {#if data.timeHistory?.length}
        <div class="stack">
          {#each data.timeHistory as entry}
            <a class="receipt" href={`/request/${entry.request_id}`}>
              <strong>{formatHours(entry.hours)} hours {entry.role}</strong>
              {#if entry.role === 'helped'}
                <span>@{entry.helper?.handle ?? 'unknown'} helped @{entry.requester?.handle ?? 'unknown'}</span>
              {:else}
                <span>@{entry.requester?.handle ?? 'unknown'} received help from @{entry.helper?.handle ?? 'unknown'}</span>
              {/if}
              {#if entry.note}
                <span class="receipt-note">{entry.note}</span>
              {/if}
            </a>
          {/each}
        </div>
      {:else}
        <p class="section-copy">No time receipts yet.</p>
      {/if}
    </section>

    <section class="card section">
      <div class="minihead">Tools and resources</div>
      <p class="section-copy">Structured inventory with lendable and availability flags, but no full lending logistics yet.</p>
      {#if data.tools?.length}
        <div class="stack">
          {#each data.tools as tool}
            <ToolCard {tool} />
          {/each}
        </div>
      {:else}
        <p class="section-copy">Tool inventory not wired to live data yet.</p>
      {/if}
    </section>

    <section class="card section">
      <div class="minihead">Field notes</div>
      <p class="section-copy">Field notes lead the trust signal. The work is real when the fix is legible.</p>
      {#if data.fieldNotes?.length}
        <div class="stack">
          {#each data.fieldNotes as note}
            <FieldNoteCard {note} />
          {/each}
        </div>
      {:else}
        <p class="section-copy">No field notes yet.</p>
      {/if}
    </section>
  </div>
{:else}
  <div class="page"><p>Shop card not found.</p></div>
{/if}

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.back{color:#9da7b3;text-decoration:none;display:inline-block;margin-bottom:16px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.hero{display:grid;grid-template-columns:1.4fr .9fr;gap:20px}.eyebrow,.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.neighborhood{font-size:18px;color:#ece7dc}.stats,.chips,.time-summary{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start}.stats span,.chips span,.time-summary span{padding:8px 11px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.time-summary strong{color:#ece7dc}.section-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.section{margin-top:18px}.section-copy,p{color:#9da7b3;line-height:1.6}.stack{display:grid;gap:14px;margin-top:14px}.receipt{display:grid;gap:6px;text-decoration:none;color:#9da7b3;border-left:3px solid #73e2aa;padding:10px 0 10px 12px}.receipt strong{color:#ece7dc}.receipt-note{color:#9da7b3}h1{margin:10px 0}@media (max-width:900px){.hero,.section-grid{grid-template-columns:1fr}}
</style>
