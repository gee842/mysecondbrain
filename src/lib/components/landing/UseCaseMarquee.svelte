<script lang="ts">
  const personas = [
    {
      name: 'Alex',
      role: 'Startup Founder',
      use: 'Team dynamics, investor updates, burnout tracking',
      emoji: '🚀'
    },
    {
      name: 'Dr. Chen',
      role: 'Therapist',
      use: 'Client session prep, pattern summaries',
      emoji: '🩺'
    },
    {
      name: 'Maya',
      role: 'ADHD Creative',
      use: 'Never forget a commitment again',
      emoji: '🎨'
    },
    {
      name: 'Jordan',
      role: 'Remote Worker',
      use: 'Relationship maintenance across timezones',
      emoji: '🌍'
    },
    {
      name: 'Sam',
      role: 'Executive',
      use: 'Meeting insights, network mapping',
      emoji: '💼'
    },
    {
      name: 'Taylor',
      role: 'Student',
      use: 'Study group coordination, emotional check-ins',
      emoji: '📚'
    },
    {
      name: 'Priya',
      role: 'Product Manager',
      use: 'Stakeholder tracking, feedback synthesis',
      emoji: '📊'
    },
    {
      name: 'Marcus',
      role: 'Parent',
      use: 'Family coordination, school updates',
      emoji: '👨‍👩‍👧'
    }
  ];
</script>

<section class="use-case-section py-12">
  <div class="text-center mb-8 px-6">
    <span class="text-violet-400 text-sm font-bold uppercase tracking-widest mb-2 block">
      How people use it
    </span>
    <h3 class="text-2xl font-bold text-white">Every brain. Every workflow.</h3>
  </div>

  <!-- Marquee container -->
  <div class="marquee-container">
    <div class="marquee-track">
      {#each [...personas, ...personas] as persona}
        <div class="persona-card">
          <div class="persona-header">
            <span class="persona-emoji">{persona.emoji}</span>
            <div>
              <div class="persona-name">{persona.name}</div>
              <div class="persona-role">{persona.role}</div>
            </div>
          </div>
          <p class="persona-use">{persona.use}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Second row - reverse direction -->
  <div class="marquee-container mt-4">
    <div class="marquee-track marquee-reverse">
      {#each [...personas.slice(4), ...personas.slice(0, 4), ...personas.slice(4), ...personas.slice(0, 4)] as persona}
        <div class="persona-card">
          <div class="persona-header">
            <span class="persona-emoji">{persona.emoji}</span>
            <div>
              <div class="persona-name">{persona.name}</div>
              <div class="persona-role">{persona.role}</div>
            </div>
          </div>
          <p class="persona-use">{persona.use}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .use-case-section {
    background: rgba(255, 255, 255, 0.01);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  .marquee-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  /* Fade edges */
  .marquee-container::before,
  .marquee-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 10;
    pointer-events: none;
  }

  .marquee-container::before {
    left: 0;
    background: linear-gradient(to right, rgb(10, 10, 12) 0%, transparent 100%);
  }

  .marquee-container::after {
    right: 0;
    background: linear-gradient(to left, rgb(10, 10, 12) 0%, transparent 100%);
  }

  .marquee-track {
    display: flex;
    gap: 1rem;
    animation: marquee 40s linear infinite;
    width: fit-content;
  }

  .marquee-reverse {
    animation: marquee-reverse 45s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes marquee-reverse {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  /* Pause on hover */
  .marquee-container:hover .marquee-track {
    animation-play-state: paused;
  }

  .persona-card {
    flex-shrink: 0;
    width: 280px;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    transition: all 0.2s ease;
  }

  .persona-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .persona-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .persona-emoji {
    font-size: 1.75rem;
    line-height: 1;
  }

  .persona-name {
    font-weight: 600;
    color: white;
    font-size: 0.9375rem;
  }

  .persona-role {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .persona-use {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }

  /* Reduce animation for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
    }
  }
</style>
