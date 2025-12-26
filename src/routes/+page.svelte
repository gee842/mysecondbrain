<script lang="ts">
  import { onMount } from 'svelte';
  import VoronoiBackground from '$lib/components/VoronoiBackground.svelte';

  import MarketingHeader from '$lib/components/landing/MarketingHeader.svelte';
  import FloatingCTA from '$lib/components/landing/FloatingCTA.svelte';
  import ScrollProgress from '$lib/components/landing/ScrollProgress.svelte';
  import NumberedSteps from '$lib/components/landing/NumberedSteps.svelte';
  import UseCaseMarquee from '$lib/components/landing/UseCaseMarquee.svelte';
  import KnowledgeGraphSection from '$lib/components/landing/KnowledgeGraphSection.svelte';
  import BentoFeatures from '$lib/components/landing/BentoFeatures.svelte';
  import WhyItWorksSection from '$lib/components/landing/WhyItWorksSection.svelte';
  import TestimonialsSection from '$lib/components/landing/TestimonialsSection.svelte';
  import FAQSection from '$lib/components/landing/FAQSection.svelte';
  
  import { pricingPlans } from '$lib/data';

  const platforms = [
    { name: 'WHATSAPP', color: 'platform-whatsapp' },
    { name: 'WECHAT', color: 'platform-wechat' },
    { name: 'TELEGRAM', color: 'platform-telegram' },
    { name: 'LINE', color: 'platform-line' },
    { name: 'MESSENGER', color: 'platform-messenger' },
    { name: 'SIGNAL', color: 'platform-signal' },
    { name: 'IMESSAGE', color: 'platform-imessage' },
    { name: 'VIBER', color: 'platform-viber' },
    { name: 'SNAPCHAT', color: 'platform-snapchat' },
    { name: 'INSTAGRAM', color: 'platform-instagram' },
    { name: 'DISCORD', color: 'platform-discord' }
  ];
  let currentPlatformIndex = 0;
  let platformRotationInterval: number;

  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    platformRotationInterval = setInterval(() => {
      currentPlatformIndex = (currentPlatformIndex + 1) % platforms.length;
    }, 2500) as unknown as number;

    return () => {
      if (platformRotationInterval) {
        clearInterval(platformRotationInterval);
      }
    };
  });
</script>

<svelte:head>
  <title>My Second Brain - Auto-Journaling for the Rest of Us</title>
  <meta name="description" content="Turn your messaging chaos into a searchable knowledge graph with proactive AI insights. Mental health tools for people who don't journal." />
</svelte:head>

<VoronoiBackground />
<ScrollProgress />
<FloatingCTA />
<MarketingHeader isLandingPage={true} />

