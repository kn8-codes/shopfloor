<script>
  import { invalidateAll } from '$app/navigation';
  import { responseTypeOptions } from '$lib/data/sample';
  import { completeHelpRequest, createRequestResponse, getMyShopCard } from '$lib/api';
  import { authState } from '$lib/stores/auth';
  import { supabaseEnabled } from '$lib/supabase';

  let { data } = $props();

  let responseForm = $state({
    response_type: 'can_help',
    message: ''
  });
  let responseStatus = $state('idle');
  let responseMessage = $state('');
  let completionForm = $state({
    response_id: '',
    hours: '1',
    ledger_note: ''
  });
  let completionStatus = $state('idle');
  let completionMessage = $state('');
  let shopCardStatus = $state('loading');
  let hasShopCard = $state(false);
  let isRequestAuthor = $derived(Boolean($authState.user && data.request?.author_id === $authState.user.id));
  let isResolved = $derived(data.request?.status === 'resolved');
  let hasSelectedCompletionHelper = $derived(Boolean(completionForm.response_id));

  /** @type {Record<string, string>} */
  const responseTypeLabels = {
    can_help: 'I can help',
    have_tool: 'I have a tool',
    advice: 'Advice',
    know_someone: 'I know someone'
  };

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
      responseMessage = error instanceof Error ? error.message : 'Could not check shop card state.';
    }
  }

  $effect(() => {
    refreshShopCardState();
  });

  /** @param {SubmitEvent} event */
  async function handleResponseSubmit(event) {
    event.preventDefault();
    responseMessage = '';

    if (!data.request?.id) {
      responseStatus = 'error';
      responseMessage = 'Request not found.';
      return;
    }

    if (!$authState.user) {
      responseStatus = 'error';
      responseMessage = 'Sign in first.';
      return;
    }

    if (!hasShopCard) {
      responseStatus = 'error';
      responseMessage = 'Create your shop card before responding.';
      return;
    }

    responseStatus = 'submitting';

    try {
      await createRequestResponse({
        request_id: data.request.id,
        response_type: responseForm.response_type,
        message: responseForm.message
      });
      responseForm.message = '';
      responseForm.response_type = 'can_help';
      responseStatus = 'success';
      responseMessage = 'Response posted.';
      await invalidateAll();
    } catch (error) {
      responseStatus = 'error';
      responseMessage = error instanceof Error ? error.message : 'Could not post response.';
    }
  }

  /** @param {SubmitEvent} event */
  async function handleCompletionSubmit(event) {
    event.preventDefault();
    completionMessage = '';

    if (!data.request?.id) {
      completionStatus = 'error';
      completionMessage = 'Request not found.';
      return;
    }

    if (!$authState.user || !isRequestAuthor) {
      completionStatus = 'error';
      completionMessage = 'Only the request author can mark this complete.';
      return;
    }

    if (isResolved) {
      completionStatus = 'error';
      completionMessage = 'This request is already resolved.';
      return;
    }

    completionStatus = 'submitting';

    try {
      await completeHelpRequest({
        request_id: data.request.id,
        response_id: completionForm.response_id || null,
        hours: completionForm.response_id ? completionForm.hours : null,
        ledger_note: completionForm.ledger_note
      });
      completionStatus = 'success';
      completionMessage = completionForm.response_id ? 'Request marked resolved and hours recorded.' : 'Request marked resolved.';
      await invalidateAll();
    } catch (error) {
      completionStatus = 'error';
      completionMessage = error instanceof Error ? error.message : 'Could not complete request.';
    }
  }
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
      {#if isResolved}
        <p class="status-line">Resolved {data.request.completed_at ? `on ${new Date(data.request.completed_at).toLocaleDateString()}` : ''}</p>
      {/if}
    </div>

    <div class="section card">
      <div class="minihead">Responses</div>
      {#if data.request.responses?.length}
        {#each data.request.responses as response}
          <div class="response">
            <div class="meta tight">
              <span>{responseTypeLabels[response.response_type] ?? response.response_type}</span>
              <span>@{response.author?.handle ?? 'unknown'}</span>
            </div>
            <p>{response.message}</p>
          </div>
        {/each}
      {:else}
        <p>No responses yet.</p>
      {/if}
    </div>

    <div class="section card">
      <div class="minihead">Time history</div>
      {#if data.request.ledgerEntries?.length}
        {#each data.request.ledgerEntries as entry}
          <div class="ledger-entry">
            <strong>{Number(entry.hours).toLocaleString(undefined, { maximumFractionDigits: 2 })} hours helped</strong>
            <p>@{entry.helper?.handle ?? 'unknown'} helped @{entry.requester?.handle ?? 'unknown'}.</p>
            {#if entry.note}
              <p class="muted">{entry.note}</p>
            {/if}
          </div>
        {/each}
      {:else if isResolved}
        <p class="muted">Resolved without a helper-hours entry yet.</p>
      {:else}
        <p class="muted">No time history yet. Completion creates the first receipt.</p>
      {/if}
    </div>

    <div class="section card">
      <div class="minihead">Offer help</div>
      {#if !supabaseEnabled}
        <p class="muted">Supabase is not configured yet, so responses are read-only sample data here.</p>
      {:else if !$authState.user}
        <p class="muted">Sign in to respond to this request.</p>
      {:else if shopCardStatus === 'loading'}
        <p class="muted">Checking your shop card…</p>
      {:else if !hasShopCard}
        <p class="muted">Create your shop card before responding to requests.</p>
      {:else if isResolved}
        <p class="muted">This request is resolved. New responses are closed for the MVP path.</p>
      {/if}

      <form class="response-form" onsubmit={handleResponseSubmit}>
        <label>
          <span>Response type</span>
          <select bind:value={responseForm.response_type} disabled={isResolved}>
            {#each responseTypeOptions as responseType}
              <option value={responseType}>{responseTypeLabels[responseType] ?? responseType}</option>
            {/each}
          </select>
        </label>

        <label>
          <span>Message</span>
          <textarea
            bind:value={responseForm.message}
            maxlength="2000"
            minlength="5"
            rows="5"
            placeholder="Say what you can do, what tool you have, or what someone should try first."
            required
            disabled={isResolved}
          ></textarea>
        </label>

        <div class="actions">
          <button type="submit" disabled={!supabaseEnabled || !$authState.user || !hasShopCard || isResolved || responseStatus === 'submitting'}>
            {responseStatus === 'submitting' ? 'Posting...' : 'Post response'}
          </button>
          <span class="note">Live response once Supabase schema is applied.</span>
        </div>

        {#if responseMessage}
          <p class:success={responseStatus === 'success'} class:error={responseStatus === 'error'}>{responseMessage}</p>
        {/if}
      </form>
    </div>

    {#if isRequestAuthor}
      <div class="section card">
        <div class="minihead">Complete request</div>
        {#if isResolved}
          <p class="muted">This request is already marked resolved.</p>
        {:else}
          <p class="muted">MVP rule: the request author can mark the help complete. If they select a helper, this records simple help-hours history.</p>
          <form class="response-form" onsubmit={handleCompletionSubmit}>
            <label>
              <span>Who helped?</span>
              <select bind:value={completionForm.response_id}>
                <option value="">No helper selected yet</option>
                {#each data.request.responses ?? [] as response}
                  <option value={response.id}>@{response.author?.handle ?? 'unknown'} — {responseTypeLabels[response.response_type] ?? response.response_type}</option>
                {/each}
              </select>
            </label>

            {#if hasSelectedCompletionHelper}
              <label>
                <span>Hours helped</span>
                <input
                  bind:value={completionForm.hours}
                  type="number"
                  min="0.25"
                  max="24"
                  step="0.25"
                  required
                />
              </label>

              <label>
                <span>Ledger note</span>
                <textarea
                  bind:value={completionForm.ledger_note}
                  maxlength="500"
                  rows="3"
                  placeholder="Optional: what got done, short and plain."
                ></textarea>
              </label>
            {/if}

            <div class="actions">
              <button type="submit" disabled={!supabaseEnabled || !$authState.user || completionStatus === 'submitting'}>
                {completionStatus === 'submitting' ? 'Marking...' : 'Mark resolved'}
              </button>
              <span class="note">Ledger is history only. It does not block future help.</span>
            </div>

            {#if completionMessage}
              <p class:success={completionStatus === 'success'} class:error={completionStatus === 'error'}>{completionMessage}</p>
            {/if}
          </form>
        {/if}
      </div>
    {/if}

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
  .card,.callout{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.section{margin-top:18px}.meta{display:flex;flex-wrap:wrap;gap:8px}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3}.urgent{background:#fbbf24 !important;color:#111 !important;border-color:transparent !important;font-weight:700}.status-line{color:#73e2aa;font-weight:700}
  h1{margin:14px 0}.sub,.muted,p{color:#9da7b3;line-height:1.6}.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700;margin-bottom:12px}.response+.response{margin-top:14px;padding-top:14px;border-top:1px solid #2a313d}.tight span{font-size:12px}
  .response-form{display:grid;gap:16px}label{display:grid;gap:8px}label span{color:#ece7dc;font-weight:700}textarea,select,input{width:100%;box-sizing:border-box;background:#11151a;border:1px solid #2a313d;border-radius:12px;padding:12px 14px;color:#ece7dc;font:inherit}textarea{resize:vertical}.ledger-entry{border-left:3px solid #73e2aa;padding-left:12px}.ledger-entry+.ledger-entry{margin-top:14px}.actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}button{background:#f59e0b;color:#111;border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}.note{color:#9da7b3}.success{color:#73e2aa}.error{color:#ff9c9c}
</style>
