<script>
  import { authState, signOut } from '$lib/stores/auth';

  let { children } = $props();
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/feed', label: 'Feed' },
    { href: '/field-notes', label: 'Field notes' },
    { href: '/new-request', label: 'New request' },
    { href: '/shop/new', label: 'Shop card' },
    { href: '/how-it-works', label: 'How it works' }
  ];
</script>

<div class="shell">
  <header class="topbar">
    <a class="brand" href="/">ShopFloor</a>
    <nav>
      {#each nav as item}
        <a href={item.href}>{item.label}</a>
      {/each}
    </nav>
    <div class="auth-slot">
      {#if !$authState.ready}
        <span class="auth-state muted">Auth loading...</span>
      {:else if !$authState.enabled}
        <a class="auth-link muted" href="/login">Auth off</a>
      {:else if $authState.user}
        <span class="auth-state">{$authState.user?.email ?? 'signed in'}</span>
        <button class="auth-button" onclick={signOut}>Sign out</button>
      {:else}
        <a class="auth-link" href="/login">Sign in</a>
      {/if}
    </div>
  </header>
  <main>
    {@render children?.()}
  </main>
</div>

<style>
  .shell{min-height:100vh;background:#0d0f12;color:#ece7dc}.topbar{max-width:1100px;margin:0 auto;padding:18px 24px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px}.brand{text-decoration:none;color:#ece7dc;font-weight:800;letter-spacing:.03em}nav{display:flex;flex-wrap:wrap;gap:12px}nav a{text-decoration:none;color:#9da7b3;padding:8px 10px;border-radius:10px}nav a:hover{background:#161a20;color:#ece7dc}.auth-slot{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:flex-end}.auth-link,.auth-state{color:#9da7b3;text-decoration:none;font-size:14px}.auth-button{background:#1c222b;color:#ece7dc;border:1px solid #2a313d;border-radius:10px;padding:8px 10px;font:inherit;cursor:pointer}.muted{color:#6f7a86}main{padding-bottom:48px}@media (max-width:800px){.topbar{grid-template-columns:1fr;align-items:flex-start}.auth-slot{justify-content:flex-start}}
</style>
