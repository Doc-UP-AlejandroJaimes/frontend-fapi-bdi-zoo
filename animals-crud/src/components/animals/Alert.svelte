<script>
  export let type; // 'success' o 'error'
  export let message;
</script>

<div
  class={`relative px-4 py-3 rounded border mb-4 ${
    type === 'error'
      ? 'bg-red-100 border-red-400 text-red-700'
      : 'bg-green-100 border-green-400 text-green-700'
  }`}
>
  <span>{message}</span>
</div>
