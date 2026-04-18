<svelte:head>
  <title>How ShopFloor works</title>
</svelte:head>

<script>
  const steps = [
    {
      title: '1. Make a shop card',
      body: 'Say what you can fix, what tools you have, what kind of help you need, and what neighborhood you’re in.'
    },
    {
      title: '2. Post a real request',
      body: 'When something breaks, post the actual problem, not vague social feed fluff. Keep it local and practical.'
    },
    {
      title: '3. Get replies from useful people',
      body: 'Neighbors can say: I can help, I know someone, I have the tool, or here is what worked for me.'
    },
    {
      title: '4. Leave a field note',
      body: 'If the problem gets solved, write down what worked so the next person doesn’t have to start from zero.'
    }
  ];
</script>

<div class="page">
  <a class="back" href="/">← Back</a>
  <div class="card intro">
    <div class="eyebrow">How it works</div>
    <h1>ShopFloor is a neighborhood network for people who like being useful.</h1>
    <p>
      It helps practical people find each other, solve real problems, and keep the knowledge instead of losing it in texts and side conversations.
    </p>
  </div>

  <div class="steps">
    {#each steps as step}
      <section class="card step">
        <h2>{step.title}</h2>
        <p>{step.body}</p>
      </section>
    {/each}
  </div>

  <section class="card" id="screens">
    <div class="eyebrow">Product shape</div>
    <h2>The first useful screens are simple</h2>
    <ul>
      <li>Neighborhood feed</li>
      <li>Request detail</li>
      <li>Shop card</li>
      <li>New request flow</li>
      <li>Field note creation / archive</li>
    </ul>
    <p class="muted">The point is not to build a platform that looks important. The point is to make practical help easier to find and easier to remember.</p>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    background: #0d0f12;
    color: #ece7dc;
  }
  .page { max-width: 900px; margin: 0 auto; padding: 24px; }
  .back { color: #9da7b3; text-decoration: none; display: inline-block; margin-bottom: 16px; }
  .card {
    background: rgba(22,26,32,.94);
    border: 1px solid #2a313d;
    border-radius: 18px;
    padding: 20px;
    margin-bottom: 20px;
  }
  .eyebrow { color: #f59e0b; text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 700; }
  h1 { font-size: 40px; line-height: 1.05; margin: 10px 0 14px; }
  h2 { margin-top: 0; }
  p, li { color: #9da7b3; line-height: 1.6; }
  .steps { display: grid; gap: 16px; }
  ul { padding-left: 18px; }
</style>
