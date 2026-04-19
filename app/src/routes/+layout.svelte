<script>
  import AppShell from '$lib/components/AppShell.svelte';
  import { initAuth } from '$lib/stores/auth';

  let { children } = $props();

  /** @type {null | (() => void)} */
  let cleanup = null;

  $effect(() => {
    initAuth().then((unsubscribe) => {
      cleanup = unsubscribe;
    });

    return () => {
      if (cleanup) cleanup();
    };
  });
</script>

<AppShell>
  {@render children?.()}
</AppShell>