<div class="flow-container">
  <section id="hero" class="flow-section-hero items-center justify-center text-center px-6">
    <div class="max-w-6xl mx-auto pt-24">
      <h1 class="display-hero text-ember mb-6 opacity-0 slide-up delay-2" style="animation-fill-mode: forwards;">
        YOUR<br/>
        <span class="platform-rotate-container">
          {#key currentPlatformIndex}
            <span class="platform-rotate-box {platforms[currentPlatformIndex].color}">
              <span class="platform-rotate-bg"></span>
              <span class="platform-rotate-text">
                {platforms[currentPlatformIndex].name}
              </span>
            </span>
          {/key}
        </span><br/>
        IS A GOLDMINE
        </h1>

      <p class="display-sub text-white/50 max-w-3xl mx-auto mb-12 opacity-0 slide-up delay-3" style="animation-fill-mode: forwards;">
        10,000+ messages a year. Plans, vents, voice notes at 2am.
        <span class="text-white">We turn that chaos into clarity.</span>
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 slide-up delay-4" style="animation-fill-mode: forwards;">
        <button class="btn-premium" on:click={() => scrollToSection('pricing')}>
          <span>Start Free Trial</span>
        </button>
        <button class="btn-ghost" on:click={() => scrollToSection('how-it-works')}>
          See How It Works
        </button>
      </div>

      <p class="mt-8 text-sm text-white/30 opacity-0 slide-up delay-4" style="animation-fill-mode: forwards;">
        2 min read to pricing
      </p>
    </div>

    <div class="scroll-indicator">
      <div class="mouse"></div>
      <span class="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
    </div>
  </section>

  <section id="problem" class="flow-section px-6">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span class="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4 block">
            Let's be honest
          </span>
          <h2 class="text-4xl sm:text-5xl font-black tracking-tight mb-8 leading-[0.95]">
            You know you<br/>
            <span class="text-white/40">should journal.</span><br/>
            <span class="text-ember">You won't.</span>
          </h2>
          <p class="text-xl text-white/50 leading-relaxed">
            Journaling reduces anxiety by <span class="text-white font-semibold">30%</span>.
            Expressive writing speeds recovery by <span class="text-white font-semibold">25%</span>.
            But only <span class="text-amber-400 font-bold">8%</span> stick with it past 2 weeks.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4 p-5 rounded-xl bg-red-500/10 border border-red-500/20">
            <span class="text-2xl">❌</span>
            <span class="line-through text-red-400/60 text-lg">Morning pages</span>
          </div>
          <div class="flex items-center gap-4 p-5 rounded-xl bg-red-500/10 border border-red-500/20">
            <span class="text-2xl">❌</span>
            <span class="line-through text-red-400/60 text-lg">Gratitude journal</span>
          </div>
          <div class="flex items-center gap-4 p-5 rounded-xl bg-red-500/10 border border-red-500/20">
            <span class="text-2xl">❌</span>
            <span class="line-through text-red-400/60 text-lg">Therapy homework</span>
          </div>
          <div class="flex items-center gap-4 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span class="text-2xl">✓</span>
            <span class="text-emerald-400 text-lg font-semibold">Texts you're already sending</span>
          </div>
        </div>
      </div>

      <div class="text-center">
        <span class="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-4 block">
          The solution
        </span>
        <h3 class="text-3xl sm:text-4xl font-black tracking-tight mb-6">
          Your messages become your journal.<br/>
          <span class="text-white/40">Automatically.</span>
        </h3>
        <p class="text-xl text-white/50 max-w-2xl mx-auto">
          No new habits. No daily prompts. Just the conversations you're already having, transformed into searchable insights.
        </p>
      </div>
    </div>
  </section>

  <NumberedSteps />
  <KnowledgeGraphSection />
  <UseCaseMarquee />
  <TestimonialsSection />

  <section id="pricing" class="flow-section px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4 block">
          Simple pricing
        </span>
        <h2 class="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Start free. <span class="text-white/40">Upgrade when ready.</span>
        </h2>
        <p class="text-xl text-white/50">
          14-day free trial on all plans. No credit card required.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {#each pricingPlans as plan}
          <div class="insight-premium relative {plan.highlight ? 'border-2 !border-amber-500/40' : ''}">
            {#if plan.badge}
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                {plan.badge}
              </div>
            {/if}
            <div class="{plan.highlight ? 'text-amber-400' : 'text-white/60'} text-sm font-bold uppercase tracking-wider mb-2">{plan.name}</div>
            <div class="text-5xl font-black mb-4">{plan.price}{#if plan.period}<span class="text-lg text-white/40">{plan.period}</span>{/if}</div>
            <p class="text-white/40 mb-6">{plan.description}</p>
            <ul class="space-y-3 mb-8">
              {#each plan.features.slice(0, 4) as feature}
                <li class="flex items-center gap-3 text-sm {feature.included === true ? 'text-white/70' : feature.included === 'info' ? 'text-white/40' : 'text-white/30'}">
                  {#if feature.included === true}
                    <span class="text-emerald-400">✓</span>
                  {:else if feature.included === 'info'}
                    <span class="text-white/20">ℹ</span>
                  {:else}
                    <span class="text-white/20">—</span>
                  {/if}
                  {feature.text}
                </li>
              {/each}
            </ul>
            <button class="{plan.ctaStyle === 'primary' ? 'btn-premium' : 'btn-ghost'} w-full text-center block">
              {#if plan.ctaStyle === 'primary'}<span>{plan.cta}</span>{:else}{plan.cta}{/if}
            </button>
          </div>
        {/each}
      </div>

      <div class="max-w-3xl mx-auto">
        <h3 class="text-2xl font-bold text-center mb-8">Common Questions</h3>
        <FAQSection inline={true} limit={4} />
      </div>
    </div>
  </section>

  <WhyItWorksSection />
  <BentoFeatures />

  <section id="cta" class="flow-section items-center justify-center text-center px-6">
    <div class="max-w-4xl mx-auto">
      <span class="text-8xl mb-8 block float-gentle">🧠</span>

      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[0.9]">
        READY TO<br/>
        <span class="text-ember">UNDERSTAND</span><br/>
        <span class="text-white/30">YOURSELF?</span>
      </h2>

      <p class="text-xl sm:text-2xl text-white/50 max-w-2xl mx-auto mb-12">
        Your messages are already full of you.<br/>
        <span class="text-white">Let's make sense of them together.</span>
      </p>

      <button class="btn-premium text-lg sm:text-xl !py-4 sm:!py-5 !px-8 sm:!px-12" on:click={() => scrollToSection('pricing')}>
        <span>Start Your Free Trial</span>
      </button>

      <p class="mt-16 text-base sm:text-lg text-white/30 italic">
        "It takes a lot of pain to make a mental health app with love."
      </p>
    </div>
  </section>

  <footer class="py-12 px-6 border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🧠</span>
        <span class="font-bold">My Second Brain</span>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
        <button on:click={() => scrollToSection('how-it-works')} class="hover:text-white transition-colors">How It Works</button>
        <button on:click={() => scrollToSection('why-it-works')} class="hover:text-white transition-colors">Science</button>
        <button on:click={() => scrollToSection('pricing')} class="hover:text-white transition-colors">Pricing</button>
        <button on:click={() => scrollToSection('faq')} class="hover:text-white transition-colors">FAQ</button>
      </div>
      <div class="text-sm text-white/30">
        © 2025 My Second Brain. Built with pain and love.
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    font-family: 'Space Grotesk', system-ui, sans-serif;
  }

  .flow-container {
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .flow-section-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .flow-section {
    min-height: auto;
    padding: 6rem 0;
  }

  .platform-rotate-container {
    display: inline-block;
    position: relative;
    perspective: 1000px;
  }

  .platform-rotate-box {
    display: inline-block;
    position: relative;
    padding: 0.3em 0.8em;
    animation: blockFlipIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    isolation: isolate;
  }

  .platform-rotate-bg {
    position: absolute;
    inset: 0;
    border-radius: 0.3em;
    opacity: 0.2;
    z-index: 0;
  }

  .platform-rotate-text {
    display: inline-block;
    font-weight: 900;
    position: relative;
    z-index: 2;
    -webkit-text-fill-color: currentColor;
    background: none;
    -webkit-text-stroke: 2px rgba(0, 0, 0, 0.5);
    paint-order: stroke fill;
    animation: textPulse 2s ease-in-out infinite;
  }

  @keyframes blockFlipIn {
    0% {
      transform: rotateX(90deg) translateY(-50%);
      opacity: 0;
    }
    50% {
      transform: rotateX(-10deg);
      opacity: 0.8;
    }
    100% {
      transform: rotateX(0deg) translateY(0);
      opacity: 1;
    }
  }

  @keyframes textPulse {
    0%, 100% {
      filter: brightness(1) drop-shadow(0 0 0px currentColor);
      transform: scale(1);
    }
    50% {
      filter: brightness(1.15) drop-shadow(0 0 20px currentColor);
      transform: scale(1.02);
    }
  }

  .platform-whatsapp .platform-rotate-text { color: #25D366; }
  .platform-whatsapp .platform-rotate-bg { background: #25D366; border: 2px solid #25D366; box-shadow: 0 0 60px rgba(37, 211, 102, 0.6); }

  .platform-wechat .platform-rotate-text { color: #09B83E; }
  .platform-wechat .platform-rotate-bg { background: #09B83E; border: 2px solid #09B83E; box-shadow: 0 0 60px rgba(9, 184, 62, 0.6); }

  .platform-telegram .platform-rotate-text { color: #229ED9; }
  .platform-telegram .platform-rotate-bg { background: #229ED9; border: 2px solid #229ED9; box-shadow: 0 0 60px rgba(34, 158, 217, 0.6); }

  .platform-line .platform-rotate-text { color: #00B900; }
  .platform-line .platform-rotate-bg { background: #00B900; border: 2px solid #00B900; box-shadow: 0 0 60px rgba(0, 185, 0, 0.6); }

  .platform-messenger .platform-rotate-text { background: linear-gradient(135deg, #0084FF 0%, #00B2FF 100%) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; background-clip: text !important; }
  .platform-messenger .platform-rotate-bg { background: linear-gradient(135deg, #0084FF 0%, #00B2FF 100%); border: 2px solid #0084FF; box-shadow: 0 0 80px rgba(0, 132, 255, 0.6); }

  .platform-signal .platform-rotate-text { color: #3A76F0; }
  .platform-signal .platform-rotate-bg { background: #3A76F0; border: 2px solid #3A76F0; box-shadow: 0 0 60px rgba(58, 118, 240, 0.6); }

  .platform-imessage .platform-rotate-text { background: linear-gradient(135deg, #34C759 0%, #007AFF 100%) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; background-clip: text !important; }
  .platform-imessage .platform-rotate-bg { background: linear-gradient(135deg, #34C759 0%, #007AFF 100%); border: 2px solid #34C759; box-shadow: 0 0 80px rgba(52, 199, 89, 0.6); }

  .platform-viber .platform-rotate-text { color: #665CAC; }
  .platform-viber .platform-rotate-bg { background: #665CAC; border: 2px solid #665CAC; box-shadow: 0 0 60px rgba(102, 92, 172, 0.6); }

  .platform-snapchat .platform-rotate-text { color: #FFFC00; }
  .platform-snapchat .platform-rotate-bg { background: #FFFC00; border: 2px solid #FFFC00; box-shadow: 0 0 60px rgba(255, 252, 0, 0.6); }

  .platform-instagram .platform-rotate-text { background: linear-gradient(135deg, #FCAF45 0%, #F77737 20%, #FD1D1D 40%, #E1306C 60%, #C13584 80%, #833AB4 100%) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; background-clip: text !important; }
  .platform-instagram .platform-rotate-bg { background: linear-gradient(135deg, #FCAF45 0%, #F77737 20%, #FD1D1D 40%, #E1306C 60%, #C13584 80%, #833AB4 100%); border: 2px solid #E1306C; box-shadow: 0 0 80px rgba(225, 48, 108, 0.6); }

  .platform-discord .platform-rotate-text { color: #5865F2; }
  .platform-discord .platform-rotate-bg { background: #5865F2; border: 2px solid #5865F2; box-shadow: 0 0 60px rgba(88, 101, 242, 0.6); }
</style>
