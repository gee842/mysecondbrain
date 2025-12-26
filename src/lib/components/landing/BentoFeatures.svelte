<script lang="ts">
  const features = [
    {
      icon: '🔔',
      title: 'Proactive Insights',
      description: "Don't wait for problems. Get nudges before relationships fade.",
      color: 'amber',
      stat: '560+ questions'
    },
    {
      icon: '🎙️',
      title: 'Voice Transcription',
      description: 'Voice notes at 2am? Transcribed and organized by morning.',
      color: 'violet',
      stat: 'Any language'
    },
    {
      icon: '🔒',
      title: 'Your Vault, Your Rules',
      description: "Data lives on YOUR device. We're a pipeline, not a warehouse.",
      color: 'emerald',
      stat: 'Zero retention'
    },
    {
      icon: '🧩',
      title: 'Obsidian Native',
      description: 'Plain markdown files. Take them anywhere. No lock-in.',
      color: 'cyan',
      stat: 'Full export'
    }
  ];

  const insightModes = [
    { icon: '🧠', label: 'Self Awareness', color: 'violet' },
    { icon: '💕', label: 'Interpersonal', color: 'pink' },
    { icon: '🔄', label: 'Breaking Cycles', color: 'amber' },
    { icon: '📈', label: 'Growth', color: 'emerald' },
    { icon: '🔋', label: 'Stress', color: 'orange' },
    { icon: '🧭', label: 'Values', color: 'cyan' },
    { icon: '⏳', label: 'Processing', color: 'slate' }
  ];
</script>

<section id="features" class="flow-section py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16">
      <span class="text-violet-400 text-sm font-bold uppercase tracking-widest mb-4 block">
        Core Features
      </span>
      <h2 class="text-4xl sm:text-5xl font-black tracking-tight mb-4">
        Everything you need. <span class="text-white/40">Nothing you don't.</span>
      </h2>
      <p class="text-xl text-white/50 max-w-2xl mx-auto">
        Built for focus. No feature bloat. Just the tools that matter.
      </p>
    </div>

    <!-- Feature Grid (2x2) -->
    <div class="feature-grid">
      {#each features as feature}
        <div class="feature-card" data-color={feature.color}>
          <div class="feature-header">
            <span class="feature-icon">{feature.icon}</span>
            <span class="feature-stat" class:text-amber-400={feature.color === 'amber'} class:text-violet-400={feature.color === 'violet'} class:text-emerald-400={feature.color === 'emerald'} class:text-cyan-400={feature.color === 'cyan'}>
              {feature.stat}
            </span>
          </div>
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-description">{feature.description}</p>
        </div>
      {/each}
    </div>

    <!-- Insight Modes Bar -->
    <div class="modes-bar">
      <div class="modes-label">
        <span class="text-amber-400">7</span> psychological frameworks
      </div>
      <div class="modes-list">
        {#each insightModes as mode}
          <span class="mode-pill">
            <span>{mode.icon}</span>
            <span class="mode-name">{mode.label}</span>
          </span>
        {/each}
      </div>
    </div>

    <!-- Insights Preview -->
    <div class="insights-preview">
      <div class="insight-card">
        <div class="insight-header">
          <span class="insight-icon">💕</span>
          <span class="insight-mode">Interpersonal</span>
          <span class="insight-rating">Rating: 9/10</span>
        </div>
        <p class="insight-text">
          "You haven't talked to James in almost 3 weeks now. Last time was that deep convo about his dad. Might be worth a quick check-in."
        </p>
        <div class="insight-footer">
          <span class="insight-label">Proactive reminder</span>
          <span class="insight-time">2 min ago</span>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-header">
          <span class="insight-icon">🧠</span>
          <span class="insight-mode">Self Awareness</span>
          <span class="insight-rating">Rating: 8/10</span>
        </div>
        <p class="insight-text">
          "Noticed a pattern: when someone disagrees with you, your first instinct is to over-explain. Happened with mom, Sarah, and your boss this week."
        </p>
        <div class="insight-footer">
          <span class="insight-label">Pattern detected</span>
          <span class="insight-time">1 hour ago</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 640px) {
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }

  .feature-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  .feature-card[data-color='amber']:hover {
    border-color: rgba(245, 158, 11, 0.3);
  }

  .feature-card[data-color='violet']:hover {
    border-color: rgba(139, 92, 246, 0.3);
  }

  .feature-card[data-color='emerald']:hover {
    border-color: rgba(16, 185, 129, 0.3);
  }

  .feature-card[data-color='cyan']:hover {
    border-color: rgba(6, 182, 212, 0.3);
  }

  .feature-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .feature-icon {
    font-size: 2rem;
  }

  .feature-stat {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .feature-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .feature-description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.5;
  }

  /* Modes bar */
  .modes-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    margin-bottom: 2rem;
  }

  .modes-label {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
  }

  .modes-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .mode-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .mode-name {
    display: none;
  }

  @media (min-width: 768px) {
    .mode-name {
      display: inline;
    }
  }

  /* Insights preview */
  .insights-preview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .insights-preview {
      grid-template-columns: 1fr;
    }
  }

  .insight-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    transition: all 0.3s ease;
  }

  .insight-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .insight-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .insight-icon {
    font-size: 1.25rem;
  }

  .insight-mode {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(236, 72, 153, 0.8);
  }

  .insight-rating {
    margin-left: auto;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .insight-text {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .insight-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .insight-label {
    padding: 0.25rem 0.5rem;
    background: rgba(245, 158, 11, 0.1);
    border-radius: 0.25rem;
    color: rgba(245, 158, 11, 0.8);
  }
</style>
