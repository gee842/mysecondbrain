<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let progress = 0;
  let visible = false;

  onMount(() => {
    if (!browser) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        progress = Math.min((scrollTop / docHeight) * 100, 100);
      }

      visible = scrollTop > 100;
    };

    updateProgress();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>

<div class="scroll-progress" class:visible>
  <div class="scroll-progress-bar" style="width: {progress}%"></div>
</div>

<style>
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .scroll-progress.visible {
    opacity: 1;
  }

  .scroll-progress-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      #f59e0b 0%,
      #8b5cf6 50%,
      #06b6d4 100%
    );
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5), 0 0 20px rgba(139, 92, 246, 0.3);
  }
</style>
