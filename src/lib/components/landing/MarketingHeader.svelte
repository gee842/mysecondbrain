<script lang="ts">
  export let currentPage: string = '';
  
  let mobileMenuOpen = false;
  
  const navLinks = [
    { href: '#how-it-works', label: 'How It Works', key: 'how-it-works', scrollId: 'how-it-works' },
    { href: '#features', label: 'Features', key: 'features', scrollId: 'features' },
    { href: '#pricing', label: 'Pricing', key: 'pricing', scrollId: 'pricing' },
    { href: '#faq', label: 'FAQ', key: 'faq', scrollId: 'faq' }
  ];
  
  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function closeMenu() {
    mobileMenuOpen = false;
  }

  function scrollToSection(id: string) {
    closeMenu();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-white/5">
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <a href="/" class="flex items-center gap-3 group" on:click={closeMenu}>
      <span class="text-3xl group-hover:scale-110 transition-transform">🧠</span>
      <span class="font-bold text-xl tracking-tight hidden sm:block">My Second Brain</span>
    </a>

    <nav class="hidden md:flex items-center gap-6 text-sm text-white/60">
      {#each navLinks as link}
        {#if link.scrollId}
          <button on:click={() => scrollToSection(link.scrollId)} class="hover:text-white transition-colors">
            {link.label}
          </button>
        {:else}
          <a
            href={link.href}
            class="hover:text-white transition-colors {currentPage === link.key ? 'text-white' : ''}"
          >
            {link.label}
          </a>
        {/if}
      {/each}
    </nav>

    <div class="flex items-center gap-4">
      <button
        class="md:hidden p-2 text-white/60 hover:text-white transition-colors"
        on:click={toggleMenu}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
      >
        {#if mobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
      
      <a href="#pricing" class="btn-premium !py-2 !px-5 !text-sm" on:click={() => scrollToSection('pricing')}>
        <span>Start Free</span>
      </a>
    </div>
  </div>
</header>

{#if mobileMenuOpen}
  <div
    class="fixed inset-0 z-40 md:hidden"
    on:click={closeMenu}
    on:keydown={(e) => e.key === 'Escape' && closeMenu()}
    role="button"
    tabindex="-1"
    aria-label="Close menu overlay"
  >
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  </div>
  
  <nav
    class="fixed top-[73px] left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 py-4"
    aria-label="Mobile navigation"
  >
    <div class="max-w-7xl mx-auto px-6 space-y-1">
      {#each navLinks as link}
        {#if link.scrollId}
          <button
            on:click={() => scrollToSection(link.scrollId)}
            class="block w-full text-left py-3 px-4 rounded-lg text-base text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            {link.label}
          </button>
        {:else}
          <a
            href={link.href}
            class="block py-3 px-4 rounded-lg text-base transition-colors {
              currentPage === link.key 
                ? 'text-white bg-white/10' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }"
            on:click={closeMenu}
          >
            {link.label}
          </a>
        {/if}
      {/each}
    </div>
  </nav>
{/if}
