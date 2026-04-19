<script>
  import { categoryOptions, urgencyOptions } from '$lib/data/sample';

  const defaults = {
    title: '',
    description: '',
    category: 'other',
    neighborhood: 'Akron',
    urgency: 'normal',
    budget_note: '',
    safe_to_share: true
  };

  let form = $state({ ...defaults });

  /** @type {Record<string, string>} */
  const categoryLabels = {
    car: 'Car',
    housing: 'Housing',
    appliance: 'Appliance',
    paperwork: 'Paperwork',
    ride_help: 'Ride help',
    tool_borrow: 'Tool borrow',
    yard_outdoor: 'Yard / outdoor',
    kid_family: 'Kid / family',
    other: 'Other'
  };
</script>

<svelte:head>
  <title>ShopFloor — New request</title>
</svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">New request</div>
      <h1>Post the real problem.</h1>
      <p>For MVP, this is the most important action in the whole app. Keep it local, practical, and specific enough that somebody nearby can actually help.</p>
    </div>
  </div>

  <form class="card form" onsubmit={(event) => event.preventDefault()}>
    <label>
      <span>Title</span>
      <input bind:value={form.title} maxlength="140" placeholder="Need help replacing a dead battery clamp before morning" />
    </label>

    <label>
      <span>Description</span>
      <textarea
        bind:value={form.description}
        rows="7"
        maxlength="5000"
        placeholder="What broke, what you've tried, what makes this urgent, and anything somebody nearby should know before replying."
      ></textarea>
    </label>

    <div class="two-up">
      <label>
        <span>Category</span>
        <select bind:value={form.category}>
          {#each categoryOptions as category}
            <option value={category}>{categoryLabels[category] ?? category}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>Urgency</span>
        <select bind:value={form.urgency}>
          {#each urgencyOptions as urgency}
            <option value={urgency}>{urgency}</option>
          {/each}
        </select>
      </label>
    </div>

    <div class="two-up">
      <label>
        <span>Neighborhood</span>
        <input bind:value={form.neighborhood} maxlength="100" placeholder="Kenmore" />
      </label>

      <label>
        <span>Budget note</span>
        <input bind:value={form.budget_note} maxlength="160" placeholder="Barter / small cash / advice welcome" />
      </label>
    </div>

    <label class="checkbox-row">
      <input bind:checked={form.safe_to_share} type="checkbox" />
      <div>
        <strong>Safe to share publicly</strong>
        <p>Uncheck this if the request needs to stay more private when real auth + backend wiring lands.</p>
      </div>
    </label>

    <div class="actions">
      <button type="submit">Post request</button>
      <span class="note">Prototype only for now, no backend submission yet.</span>
    </div>
  </form>

  <section class="card preview">
    <div class="minihead">Live preview</div>
    <h2>{form.title || 'Your request title will show here'}</h2>
    <div class="meta">
      <span>{categoryLabels[form.category] ?? form.category}</span>
      <span>{form.neighborhood || 'Neighborhood'}</span>
      <span class:urgent={form.urgency === 'urgent'}>{form.urgency}</span>
    </div>
    <p>{form.description || 'Your description will show here.'}</p>
    {#if form.budget_note}
      <p class="budget">Budget note: {form.budget_note}</p>
    {/if}
    <p class="visibility">{form.safe_to_share ? 'Marked safe to share publicly' : 'Marked private / more restricted'}</p>
  </section>
</div>

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.header{margin-bottom:22px}.eyebrow,.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{margin:10px 0 12px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.form{display:grid;gap:18px}.two-up{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:grid;gap:8px}label span{color:#ece7dc;font-weight:700}input,textarea,select{width:100%;box-sizing:border-box;background:#11151a;border:1px solid #2a313d;border-radius:12px;padding:12px 14px;color:#ece7dc;font:inherit}textarea{resize:vertical}.checkbox-row{grid-template-columns:auto 1fr;align-items:flex-start;gap:12px}.checkbox-row input{width:auto;margin-top:3px}.checkbox-row p,.note,.budget,.visibility,.page p{color:#9da7b3;line-height:1.6}.actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}button{background:#f59e0b;color:#111;border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}.preview{margin-top:18px}.meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.urgent{background:#fbbf24 !important;color:#111 !important;border-color:transparent !important;font-weight:700}@media (max-width:800px){.two-up{grid-template-columns:1fr}}
</style>
