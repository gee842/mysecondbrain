<script lang="ts">
  export let url: string;
  export let label: string;
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
         bg-white/5 hover:bg-white/10 border border-white/10
         text-xs text-white/40 hover:text-white/60 transition-all
         hover:border-white/20 group"
>
  <svg class="w-3 h-3 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  <span>{label}</span>
  <svg class="w-2.5 h-2.5 opacity-40 group-hover:opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
</a>
