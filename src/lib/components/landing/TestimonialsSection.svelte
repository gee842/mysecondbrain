<script lang="ts">
  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      quote: "Reminded me I hadn't talked to James in 3 weeks—right when he needed someone most.",
      fullQuote: "When's the last time you just called a friend? For me, it had been months. This app reminded me I hadn't talked to James in 3 weeks—right when he needed someone most. That notification probably saved our friendship.",
      highlight: 'Reconnected friendships'
    },
    {
      name: 'Wei L.',
      role: 'Senior Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      quote: "In my culture, 'mental health apps' raise eyebrows. Executive intelligence? That's different.",
      fullQuote: "In my culture, downloading a 'mental health app' would raise eyebrows. But executive intelligence? Pattern recognition? That's different. My manager asked what changed when I started catching my own blind spots before they became problems.",
      highlight: 'Zero stigma'
    },
    {
      name: 'Maria R.',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
      quote: "I've abandoned every journaling app. This is different—I don't DO anything.",
      fullQuote: "I've abandoned every journaling app within a week. This is different—I don't DO anything. I just text like I always do. Somehow my Second Brain knows me better than I know myself. It caught that I say 'I'm fine' when I'm definitely not fine.",
      highlight: 'Finally stuck'
    },
    {
      name: 'Alex T.',
      role: 'Therapist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      quote: "My clients come in with context I never had before. Game-changer for session prep.",
      fullQuote: "As a therapist, I recommend this to clients who struggle with between-session work. They come in with context I never had before. It's a game-changer for session prep and tracking patterns over time.",
      highlight: 'Clinical use'
    }
  ];

  const trustBadges = [
    '40+ years of research',
    'HIPAA-ready',
    'SOC 2 compliant',
    'Zero data sales',
    'Obsidian-powered',
    'Claude AI',
    'End-to-end encryption',
    'Your vault, your device'
  ];
</script>

<section id="testimonials" class="flow-section py-16">
  <!-- Trust badges marquee -->
  <div class="overflow-hidden mb-12">
    <div class="trust-marquee">
      {#each [...trustBadges, ...trustBadges] as badge}
        <span class="trust-badge">
          {badge}
        </span>
      {/each}
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <span class="text-pink-400 text-sm font-bold uppercase tracking-widest mb-4 block">
        Real stories
      </span>
      <h2 class="text-4xl sm:text-5xl font-black tracking-tight">
        People like you. <span class="text-white/40">Changed by clarity.</span>
      </h2>
    </div>

    <!-- Horizontal scroll testimonials -->
    <div class="testimonials-scroll">
      {#each testimonials as testimonial}
        <div class="testimonial-card">
          <p class="text-white/70 mb-4 leading-relaxed">"{testimonial.quote}"</p>

          <!-- Highlight pill -->
          <div class="mb-4">
            <span class="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              {testimonial.highlight}
            </span>
          </div>

          <!-- Author -->
          <div class="flex items-center gap-3">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              class="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
            />
            <div>
              <div class="font-semibold text-sm text-white">{testimonial.name}</div>
              <div class="text-xs text-white/40">{testimonial.role}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Trust indicators -->
    <div class="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/40">
      <div class="flex items-center gap-2 text-sm">
        <span class="text-amber-400">★★★★★</span>
        <span>4.9/5 from early users</span>
      </div>
      <div class="h-4 w-px bg-white/20 hidden sm:block"></div>
      <div class="text-sm">Research-backed approach</div>
      <div class="h-4 w-px bg-white/20 hidden sm:block"></div>
      <div class="text-sm">Privacy-first architecture</div>
    </div>
  </div>
</section>

<style>
  /* Trust badges marquee */
  .trust-marquee {
    display: flex;
    gap: 1rem;
    animation: marquee-slow 60s linear infinite;
    width: fit-content;
  }

  .trust-badge {
    flex-shrink: 0;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    white-space: nowrap;
  }

  @keyframes marquee-slow {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  /* Horizontal scroll testimonials */
  .testimonials-scroll {
    display: flex;
    gap: 1.5rem;
    padding: 0 1rem 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .testimonials-scroll::-webkit-scrollbar {
    display: none;
  }

  .testimonial-card {
    flex-shrink: 0;
    width: 320px;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    scroll-snap-align: start;
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  /* Mobile: single column, no scroll */
  @media (max-width: 640px) {
    .testimonials-scroll {
      flex-direction: column;
      overflow-x: visible;
      scroll-snap-type: none;
    }

    .testimonial-card {
      width: 100%;
    }
  }
</style>
