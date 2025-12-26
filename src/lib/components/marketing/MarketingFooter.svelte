<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { href: '/clinical', label: 'For Clinicians' },
    { href: '/organizations', label: 'For Organizations' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' }
  ];

  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleClick(href: string) {
    if (href.startsWith('#')) {
      scrollToSection(href.slice(1));
    }
  }
</script>

<footer class="py-12 px-6 border-t border-white/5">
  <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <span class="text-2xl">🧠</span>
      <span class="font-bold">My Second Brain</span>
    </a>
    
    <nav class="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
      {#each navLinks as link}
        {#if link.href.startsWith('#')}
          <button on:click={() => handleClick(link.href)} class="hover:text-white transition-colors">
            {link.label}
          </button>
        {:else}
          <a href={link.href} class="hover:text-white transition-colors">
            {link.label}
          </a>
        {/if}
      {/each}
    </nav>
    
    <div class="text-sm text-white/30">
      © {currentYear} My Second Brain. Built with pain and love.
    </div>
  </div>
</footer>
