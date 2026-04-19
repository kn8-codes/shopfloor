<script>
  let { children } = $props();
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/feed', label: 'Feed' },
    { href: '/field-notes', label: 'Field notes' },
    { href: '/new-request', label: 'New request' },
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
  </header>
  <main>
    {@render children?.()}
  </main>
</div>

<style>
  .shell{min-height:100vh;background:#0d0f12;color:#ece7dc}.topbar{max-width:1100px;margin:0 auto;padding:18px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px}.brand{text-decoration:none;color:#ece7dc;font-weight:800;letter-spacing:.03em}nav{display:flex;flex-wrap:wrap;gap:12px}nav a{text-decoration:none;color:#9da7b3;padding:8px 10px;border-radius:10px}nav a:hover{background:#161a20;color:#ece7dc}main{padding-bottom:48px}@media (max-width:700px){.topbar{flex-direction:column;align-items:flex-start}}
</style>
