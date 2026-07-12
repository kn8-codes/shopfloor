<script>
  import { goto } from '$app/navigation';
  import { authState } from '$lib/stores/auth';
  import { createFieldNote, getMyShopCard } from '$lib/api';
  import { supabaseEnabled } from '$lib/supabase';

  let { data } = $props();

  const defaults = {
    request_id: '',
    title: '',
    problem: '',
    fix: '',
    cost: '',
    tools_used: '',
    time_required: '',
    safety_level: 'safe',
    neighborhood_tip: ''
  };

  /** @type {Record<string, string>} */
  const safetyLabels = {
    safe: 'Safe / complete',
    temporary: 'Temporary — name the next check',
    janky: 'Janky — record the risk plainly'
  };

  /** @param {string} value */
  function safetyLabel(value) {
    return safetyLabels[value] ?? value;
  }

  let form = $state({ ...defaults });
  let status = $state('idle');
  let message = $state('');
  let shopCardStatus = $state('loading');
  let hasShopCard = $state(false);

  async function refreshShopCardState() {
    if (!$authState.user || !supabaseEnabled) {
      hasShopCard = false;
      shopCardStatus = 'idle';
      return;
    }

    shopCardStatus = 'loading';

    try {
      const shopCard = await getMyShopCard();
      hasShopCard = Boolean(shopCard);
      shopCardStatus = 'ready';
    } catch (error) {
      hasShopCard = false;
      shopCardStatus = 'error';
      message = error instanceof Error ? error.message : 'Could not check shop card state.';
    }
  }

  $effect(() => {
    refreshShopCardState();
  });

  /** @param {SubmitEvent} event */
  async function handleSubmit(event) {
    event.preventDefault();
    message = '';

    if (!$authState.user) {
      status = 'error';
      message = 'Sign in first.';
      return;
    }

    if (!hasShopCard) {
      status = 'error';
      message = 'Create your shop card before writing a field note.';
      return;
    }

    status = 'submitting';

    try {
      const created = await createFieldNote({
        ...form,
        request_id: form.request_id || null
      });
      status = 'success';
      message = 'Field note saved.';
      await goto(`/field-notes#${created.id}`);
    } catch (error) {
      status = 'error';
      message = error instanceof Error ? error.message : 'Could not save field note.';
    }
  }
</script>

<svelte:head>
  <title>ShopFloor — New field note</title>
</svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">New field note</div>
      <h1>Capture what worked. Keep it tied to the help.</h1>
      <p>
        Field notes are for after useful help happens: what broke, what was tried, what fixed it,
        what is still risky, and what the next neighbor should know. This is not a content dashboard.
      </p>
    </div>
    <a class="secondary" href="/field-notes">Back to notes</a>
  </div>

  {#if data.demo}
    <div class="card notice warn">
      Sample mode: Supabase is not configured here, so the form is visible for language and flow review only.
      Nothing will be saved until live env and privacy checks are approved.
      {#if data.warning}<br />{data.warning}{/if}
    </div>
  {:else if data.warning}
    <div class="card notice warn">{data.warning}</div>
  {:else if data.requestOptions.length === 0}
    <div class="card notice">
      No live helped or resolved requests were found. You can still draft a general note, but the preferred path is to attach it to the request that was helped.
    </div>
  {/if}

  {#if !supabaseEnabled}
    <div class="card notice warn">Live saving is off. Use this as a prototype copy check, not a real field-note submission.</div>
  {:else if !$authState.user}
    <div class="card notice">Sign in first, then come back here to write a field note from your shop card.</div>
  {:else if shopCardStatus === 'loading'}
    <div class="card notice">Checking your shop card so notes stay tied to a real local helper…</div>
  {:else if !hasShopCard}
    <div class="card notice warn">Create your shop card before writing a field note.</div>
  {/if}

  <form class="card form" onsubmit={handleSubmit}>
    <label>
      <span>Related request, when possible</span>
      <select bind:value={form.request_id}>
        <option value="">No request link yet / general lesson</option>
        {#each data.requestOptions as request}
          <option value={request.id}>
            {request.title} — {request.status} · {request.neighborhood} · @{request.author_handle ?? 'unknown'}
          </option>
        {/each}
      </select>
      <small>Prefer helped/resolved requests. If the work happened outside ShopFloor, say so in the note instead of inventing a link.</small>
    </label>

    <label>
      <span>Title</span>
      <input bind:value={form.title} maxlength="140" placeholder="Temporary battery clamp fix bought two days" />
    </label>

    <label>
      <span>Problem</span>
      <textarea bind:value={form.problem} rows="4" maxlength="3000" placeholder="What was broken or blocking the neighbor?"></textarea>
    </label>

    <label>
      <span>What worked</span>
      <textarea bind:value={form.fix} rows="5" maxlength="5000" placeholder="What did you try, what actually fixed it, and what did not?"></textarea>
    </label>

    <div class="two-up">
      <label>
        <span>Cost / parts</span>
        <input bind:value={form.cost} maxlength="160" placeholder="$14 clamp / $0 reset / borrowed tool" />
      </label>

      <label>
        <span>Time required</span>
        <input bind:value={form.time_required} maxlength="160" placeholder="25 minutes, plus parts run" />
      </label>
    </div>

    <div class="two-up">
      <label>
        <span>Tools used</span>
        <input bind:value={form.tools_used} maxlength="240" placeholder="wire brush, cutter, 10mm socket" />
      </label>

      <label>
        <span>Safety / honesty label</span>
        <select bind:value={form.safety_level}>
          {#each Object.entries(safetyLabels) as [value, label]}
            <option {value}>{label}</option>
          {/each}
        </select>
      </label>
    </div>

    <label>
      <span>Neighborhood tip</span>
      <textarea bind:value={form.neighborhood_tip} rows="3" maxlength="1000" placeholder="What should the next neighbor check first?"></textarea>
    </label>

    <div class="actions">
      <button type="submit" disabled={!supabaseEnabled || !$authState.user || !hasShopCard || status === 'submitting'}>
        {status === 'submitting' ? 'Saving...' : 'Save field note'}
      </button>
      <span class="note">Public release stays gated. Saving here does not deploy, notify anyone, or publish a launch.</span>
    </div>

    {#if message}
      <p class:success={status === 'success'} class:error={status === 'error'}>{message}</p>
    {/if}
  </form>

  <section class="card preview">
    <div class="minihead">Preview</div>
    <h2>{form.title || 'The field-note title will show here'}</h2>
    <p><strong>Problem:</strong> {form.problem || 'What was broken or blocking help.'}</p>
    <p><strong>What worked:</strong> {form.fix || 'The actual fix, including limits and failures.'}</p>
    <div class="meta">
      <span>{safetyLabel(form.safety_level)}</span>
      {#if form.cost}<span>{form.cost}</span>{/if}
      {#if form.time_required}<span>{form.time_required}</span>{/if}
    </div>
    {#if form.neighborhood_tip}
      <p class="tip">Tip: {form.neighborhood_tip}</p>
    {/if}
  </section>
</div>

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:22px}.eyebrow,.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{margin:10px 0 12px}.secondary{color:#f59e0b;text-decoration:none;font-weight:800}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.form{display:grid;gap:18px}.notice{margin-bottom:18px;color:#9da7b3}.warn{color:#f5c96a}.two-up{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:grid;gap:8px}label span{color:#ece7dc;font-weight:700}small{color:#7c8794;line-height:1.5}input,textarea,select{width:100%;box-sizing:border-box;background:#11151a;border:1px solid #2a313d;border-radius:12px;padding:12px 14px;color:#ece7dc;font:inherit}textarea{resize:vertical}.actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}button{background:#f59e0b;color:#111;border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}.note,.page p{color:#9da7b3;line-height:1.6}.success{color:#73e2aa}.error{color:#ff9c9c}.preview{margin-top:18px}.preview strong{color:#ece7dc}.meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.tip{border-left:3px solid #f59e0b;padding-left:12px}@media (max-width:800px){.header{display:block}.two-up{grid-template-columns:1fr}}
</style>
