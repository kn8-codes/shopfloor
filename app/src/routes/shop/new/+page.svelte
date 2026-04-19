<script>
  import { goto } from '$app/navigation';
  import { authState } from '$lib/stores/auth';
  import { supabaseEnabled } from '$lib/supabase';
  import { upsertMyShopCard, getMyShopCard } from '$lib/api';

  const skillOptions = [
    'car',
    'housing',
    'appliance',
    'paperwork',
    'ride_help',
    'tool_borrow',
    'yard_outdoor',
    'kid_family',
    'other'
  ];

  /** @type {Record<string, string>} */
  const skillLabels = {
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

  let form = $state(/** @type {{ handle: string, display_name: string, neighborhood: string, bio: string, skills: string[], toolsText: string }} */ ({
    handle: '',
    display_name: '',
    neighborhood: 'Akron',
    bio: '',
    skills: [],
    toolsText: ''
  }));

  let status = $state('idle');
  let message = $state('');
  let prefillTried = $state(false);

  $effect(() => {
    if (prefillTried || !$authState.user || !supabaseEnabled) return;
    prefillTried = true;

    getMyShopCard()
      .then((shopCard) => {
        if (!shopCard) return;
        form.handle = shopCard.handle ?? '';
        form.display_name = shopCard.display_name ?? '';
        form.neighborhood = shopCard.neighborhood ?? 'Akron';
        form.bio = shopCard.bio ?? '';
        form.skills = Array.isArray(shopCard.skills) ? shopCard.skills : [];
      })
      .catch(() => {});
  });

  /** @param {string} skill */
  function toggleSkill(skill) {
    if (form.skills.includes(skill)) {
      form.skills = form.skills.filter((item) => item !== skill);
      return;
    }

    form.skills = [...form.skills, skill];
  }

  /** @param {SubmitEvent} event */
  async function handleSubmit(event) {
    event.preventDefault();
    message = '';

    if (!$authState.user) {
      status = 'error';
      message = 'Sign in first.';
      return;
    }

    if (!form.skills.length) {
      status = 'error';
      message = 'Pick at least one skill area.';
      return;
    }

    status = 'submitting';

    try {
      const result = await upsertMyShopCard(form);
      status = 'success';
      message = result.tools.length
        ? `Shop card saved. Tools captured for later structured inventory: ${result.tools.join(', ')}`
        : 'Shop card saved.';
      await goto(`/shop/${result.handle}`);
    } catch (error) {
      status = 'error';
      message = error instanceof Error ? error.message : 'Could not save shop card.';
    }
  }
</script>

<svelte:head>
  <title>ShopFloor — New shop card</title>
</svelte:head>

<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">Shop card setup</div>
      <h1>Tell the neighborhood what you can actually do.</h1>
      <p>Lean profile first. Enough to post requests, be findable, and feel real.</p>
    </div>
  </div>

  {#if !supabaseEnabled}
    <div class="card notice warn">Supabase is not configured yet, so this setup flow is still dormant.</div>
  {:else if !$authState.user}
    <div class="card notice">Sign in first, then come back here to make your shop card.</div>
  {/if}

  <form class="card form" onsubmit={handleSubmit}>
    <div class="two-up">
      <label>
        <span>Handle</span>
        <input bind:value={form.handle} maxlength="32" placeholder="jlibertytools" />
      </label>

      <label>
        <span>Display name</span>
        <input bind:value={form.display_name} maxlength="80" placeholder="J. Liberty Tools" />
      </label>
    </div>

    <label>
      <span>Neighborhood</span>
      <input bind:value={form.neighborhood} maxlength="100" placeholder="West Akron" />
    </label>

    <label>
      <span>Bio</span>
      <textarea bind:value={form.bio} rows="5" maxlength="500" placeholder="What you know, what kind of help you offer, and how you tend to work."></textarea>
    </label>

    <fieldset class="skills-field">
      <legend>Skills</legend>
      <div class="skill-grid">
        {#each skillOptions as skill}
          <label class:selected={form.skills.includes(skill)} class="skill-pill">
            <input
              type="checkbox"
              checked={form.skills.includes(skill)}
              onchange={() => toggleSkill(skill)}
            />
            <span>{skillLabels[skill]}</span>
          </label>
        {/each}
      </div>
    </fieldset>

    <label>
      <span>Tools (free text for now)</span>
      <textarea bind:value={form.toolsText} rows="3" placeholder="OBD-II scanner, floor jack + stands, soldering station"></textarea>
    </label>

    <div class="actions">
      <button type="submit" disabled={!supabaseEnabled || !$authState.user || status === 'submitting'}>
        {status === 'submitting' ? 'Saving...' : 'Save shop card'}
      </button>
      <span class="note">Tool inventory gets structured next. For now this captures the obvious stuff without slowing you down.</span>
    </div>

    {#if message}
      <p class:success={status === 'success'} class:error={status === 'error'}>{message}</p>
    {/if}
  </form>
</div>

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.header{margin-bottom:22px}.eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{margin:10px 0 12px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.form{display:grid;gap:18px}.notice{margin-bottom:18px;color:#9da7b3}.warn{color:#f5c96a}.two-up{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:grid;gap:8px}label span,legend{color:#ece7dc;font-weight:700}input,textarea{width:100%;box-sizing:border-box;background:#11151a;border:1px solid #2a313d;border-radius:12px;padding:12px 14px;color:#ece7dc;font:inherit}textarea{resize:vertical}.skills-field{border:1px solid #2a313d;border-radius:16px;padding:16px}.skill-grid{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}.skill-pill{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:999px;border:1px solid #2a313d;background:#161a20;color:#9da7b3;cursor:pointer}.skill-pill input{display:none}.skill-pill.selected{border-color:#f59e0b;color:#ece7dc;background:#1f2530}.actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}button{background:#f59e0b;color:#111;border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}.note,.page p{color:#9da7b3;line-height:1.6}.success{color:#73e2aa}.error{color:#ff9c9c}@media (max-width:800px){.two-up{grid-template-columns:1fr}}
</style>
