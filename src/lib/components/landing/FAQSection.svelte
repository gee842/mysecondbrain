<script lang="ts">
  import { featuredFaqs } from '$lib/data';
  
  export let inline: boolean = false;
  export let limit: number = 0;

  $: faqs = limit > 0 ? featuredFaqs.slice(0, limit) : featuredFaqs;

  let openIndex: number | null = null;

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

{#if inline}
  <div class="space-y-3">
    {#each faqs as faq, i}
      <button
        on:click={() => toggle(i)}
        aria-expanded={openIndex === i}
        class="w-full text-left p-4 rounded-xl border transition-all duration-300 {
          openIndex === i
            ? 'bg-white/10 border-amber-500/30'
            : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
        }"
      >
        <div class="flex items-center justify-between gap-4">
          <span class="font-semibold text-white text-sm sm:text-base">{faq.question}</span>
          <svg
            class="w-4 h-4 text-white/50 flex-shrink-0 transition-transform duration-300 {openIndex === i ? 'rotate-180' : ''}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {#if openIndex === i}
          <div class="mt-3 pt-3 border-t border-white/10">
            <p class="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        {/if}
      </button>
    {/each}
  </div>
{:else}
  <section id="faq" class="flow-section px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4 block">
          Questions
        </span>
        <h2 class="text-4xl sm:text-5xl font-black tracking-tight mb-6">
          Got questions?<br/>
          <span class="text-white/40">We've got answers.</span>
        </h2>
      </div>

      <div class="space-y-3">
        {#each faqs as faq, i}
          <div
            class="opacity-0 slide-up"
            style="animation-fill-mode: forwards; animation-delay: {i * 50}ms"
          >
            <button
              on:click={() => toggle(i)}
              aria-expanded={openIndex === i}
              class="w-full text-left p-5 rounded-xl border transition-all duration-300 {
                openIndex === i
                  ? 'bg-white/10 border-amber-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
              }"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="font-semibold text-white">{faq.question}</span>
                <svg
                  class="w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 {openIndex === i ? 'rotate-180' : ''}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {#if openIndex === i}
                <div class="mt-4 pt-4 border-t border-white/10">
                  <p class="text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              {/if}
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}
