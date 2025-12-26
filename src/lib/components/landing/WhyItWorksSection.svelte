<script lang="ts">
  import SourceLink from './SourceLink.svelte';

  let activeTab = 'science';

  const tabs = [
    { id: 'science', label: 'Research-Backed', icon: '🔬' },
    { id: 'adhd', label: 'ADHD-Friendly', icon: '🧠' },
    { id: 'patterns', label: 'Pattern Detection', icon: '🎯' },
    { id: 'transform', label: 'Before → After', icon: '✨' }
  ];

  // Science stats
  const scienceStats = [
    {
      stat: '50%',
      label: 'fewer health center visits',
      description: 'Students who wrote about emotional experiences',
      source: 'Pennebaker & Beall, 1986',
      url: 'https://doi.org/10.1037/0021-843X.95.3.274',
      color: 'emerald'
    },
    {
      stat: '50%',
      label: 'increased survival',
      description: 'Strong social connections (308,849 participants)',
      source: 'Holt-Lunstad et al., 2010',
      url: 'https://doi.org/10.1371/journal.pmed.1000316',
      color: 'pink'
    },
    {
      stat: '↓',
      label: 'amygdala activity',
      description: 'Simply labeling emotions calms the brain',
      source: 'Lieberman et al., 2007',
      url: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x',
      color: 'violet'
    }
  ];

  // ADHD features
  const adhdFeatures = [
    {
      icon: '🧩',
      title: 'Working Memory',
      description: "Can't remember what you said last week? Your vault does."
    },
    {
      icon: '⏰',
      title: 'Time Blindness',
      description: '"3 weeks since you talked to James" — we track so you don\'t have to.'
    },
    {
      icon: '🔄',
      title: 'Pattern Recognition',
      description: 'See your cycles before you spiral. Data beats guesswork.'
    },
    {
      icon: '✅',
      title: 'Zero Habits Required',
      description: 'No daily journaling. No apps to open. Scan once, done forever.'
    }
  ];

  // Cognitive distortions
  const distortions = [
    {
      name: 'All-or-Nothing',
      example: '"I always mess everything up"',
      reframe: 'You made one mistake in a generally successful project.'
    },
    {
      name: 'Catastrophizing',
      example: '"If I fail this, my life is over"',
      reframe: "You've recovered from setbacks before. This is solvable."
    },
    {
      name: 'Mind Reading',
      example: '"They definitely think I\'m an idiot"',
      reframe: 'No evidence they think that. You helped them last week.'
    },
    {
      name: 'Discounting Positives',
      example: '"That win doesn\'t count"',
      reframe: 'You achieved this. Give yourself credit.'
    }
  ];

  let selectedDistortion = 0;
</script>

