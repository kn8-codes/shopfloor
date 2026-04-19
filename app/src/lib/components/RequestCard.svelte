<script>
  let { request } = $props();
</script>

<a class="card request" href={`/request/${request.id}`}>
  <div class="meta">
    <span>{request.category}</span>
    <span>{request.neighborhood}</span>
    <span class:urgent={request.urgency === 'urgent'}>{request.urgency}</span>
  </div>
  <h3>{request.title}</h3>
  <p>{request.body}</p>
  <div class="foot">
    <span>@{request.author.handle}</span>
    <span>{request.created_at_label}</span>
  </div>
</a>

<style>
  .card { display:block; text-decoration:none; color:inherit; background:rgba(22,26,32,.94); border:1px solid #2a313d; border-radius:18px; padding:18px; }
  .meta,.foot { display:flex; flex-wrap:wrap; gap:8px; color:#9da7b3; font-size:13px; }
  .meta span,.foot span { padding:7px 10px; border-radius:999px; background:#1c222b; border:1px solid #2a313d; }
  .urgent { background:#fbbf24 !important; color:#111 !important; border-color:transparent !important; font-weight:700; }
  h3 { margin:14px 0 10px; color:#ece7dc; }
  p { margin:0 0 14px; color:#9da7b3; line-height:1.5; }
  .foot { justify-content:space-between; }
</style>
