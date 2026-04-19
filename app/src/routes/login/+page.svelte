<script>
  import { authState, sendMagicLink, signOut } from '$lib/stores/auth';

  let email = $state('');
  let status = $state('idle');
  let message = $state('');

  /** @param {SubmitEvent} event */
  async function handleSubmit(event) {
    event.preventDefault();
    status = 'submitting';
    message = '';

    const { error } = await sendMagicLink(email.trim());

    if (error) {
      status = 'error';
      message = error.message;
      return;
    }

    status = 'sent';
    message = 'Magic link sent. Check your email on this device.';
  }
</script>

<svelte:head>
  <title>ShopFloor — Login</title>
</svelte:head>

<div class="page">
  <div class="card auth-card">
    <div class="eyebrow">Magic Link login</div>
    <h1>Get into the neighborhood network.</h1>
    <p>Simple auth first. No password circus. Email link in, then post real requests.</p>

    {#if $authState.user}
      <div class="signed-in">
        <p>Signed in as <strong>{$authState.user?.email ?? 'signed in'}</strong></p>
        <button onclick={signOut}>Sign out</button>
      </div>
    {:else}
      <form class="form" onsubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input bind:value={email} type="email" placeholder="you@akron.example" required />
        </label>
        <button type="submit" disabled={status === 'submitting' || !$authState.enabled}>
          {status === 'submitting' ? 'Sending link...' : 'Send magic link'}
        </button>
      </form>
    {/if}

    {#if !$authState.enabled}
      <p class="warn">Supabase env keys are not configured yet, so auth is disabled right now.</p>
    {/if}

    {#if message}
      <p class:success={status === 'sent'} class:error={status === 'error'}>{message}</p>
    {/if}
  </div>
</div>

<style>
  .page{max-width:760px;margin:0 auto;padding:24px}.card{background:rgba(22,26,32,.94);border:1px solid #2a313d;border-radius:18px;padding:24px}.auth-card{display:grid;gap:16px}.eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}h1{margin:0}.form{display:grid;gap:14px}label{display:grid;gap:8px}label span{font-weight:700;color:#ece7dc}input{width:100%;box-sizing:border-box;background:#11151a;border:1px solid #2a313d;border-radius:12px;padding:12px 14px;color:#ece7dc;font:inherit}button{background:#f59e0b;color:#111;border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}p{color:#9da7b3;line-height:1.6}.warn{color:#f5c96a}.success{color:#73e2aa}.error{color:#ff9c9c}.signed-in{display:grid;gap:12px}
</style>
