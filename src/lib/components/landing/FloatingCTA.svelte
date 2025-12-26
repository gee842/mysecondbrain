<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let visible = false;
  let mounted = false;

  onMount(() => {
    mounted = true;

    if (!browser) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = !entry.isIntersecting;
      },
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  });

  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

{#if mounted && visible}
  <div class="floating-cta">
    <button on:click={() => scrollToSection('pricing')} class="btn-premium shadow-2xl group">
      <span class="relative z-10 flex items-center gap-2">
        <span>Try Free</span>
        <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </button>

    <button
      class="skip-pricing"
      on:click={() => scrollToSection('pricing')}
    >
      <span>Skip to Pricing</span>
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
{/if}

<style>
  .floating-cta {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .skip-pricing {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .skip-pricing:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .floating-cta {
      bottom: 1rem;
      right: 1rem;
    }

    .skip-pricing {
      display: none;
    }
  }
</style>
