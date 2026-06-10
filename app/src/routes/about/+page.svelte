<svelte:head>
  <title>About ShopFloor</title>
  <meta
    name="description"
    content="ShopFloor is Akron-first mutual-aid infrastructure for practical repair, local trust, and neighborhood help."
  />
</svelte:head>

<script>
  const principles = [
    {
      title: 'Relationship is the infrastructure',
      body: 'The app is only a surface. The real work is helping neighbors become less isolated when something breaks.'
    },
    {
      title: 'Practical help beats performance',
      body: 'A ride, a borrowed jack, a working outlet, a fixed charger, or ten minutes of diagnosis can matter more than another inspirational post.'
    },
    {
      title: 'No gig-economy cosplay',
      body: 'ShopFloor is not a race-to-the-bottom task marketplace. No public ratings, bidding wars, humiliation scores, or cash-conversion theater.'
    },
    {
      title: 'Knowledge should stay local',
      body: 'Field notes and repair guides turn one solved problem into shared neighborhood memory.'
    }
  ];

  const alphaBoundaries = [
    'ShopFloor is an early alpha, not an emergency service.',
    'Do not post private information, account credentials, or anything that would put someone at risk.',
    'If a job involves electricity, batteries, vehicles, heat, chemicals, or someone’s personal data, stop and use judgment before proceeding.',
    'When in doubt, ask for a second set of eyes before turning a small problem into a larger one with better lighting.'
  ];
</script>

<div class="page">
  <a class="back" href="/">← Back</a>

  <section class="card hero">
    <div class="eyebrow">About ShopFloor</div>
    <h1>Aid is the visible action. Relationship is the infrastructure.</h1>
    <p class="lede">
      ShopFloor is a neighborhood repair and mutual-aid network for Akron. It starts with ordinary broken things:
      a dead charger, a car that will not start, a tool nobody owns alone, a form someone cannot get through, a fridge
      that might be one bad outlet away from the landfill.
    </p>
    <p>
      The point is not to make help feel like an app. The point is to make it easier for practical people nearby to find
      each other, solve real problems, and leave behind enough knowledge that the next person does not have to start from zero.
    </p>
    <div class="actions">
      <a class="primary" href="/feed">See open requests</a>
      <a class="secondary" href="/knowledge">Open the knowledge base</a>
    </div>
  </section>

  <section class="split">
    <article class="card statement">
      <div class="eyebrow">What it is</div>
      <h2>When something breaks, start with the neighborhood.</h2>
      <p>
        ShopFloor is for local practical help: repair, diagnosis, tool borrowing, rides, paperwork, setup, salvage,
        and the small interventions that keep people functional. It treats help as relationship-building, not content,
        not charity branding, and not a public scoreboard.
      </p>
      <p>
        Time history may eventually help show who has helped and who has been helped. It should not become debt,
        punishment, or a gate that blocks someone from receiving aid.
      </p>
    </article>

    <article class="card statement warning">
      <div class="eyebrow">What it is not</div>
      <h2>Not a ratings market with nicer colors.</h2>
      <p>
        ShopFloor should not recreate the same extractive mechanics that already make working people compete for crumbs:
        star ratings, public shame, fake productivity metrics, auction-style labor, or help that only moves if money moves first.
      </p>
      <p>
        The product has to protect dignity even when the interface is simple and the database is still young. Especially then.
      </p>
    </article>
  </section>

  <section class="principles" aria-label="ShopFloor principles">
    {#each principles as principle}
      <article class="card principle">
        <h2>{principle.title}</h2>
        <p>{principle.body}</p>
      </article>
    {/each}
  </section>

  <section class="card alpha">
    <div class="eyebrow">Alpha boundaries</div>
    <h2>Useful does not mean reckless.</h2>
    <p>
      ShopFloor should help people act sooner without pretending every neighbor is a licensed contractor, mechanic,
      electrician, social worker, or data-recovery lab. Some work is simple. Some work needs a professional. Knowing the
      difference is part of the system.
    </p>
    <ul>
      {#each alphaBoundaries as boundary}
        <li>{boundary}</li>
      {/each}
    </ul>
  </section>

  <section class="card closing">
    <div class="eyebrow">Public promise</div>
    <h2>Lower the barrier to asking. Raise the quality of remembering.</h2>
    <p>
      A good ShopFloor session should end with someone helped, someone less alone, and a field note or guide that makes
      the next repair easier. That is the flywheel: help, trust, memory, repeat.
    </p>
    <div class="actions">
      <a class="primary" href="/new-request">Ask for help</a>
      <a class="secondary" href="/field-notes">Read field notes</a>
    </div>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    background: #0d0f12;
    color: #ece7dc;
  }

  .page {
    max-width: 1040px;
    margin: 0 auto;
    padding: 24px;
  }

  .back {
    color: #9da7b3;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 16px;
  }

  .card {
    background: rgba(22, 26, 32, 0.94);
    border: 1px solid #2a313d;
    border-radius: 18px;
    padding: 22px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.24);
  }

  .hero {
    padding: 30px;
    margin-bottom: 22px;
    background:
      radial-gradient(circle at top right, rgba(245, 158, 11, 0.16), transparent 32%),
      rgba(22, 26, 32, 0.96);
  }

  .eyebrow {
    color: #f59e0b;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 12px;
    font-weight: 800;
  }

  h1 {
    max-width: 820px;
    font-size: clamp(38px, 8vw, 72px);
    line-height: 0.96;
    margin: 12px 0 18px;
  }

  h2 {
    margin: 8px 0 10px;
    line-height: 1.1;
  }

  p,
  li {
    color: #aab3bf;
    line-height: 1.65;
  }

  .lede {
    color: #d8d0c3;
    font-size: 19px;
    max-width: 76ch;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
  }

  .actions a {
    text-decoration: none;
    padding: 12px 15px;
    border-radius: 12px;
    font-weight: 800;
  }

  .primary {
    background: #f59e0b;
    color: #111;
  }

  .secondary {
    border: 1px solid #2a313d;
    color: #ece7dc;
    background: #151a21;
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-bottom: 18px;
  }

  .warning {
    border-left: 3px solid #f97316;
  }

  .principles {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-bottom: 18px;
  }

  .principle {
    min-height: 180px;
  }

  .alpha,
  .closing {
    margin-bottom: 18px;
  }

  ul {
    padding-left: 20px;
  }

  @media (max-width: 980px) {
    .split,
    .principles {
      grid-template-columns: 1fr;
    }
  }
</style>
