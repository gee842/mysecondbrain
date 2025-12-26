<script lang="ts">
  const steps = [
    {
      number: '01',
      title: 'Scan once. Done forever.',
      description:
        "One QR code links your WhatsApp. Takes 30 seconds. Messages flow automatically—nothing to remember, nothing to do.",
      visual: 'qr',
      color: 'emerald',
      badge: '30-second setup'
    },
    {
      number: '02',
      title: 'AI reads. You relax.',
      description:
        'Claude AI extracts people, topics, tasks, and emotional patterns. Voice notes transcribed. All organized into your Obsidian vault.',
      visual: 'ai',
      color: 'violet',
      badge: '98% token-efficient'
    },
    {
      number: '03',
      title: 'Insights find you.',
      description:
        'Proactive nudges delivered to your WhatsApp. "You haven\'t talked to James in 3 weeks." Like a friend who reads between the lines.',
      visual: 'insight',
      color: 'amber',
      badge: 'Proactive, not reactive'
    }
  ];
</script>

<section id="how-it-works" class="flow-section py-24 px-6 relative">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>

  <div class="max-w-5xl mx-auto relative">
    <!-- Header -->
    <div class="text-center mb-20">
      <span class="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-4 block"> How it works </span>
      <h2 class="text-4xl sm:text-5xl font-black tracking-tight">
        Zero effort. <span class="text-ember">Maximum insight.</span>
      </h2>
    </div>

    <!-- Steps -->
    <div class="steps-container">
      {#each steps as step, i}
        <div class="step" class:reverse={i % 2 === 1}>
          <!-- Text content -->
          <div class="step-text">
            <span class="step-number" class:text-emerald-500={step.color === 'emerald'} class:text-violet-500={step.color === 'violet'} class:text-amber-500={step.color === 'amber'}>
              {step.number}
            </span>
            <h3 class="step-title">{step.title}</h3>
            <p class="step-description">{step.description}</p>
            <div
              class="step-badge"
              class:bg-emerald-500={step.color === 'emerald'}
              class:bg-violet-500={step.color === 'violet'}
              class:bg-amber-500={step.color === 'amber'}
            >
              <span class="step-badge-dot"></span>
              {step.badge}
            </div>
          </div>

          <!-- Visual -->
          <div class="step-visual">
            {#if step.visual === 'qr'}
              <!-- QR Code mockup -->
              <div class="visual-card">
                <div class="qr-mockup">
                  <div class="qr-grid">
                    {#each Array(49) as _, i}
                      <div class="qr-cell" class:filled={Math.random() > 0.4}></div>
                    {/each}
                  </div>
                  <div class="qr-label">Scan with WhatsApp</div>
                </div>
              </div>
            {:else if step.visual === 'ai'}
              <!-- AI Processing mockup -->
              <div class="visual-card">
                <div class="ai-mockup">
                  <div class="ai-message">
                    <span class="ai-sender">You</span>
                    <p>"Had coffee with Maria, she mentioned that Italian place near her office..."</p>
                  </div>
                  <div class="ai-processing">
                    <div class="ai-spinner"></div>
                    <span>Processing...</span>
                  </div>
                  <div class="ai-output">
                    <div class="ai-tag">👤 Maria</div>
                    <div class="ai-tag">📍 Italian restaurant</div>
                    <div class="ai-tag">☕ Social</div>
                  </div>
                </div>
              </div>
            {:else if step.visual === 'insight'}
              <!-- Insight mockup -->
              <div class="visual-card">
                <div class="insight-mockup">
                  <div class="insight-header">
                    <span class="insight-icon">💕</span>
                    <span class="insight-mode">Interpersonal</span>
                  </div>
                  <p class="insight-preview">
                    "You haven't talked to James in almost 3 weeks. Last time was that deep convo about his dad."
                  </p>
                  <div class="insight-meta">
                    <span class="insight-rating">Rating: 9/10</span>
                    <span class="insight-time">2 min ago</span>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .steps-container {
    display: flex;
    flex-direction: column;
    gap: 6rem;
  }

  .step {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .step.reverse {
    direction: rtl;
  }

  .step.reverse > * {
    direction: ltr;
  }

  @media (max-width: 768px) {
    .step,
    .step.reverse {
      grid-template-columns: 1fr;
      gap: 2rem;
      direction: ltr;
    }
  }

  .step-text {
    position: relative;
  }

  .step-number {
    font-size: 6rem;
    font-weight: 900;
    line-height: 1;
    opacity: 0.15;
    position: absolute;
    top: -1rem;
    left: -0.5rem;
    pointer-events: none;
    user-select: none;
  }

  .step-title {
    position: relative;
    font-size: 1.875rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1rem;
    padding-top: 2rem;
  }

  .step-description {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .step-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: black;
    border-radius: 9999px;
  }

  .step-badge-dot {
    width: 0.5rem;
    height: 0.5rem;
    background: currentColor;
    border-radius: 50%;
    opacity: 0.6;
  }

  /* Visual cards */
  .visual-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.25rem;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .visual-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  /* QR Mockup */
  .qr-mockup {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .qr-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    padding: 1rem;
    background: white;
    border-radius: 0.75rem;
  }

  .qr-cell {
    width: 12px;
    height: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }

  .qr-cell.filled {
    background: #000;
  }

  .qr-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* AI Mockup */
  .ai-mockup {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ai-message {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.75rem;
  }

  .ai-sender {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    display: block;
    margin-bottom: 0.25rem;
  }

  .ai-message p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    font-style: italic;
  }

  .ai-processing {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: rgba(139, 92, 246, 0.8);
  }

  .ai-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-top-color: rgba(139, 92, 246, 0.8);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .ai-output {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ai-tag {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 9999px;
    color: rgba(255, 255, 255, 0.8);
  }

  /* Insight Mockup */
  .insight-mockup {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .insight-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

  .insight-preview {
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
    line-height: 1.6;
  }

  .insight-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
