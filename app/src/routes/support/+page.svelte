<script>
  const defaults = {
    name: '',
    contact: '',
    role: 'tester',
    flow: 'request_walkthrough',
    severity: 'confusing',
    whatHappened: '',
    expected: '',
    consent: false
  };

  let form = $state({ ...defaults });
  let copyStatus = $state('idle');

  /** @type {Record<string, string>} */
  const flowLabels = {
    request_walkthrough: 'Request walkthrough',
    sign_in: 'Sign-in / Magic Link',
    shop_card: 'Shop card setup',
    request_detail: 'Request detail / response path',
    field_notes: 'Field notes',
    privacy_safety: 'Privacy / safety concern',
    other: 'Other'
  };

  /** @type {Record<string, string>} */
  const severityLabels = {
    confusing: 'Confusing',
    blocked: 'Blocked me',
    unsafe: 'Felt unsafe or too public',
    bug: 'Bug / broken page',
    idea: 'Idea / improvement'
  };

  function buildPacket() {
    const lines = [
      'ShopFloor tester support note',
      `Name or handle: ${form.name.trim() || 'not provided'}`,
      `Contact for follow-up: ${form.contact.trim() || 'not provided'}`,
      `Role: ${form.role}`,
      `Flow: ${flowLabels[form.flow] ?? form.flow}`,
      `Severity: ${severityLabels[form.severity] ?? form.severity}`,
      '',
      'What happened:',
      form.whatHappened.trim() || '(tester did not write this yet)',
      '',
      'What they expected / needed instead:',
      form.expected.trim() || '(tester did not write this yet)',
      '',
      `Consent to follow up: ${form.consent ? 'yes' : 'no'}`,
      '',
      'Boundary: this is not a secure private channel. Do not paste secrets, passwords, medical details, exact addresses, or anything that should not be in a small-alpha test note.'
    ];

    return lines.join('\n');
  }

  async function copyPacket() {
    copyStatus = 'idle';

    try {
      await navigator.clipboard.writeText(buildPacket());
      copyStatus = 'copied';
    } catch (error) {
      copyStatus = 'failed';
    }
  }
</script>

<svelte:head>
  <title>ShopFloor — Support / feedback</title>
  <meta
    name="description"
    content="A small-alpha ShopFloor support and feedback intake surface for testers who hit confusion, bugs, or safety concerns."
  />
</svelte:head>

<div class="page">
  <header class="hero">
    <div class="eyebrow">Tester support</div>
    <h1>Do not leave testers stranded.</h1>
    <p>
      If a request walkthrough gets confusing, broken, or uncomfortable, capture the problem here. This first pass does not submit anything to a server and is not a secure private channel; it makes a clear note a tester can copy and hand back during a controlled alpha walkthrough.
    </p>
  </header>

  <section class="card boundary" aria-label="Support boundaries">
    <strong>Small-alpha boundary:</strong>
    <span>No emergency dispatch, no eligibility decisions, no public posting, and no secrets in the note. Do not include medical details, passwords, exact addresses, or anything a tester would not want repeated to the operator. If somebody is in immediate danger, use local emergency or crisis services instead of ShopFloor.</span>
  </section>

  <form class="card form" onsubmit={(event) => event.preventDefault()}>
    <div class="two-up">
      <label>
        <span>Name or handle</span>
        <input bind:value={form.name} maxlength="100" placeholder="Sam / northhilltester" />
      </label>

      <label>
        <span>Contact for follow-up</span>
        <input bind:value={form.contact} maxlength="160" placeholder="Email, phone, or 'ask Nate'" />
      </label>
    </div>

    <div class="three-up">
      <label>
        <span>Role</span>
        <select bind:value={form.role}>
          <option value="tester">Tester</option>
          <option value="requester">Requester</option>
          <option value="helper">Helper</option>
          <option value="observer">Observer</option>
        </select>
      </label>

      <label>
        <span>Flow</span>
        <select bind:value={form.flow}>
          {#each Object.entries(flowLabels) as [value, label]}
            <option {value}>{label}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>Severity</span>
        <select bind:value={form.severity}>
          {#each Object.entries(severityLabels) as [value, label]}
            <option {value}>{label}</option>
          {/each}
        </select>
      </label>
    </div>

    <label>
      <span>What happened?</span>
      <textarea
        bind:value={form.whatHappened}
        rows="6"
        maxlength="2500"
        placeholder="Where were you in the walkthrough, what did you try, and what got confusing or broken?"
      ></textarea>
    </label>

    <label>
      <span>What did you expect or need instead?</span>
      <textarea
        bind:value={form.expected}
        rows="4"
        maxlength="1500"
        placeholder="What would have made the next step clearer, safer, or more dignified?"
      ></textarea>
    </label>

    <label class="checkbox-row">
      <input bind:checked={form.consent} type="checkbox" />
      <div>
        <strong>Okay to follow up</strong>
        <p>A ShopFloor tester-loop operator may ask one clarifying question using the contact above.</p>
      </div>
    </label>
  </form>

  <section class="card preview" aria-labelledby="packet-heading">
    <div class="minihead">Copyable note</div>
    <h2 id="packet-heading">Tester feedback packet</h2>
    <pre>{buildPacket()}</pre>
    <div class="actions">
      <button type="button" onclick={copyPacket}>Copy note</button>
      {#if copyStatus === 'copied'}
        <span class="success">Copied. Paste it into the tester-loop receipt or message.</span>
      {:else if copyStatus === 'failed'}
        <span class="error">Clipboard failed. Select and copy the note manually.</span>
      {:else}
        <span class="note">Nothing is sent automatically.</span>
      {/if}
    </div>
  </section>
</div>

<style>
  .page{max-width:980px;margin:0 auto;padding:24px}.hero{margin-bottom:22px}.eyebrow,.minihead{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:800}h1{margin:10px 0 12px;font-size:clamp(2.2rem,7vw,4.8rem);line-height:.95}h2{margin:8px 0 12px}.hero p,.note,.boundary span,.checkbox-row p,.page p{color:#9da7b3;line-height:1.6}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:20px}.boundary{display:grid;grid-template-columns:auto 1fr;gap:10px;margin-bottom:18px;border-left:3px solid #f59e0b}.boundary strong{color:#f5c96a}.form{display:grid;gap:18px}.two-up{display:grid;grid-template-columns:1fr 1fr;gap:16px}.three-up{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}label{display:grid;gap:8px}label span{color:#ece7dc;font-weight:700}input,textarea,select{width:100%;box-sizing:border-box;background:#11151a;border:1px solid #2a313d;border-radius:12px;padding:12px 14px;color:#ece7dc;font:inherit}textarea{resize:vertical}.checkbox-row{grid-template-columns:auto 1fr;align-items:flex-start;gap:12px}.checkbox-row input{width:auto;margin-top:4px}.checkbox-row strong{color:#ece7dc}.preview{margin-top:18px}pre{white-space:pre-wrap;word-break:break-word;background:#10151c;border:1px solid #2a313d;border-radius:14px;padding:16px;color:#d8e0ea;line-height:1.55}.actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:14px}button{background:#f59e0b;color:#111;border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}.success{color:#73e2aa}.error{color:#ff9c9c}@media (max-width:850px){.two-up,.three-up,.boundary{grid-template-columns:1fr}}
</style>
