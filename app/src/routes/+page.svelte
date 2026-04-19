<script>
  let { data } = $props();
  const categories = ['Car', 'Housing', 'Tool borrow', 'Ride help', 'Paperwork', 'Appliance rescue'];
  const request = {
    title: 'Need help replacing a dead battery clamp before tomorrow’s school run',
    category: 'Car',
    neighborhood: 'Kenmore',
    urgency: 'Urgent',
    body: 'A real problem, a local ask, and a clear path to somebody useful answering it.'
  };
  const helper = {
    handle: '@jlibertytools',
    neighborhood: 'West Akron',
    skills: ['Battery / alternator', 'Brake jobs', 'Appliance rescue'],
    tools: ['Jack + stands', 'Code scanner', 'Jump pack']
  };
  const fieldNote = {
    title: 'Fridge wasn’t dying, the outlet GFCI was half-tripped',
    body: 'Checked voltage first, reset the upstream GFCI, cleaned the plug, fridge came back. Ten minutes. Zero-dollar fix.',
    neighborhood: 'North Hill'
  };
</script>

<svelte:head>
  <title>ShopFloor</title>
  <meta name="description" content="Neighborhood repair and survival network for working people." />
</svelte:head>

<div class="page">
  <section class="hero card">
    <div>
      <div class="eyebrow">ShopFloor / Akron alpha</div>
      {#if !data.appConfig.supabaseEnabled}
        <p class="config-note">Supabase client not configured yet. Add public env keys to enable auth and real data.</p>
      {:else if data.connection && !data.connection.ok}
        <p class="connection-note">Supabase is configured but not healthy yet: {data.connection.error}</p>
      {/if}
      <h1>When something breaks, start with the neighborhood.</h1>
      <p class="lede">
        ShopFloor is a local repair and survival network for people who keep life running with borrowed tools,
        practical know-how, and whatever grit is left after the day job.
      </p>
      <div class="chips">
        {#each categories as category}
          <span class="chip">{category}</span>
        {/each}
      </div>
      <div class="actions">
        <a class="primary" href="/feed">Open the neighborhood feed</a>
        <a class="secondary" href="/feed">Open the neighborhood feed</a>
      </div>
    </div>
    <div class="network card inset">
      <div class="grid"></div>
      <span class="node n1"></span><span class="label l1">Highland Square</span>
      <span class="node n2"></span><span class="label l2">North Hill</span>
      <span class="node n3"></span><span class="label l3">Kenmore</span>
      <span class="node n4"></span><span class="label l4">Firestone Park</span>
    </div>
  </section>

  <section class="three-up">
    <article class="card">
      <div class="minihead">Open request</div>
      <h2>{request.title}</h2>
      <div class="meta">
        <span>{request.category}</span>
        <span>{request.neighborhood}</span>
        <span class="urgent">{request.urgency}</span>
      </div>
      <p>{request.body}</p>
    </article>

    <article class="card">
      <div class="minihead">Shop card</div>
      <h2>{helper.handle}</h2>
      <p class="muted">{helper.neighborhood}</p>
      <h3>Skills</h3>
      <div class="chips">{#each helper.skills as skill}<span class="chip">{skill}</span>{/each}</div>
      <h3>Tools</h3>
      <div class="chips">{#each helper.tools as tool}<span class="chip">{tool}</span>{/each}</div>
    </article>

    <article class="card note">
      <div class="minihead">Field note</div>
      <h2>{fieldNote.title}</h2>
      <p>{fieldNote.body}</p>
      <p class="muted">{fieldNote.neighborhood}</p>
    </article>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    background: linear-gradient(180deg, #0a0c0f 0%, #11151a 100%);
    color: #ece7dc;
  }
  .page { max-width: 1200px; margin: 0 auto; padding: 24px; }
  .card {
    background: rgba(22,26,32,.94);
    border: 1px solid #2a313d;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,.28);
  }
  .hero { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; margin-bottom: 24px; }
  .eyebrow, .minihead { color: #f59e0b; text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 700; }
  h1 { font-size: 48px; line-height: 1.02; margin: 12px 0 14px; }
  h2 { margin-bottom: 10px; }
  h3 { color: #9da7b3; font-size: 14px; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
  .lede, .muted, p { color: #9da7b3; line-height: 1.55; }
  .config-note { color:#f5c96a; max-width:52ch; margin-top:10px; }
  .connection-note { color:#ffb4b4; max-width:56ch; margin-top:10px; }
  .chips, .meta, .actions { display: flex; flex-wrap: wrap; gap: 10px; }
  .chips { margin-top: 18px; }
  .chip, .meta span {
    border: 1px solid #2a313d;
    background: #1c222b;
    padding: 9px 11px;
    border-radius: 999px;
    font-size: 13px;
    color: #ece7dc;
  }
  .urgent { background: #fbbf24 !important; color: #111 !important; border-color: transparent !important; font-weight: 700; }
  .actions { margin-top: 20px; }
  .actions a {
    text-decoration: none; padding: 12px 14px; border-radius: 12px; font-weight: 700;
  }
  .primary { background: #f59e0b; color: #111; }
  .secondary { border: 1px solid #2a313d; color: #ece7dc; }
  .three-up { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .note { border-left: 3px solid #34d399; }
  .network { position: relative; min-height: 320px; overflow: hidden; }
  .inset { padding: 0; }
  .grid {
    position: absolute; inset: 0;
    background:
      linear-gradient(rgba(103,232,249,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(103,232,249,.08) 1px, transparent 1px),
      linear-gradient(180deg, rgba(245,158,11,.08), rgba(245,158,11,.02));
    background-size: 28px 28px, 28px 28px, auto;
  }
  .node {
    position: absolute; width: 12px; height: 12px; border-radius: 999px; background: #f59e0b;
    box-shadow: 0 0 0 6px rgba(245,158,11,.08);
  }
  .label {
    position: absolute; font-size: 12px; color: #9da7b3; background: rgba(13,15,18,.8);
    padding: 4px 6px; border-radius: 8px; border: 1px solid #2a313d;
  }
  .n1 { left: 18%; top: 24%; } .l1 { left: 21%; top: 20%; }
  .n2 { left: 63%; top: 20%; } .l2 { left: 66%; top: 16%; }
  .n3 { left: 34%; top: 58%; } .l3 { left: 37%; top: 54%; }
  .n4 { left: 52%; top: 78%; } .l4 { left: 55%; top: 74%; }
  @media (max-width: 960px) {
    .hero, .three-up { grid-template-columns: 1fr; }
    h1 { font-size: 36px; }
  }
</style>
