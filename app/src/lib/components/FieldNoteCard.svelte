<script>
  let { note } = $props();
</script>

<article class="field-note">
  <div class="meta">
    <span>{note.safety_level}</span>
    <span>{note.cost}</span>
    <span>{note.time_required}</span>
  </div>
  <h3>{note.title}</h3>
  <p><strong>Problem:</strong> {note.problem}</p>
  <p><strong>Fix:</strong> {note.fix}</p>
  {#if note.neighborhood_tip}
    <p class="tip"><strong>Neighborhood tip:</strong> {note.neighborhood_tip}</p>
  {/if}
</article>

<style>
  .field-note{background:#161a20;border:1px solid #2a313d;border-left:3px solid #34d399;border-radius:16px;padding:16px}.meta{display:flex;flex-wrap:wrap;gap:8px}.meta span{padding:7px 10px;border-radius:999px;background:#1c222b;border:1px solid #2a313d;color:#9da7b3;font-size:12px}h3{margin:12px 0;color:#ece7dc}p{color:#9da7b3;line-height:1.55}.tip{margin-top:10px}
</style>