<section id="why-it-works" class="flow-section py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <span class="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-4 block">
        The Science
      </span>
      <h2 class="text-4xl sm:text-5xl font-black tracking-tight mb-4">
        Why It <span class="text-ember">Works</span>
      </h2>
      <p class="text-xl text-white/50 max-w-2xl mx-auto">
        40+ years of peer-reviewed research. Zero effort required from you.
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="flex flex-wrap justify-center gap-2 mb-12">
      {#each tabs as tab}
        <button
          class="tab-button"
          class:active={activeTab === tab.id}
          on:click={() => (activeTab = tab.id)}
        >
          <span class="tab-icon">{tab.icon}</span>
          <span class="tab-label">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      {#if activeTab === 'science'}
        <!-- Science Tab -->
        <div class="tab-panel">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {#each scienceStats as stat}
              <div class="stat-card">
                <div
                  class="stat-number"
                  class:text-emerald-400={stat.color === 'emerald'}
                  class:text-pink-400={stat.color === 'pink'}
                  class:text-violet-400={stat.color === 'violet'}
                >
                  {stat.stat}
                </div>
                <div class="stat-label">{stat.label}</div>
                <p class="stat-description">{stat.description}</p>
                <div class="mt-3">
                  <SourceLink url={stat.url} label={stat.source} />
                </div>
              </div>
            {/each}
          </div>

          <!-- WHO Callout -->
          <div class="who-callout">
            <div class="who-icon">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-white mb-1">WHO Commission on Social Connection</h4>
              <p class="text-white/60 text-sm">
                In 2023, the World Health Organization declared social disconnection a
                <span class="text-emerald-400 font-medium">global health crisis</span>.
              </p>
              <div class="mt-2">
                <SourceLink
                  url="https://www.who.int/groups/commission-on-social-connection/report"
                  label="WHO 2023 Report"
                />
              </div>
            </div>
          </div>
        </div>
      {:else if activeTab === 'adhd'}
        <!-- ADHD Tab -->
        <div class="tab-panel">
          <div class="text-center mb-8">
            <p class="text-2xl font-bold text-white mb-2">Built for brains that forget to journal.</p>
            <p class="text-white/50">You've tried journaling apps. Morning pages. Gratitude lists. They all require you to remember.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {#each adhdFeatures as feature}
              <div class="adhd-card">
                <span class="text-3xl mb-3 block">{feature.icon}</span>
                <h4 class="font-bold text-white mb-2">{feature.title}</h4>
                <p class="text-sm text-white/50">{feature.description}</p>
              </div>
            {/each}
          </div>

          <!-- ADHD testimonial -->
          <div class="adhd-testimonial">
            <p class="text-lg text-white/70 italic mb-4">
              "I've abandoned every journaling app I've ever tried. This one doesn't ask me to do anything—it just works in the background. Finally, something that understands how my brain works."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                <span class="text-lg">🧠</span>
              </div>
              <div>
                <div class="font-semibold text-sm">Built by someone with ADHD</div>
                <div class="text-xs text-white/40">For brains like ours</div>
              </div>
            </div>
          </div>
        </div>
      {:else if activeTab === 'patterns'}
        <!-- Patterns Tab -->
        <div class="tab-panel">
          <div class="text-center mb-8">
            <p class="text-2xl font-bold text-white mb-2">Catch the lies your brain tells you.</p>
            <p class="text-white/50">AI spots cognitive distortions in your conversations and gently reflects them back.</p>
          </div>

          <!-- Interactive distortion selector -->
          <div class="distortion-grid">
            <div class="distortion-nav">
              {#each distortions as distortion, i}
                <button
                  class="distortion-button"
                  class:active={selectedDistortion === i}
                  on:click={() => (selectedDistortion = i)}
                >
                  {distortion.name}
                </button>
              {/each}
            </div>

            <div class="distortion-content">
              <div class="distortion-example">
                <div class="distortion-label">You said:</div>
                <p class="distortion-text text-red-400/80">{distortions[selectedDistortion].example}</p>
              </div>
              <div class="distortion-arrow">→</div>
              <div class="distortion-reframe">
                <div class="distortion-label">AI reframe:</div>
                <p class="distortion-text text-emerald-400/80">{distortions[selectedDistortion].reframe}</p>
              </div>
            </div>
          </div>

          <p class="text-center text-sm text-white/40 mt-6">
            Your own words, reflected back with context. Not therapy—pattern recognition.
          </p>
        </div>
      {:else if activeTab === 'transform'}
        <!-- Before/After Tab -->
        <div class="tab-panel">
          <div class="transform-grid">
            <!-- Before -->
            <div class="transform-card transform-before">
              <div class="transform-header">
                <span class="text-red-400">BEFORE</span>
              </div>
              <ul class="transform-list">
                <li>
                  <span class="transform-icon">❌</span>
                  <span>10,000+ messages scattered across apps</span>
                </li>
                <li>
                  <span class="transform-icon">❌</span>
                  <span>"When did I talk to James about that?"</span>
                </li>
                <li>
                  <span class="transform-icon">❌</span>
                  <span>Forgot friend's birthday—again</span>
                </li>
                <li>
                  <span class="transform-icon">❌</span>
                  <span>Same arguments, no insight why</span>
                </li>
                <li>
                  <span class="transform-icon">❌</span>
                  <span>Voice notes lost in the void</span>
                </li>
              </ul>
            </div>

            <!-- Arrow -->
            <div class="transform-arrow-center">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <!-- After -->
            <div class="transform-card transform-after">
              <div class="transform-header">
                <span class="text-emerald-400">AFTER</span>
              </div>
              <ul class="transform-list">
                <li>
                  <span class="transform-icon">✓</span>
                  <span>Searchable knowledge graph on your device</span>
                </li>
                <li>
                  <span class="transform-icon">✓</span>
                  <span>Instant search: "restaurant Maria mentioned"</span>
                </li>
                <li>
                  <span class="transform-icon">✓</span>
                  <span>Proactive reminders before it's too late</span>
                </li>
                <li>
                  <span class="transform-icon">✓</span>
                  <span>Pattern detection reveals the "why"</span>
                </li>
                <li>
                  <span class="transform-icon">✓</span>
                  <span>Voice notes transcribed and organized</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  /* Tab buttons */
  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .tab-button:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.05);
  }

  .tab-button.active {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(245, 158, 11, 0.5);
  }

  .tab-icon {
    font-size: 1.125rem;
  }

  @media (max-width: 640px) {
    .tab-label {
      display: none;
    }

    .tab-button {
      padding: 0.75rem 1rem;
    }

    .tab-icon {
      font-size: 1.25rem;
    }
  }

  /* Tab content */
  .tab-content {
    min-height: 400px;
  }

  .tab-panel {
    animation: fadeSlideIn 0.3s ease-out;
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Science stats */
  .stat-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    text-align: center;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  .stat-description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* WHO callout */
  .who-callout {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 1rem;
  }

  .who-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(16, 185, 129, 0.2);
    border-radius: 50%;
  }

  /* ADHD cards */
  .adhd-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    transition: all 0.2s ease;
  }

  .adhd-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(139, 92, 246, 0.3);
  }

  .adhd-testimonial {
    padding: 1.5rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 1rem;
  }

  /* Distortion selector */
  .distortion-grid {
    max-width: 600px;
    margin: 0 auto;
  }

  .distortion-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .distortion-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .distortion-button:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .distortion-button.active {
    color: white;
    background: rgba(245, 158, 11, 0.2);
    border-color: rgba(245, 158, 11, 0.5);
  }

  .distortion-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
  }

  .distortion-arrow {
    text-align: center;
    color: rgba(255, 255, 255, 0.3);
    font-size: 1.5rem;
  }

  .distortion-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.25rem;
  }

  .distortion-text {
    font-size: 1.125rem;
    font-style: italic;
  }

  /* Transform grid */
  .transform-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .transform-grid {
      grid-template-columns: 1fr;
    }

    .transform-arrow-center {
      transform: rotate(90deg);
    }
  }

  .transform-card {
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .transform-before {
    background: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .transform-after {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .transform-header {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .transform-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .transform-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .transform-icon {
    flex-shrink: 0;
  }

  .transform-before .transform-icon {
    color: rgba(239, 68, 68, 0.6);
  }

  .transform-after .transform-icon {
    color: rgba(16, 185, 129, 0.8);
  }

  .transform-arrow-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
