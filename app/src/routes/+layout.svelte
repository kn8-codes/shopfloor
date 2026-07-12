<script>
  import { env } from '$env/dynamic/public';
  import AppShell from '$lib/components/AppShell.svelte';
  import { initAuth } from '$lib/stores/auth';

  let { children } = $props();
  const publicRelease = env.PUBLIC_SHOPFLOOR_PUBLIC_RELEASE === 'true';
  const launchMessage =
    env.PUBLIC_SHOPFLOOR_LAUNCH_MESSAGE ||
    'ShopFloor is being wired for a small, trust-first Akron alpha. The public app is intentionally closed until the release gate is opened.';

  /** @type {null | (() => void)} */
  let cleanup = null;

  $effect(() => {
    if (!publicRelease) return;

    initAuth().then((unsubscribe) => {
      cleanup = unsubscribe;
    });

    return () => {
      if (cleanup) cleanup();
    };
  });
</script>

{#if publicRelease}
  <AppShell>
    {@render children?.()}
  </AppShell>
{:else}
  <main class="launch-gate" aria-labelledby="launch-gate-title">
    <section class="card">
      <div class="eyebrow">ShopFloor alpha</div>
      <h1 id="launch-gate-title">Not open for requests yet.</h1>
      <p>{launchMessage}</p>
      <p class="note">
        This gate lets the site live at its permanent home while we finish data, privacy, and local trust checks before release.
      </p>
    </section>
  </main>
{/if}

<style>
  .launch-gate{min-height:100vh;display:grid;place-items:center;padding:24px;background:#090d12;color:#ece7dc}.card{max-width:720px;background:rgba(22,26,32,.96);border:1px solid #2a313d;border-radius:22px;padding:32px;box-shadow:0 24px 80px rgba(0,0,0,.35)}.eyebrow{color:#f59e0b;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:800}h1{font-size:clamp(2rem,6vw,4rem);line-height:1;margin:12px 0 18px}p{color:#aab3bf;line-height:1.7;font-size:1.05rem}.note{border-top:1px solid #2a313d;margin-top:20px;padding-top:20px;color:#f5c96a}
</style>
