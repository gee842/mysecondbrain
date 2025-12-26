<script lang="ts">
  import { MarketingFooter } from '$lib/components/marketing';
  import MarketingHeader from '$lib/components/landing/MarketingHeader.svelte';
  import { clinicalPricing } from '$lib/data';

  let activeTab: 'traditional' | 'platform' = 'platform';
  let openAccordion: string | null = null;
  let openConcern: number | null = null;

  function toggleAccordion(id: string) {
    openAccordion = openAccordion === id ? null : id;
  }

  const coreProblems = [
    {
      title: 'Limited Observational Window',
      stat: '<1%',
      description: 'Clinicians see patients for 30-60 minutes weekly—less than 1% of their lived experience.'
    },
    {
      title: 'Recall Bias',
      stat: '70%',
      description: 'Patients struggle to accurately recall patterns, events, and emotional states from the past week.'
    },
    {
      title: 'Mood-State Filtering',
      stat: '∞',
      description: 'Self-reporting is colored by current emotional state—someone in crisis may miss longer-term patterns.'
    },
    {
      title: 'Time to Understanding',
      stat: '6-12mo',
      description: 'Building comprehensive understanding of patient patterns typically requires months of weekly sessions.'
    }
  ];

  const selfReportingFilters = [
    { icon: '🧠', label: 'What they remember', issue: 'Often incomplete or distorted' },
    { icon: '🎯', label: 'What they consider relevant', issue: 'May miss critical patterns' },
    { icon: '🎭', label: 'What they\'re comfortable sharing', issue: 'Social desirability bias' },
    { icon: '😔', label: 'What current mood allows', issue: 'State-dependent recall' },
    { icon: '⏱️', label: 'What fits in session time', issue: 'Prioritization under pressure' }
  ];

  const useCases = [
    {
      icon: '📝',
      title: 'Session Preparation',
      description: 'Clients arrive with AI-organized summaries of their week—emotional patterns, recurring themes, and significant conversations. Less time catching up, more time for breakthrough work.',
      gradient: 'from-violet-500/20 to-purple-500/20'
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description: "See objective data on your clients' emotional trajectory over weeks and months. Track whether interventions are working without relying solely on recall.",
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      icon: '🧠',
      title: 'ADHD & Executive Function',
      description: "Clients with executive function challenges often struggle to remember what happened between sessions. Their Second Brain remembers for them—giving you accurate context.",
      gradient: 'from-amber-500/20 to-orange-500/20'
    },
    {
      icon: '💑',
      title: 'Couples Therapy',
      description: 'Each partner can share their communication patterns. See both sides of the story with AI-detected patterns in how they talk to each other.',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      icon: '🏠',
      title: 'Family Systems',
      description: 'Track relationship dynamics across family members. Surface patterns in communication that might otherwise take months to identify.',
      gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      icon: '📋',
      title: 'Homework Compliance',
      description: "Therapy homework actually gets done because it's passive. No journaling apps to remember, no worksheets to fill out. The 'homework' happens automatically.",
      gradient: 'from-indigo-500/20 to-violet-500/20'
    }
  ];

  const queryCategories = [
    {
      id: 'assessment',
      title: 'Diagnostic Assessment',
      icon: '🔍',
      queries: [
        '"Show me patterns consistent with borderline personality disorder over the past 6 months"',
        '"Analyze relationship stability—are there patterns of idealization and devaluation?"',
        '"Compare mood patterns in messages vs. self-reported mood tracking—where are the discrepancies?"'
      ]
    },
    {
      id: 'treatment',
      title: 'Treatment Monitoring',
      icon: '📊',
      queries: [
        '"Has conflict language with family members decreased since we started DBT skills training?"',
        '"Is patient actually using the coping strategies we discussed? Show evidence in their daily communication"',
        '"Compare social engagement patterns: 3 months ago vs. current"'
      ]
    },
    {
      id: 'risk',
      title: 'Risk Assessment',
      icon: '⚠️',
      queries: [
        '"Has social withdrawal increased in the past 2 weeks?"',
        '"Show me patterns of hopelessness or helplessness language over the past month"',
        '"When did the patient last reach out to support network? What was the context?"'
      ]
    },
    {
      id: 'relationships',
      title: 'Relationship Dynamics',
      icon: '🔗',
      queries: [
        '"Map communication patterns with each family member—frequency, tone, conflict topics"',
        '"How does patient\'s communication with partner change during stressful work periods?"',
        '"Show evidence of boundary violations in family system"'
      ]
    }
  ];

  const concerns = [
    {
      question: "Won't this replace the therapeutic relationship?",
      answer: "No—it enhances it. The platform provides objective data to inform clinical judgment, not replace it. The therapeutic relationship remains central—this tool simply ensures that relationship is built on comprehensive understanding rather than limited information. Think of it like medical labs: blood work doesn't replace a physician's clinical expertise, but it provides objective data that makes that expertise more effective."
    },
    {
      question: "What about patients without extensive digital communication?",
      answer: "The platform works best with patients who regularly communicate via text/messaging, have support networks they engage with digitally, and are comfortable with technology integration. It's not appropriate for all patients, but for those who do communicate digitally (increasingly the majority, especially younger populations), it captures invaluable data that's currently invisible to clinical practice."
    },
    {
      question: "How do I know the AI insights are accurate?",
      answer: "Every insight is: cited with specific sources—you can verify the evidence yourself; based on documented behavior—not AI interpretation or inference without grounding; transparent in reasoning—you see how the AI arrived at conclusions; validated with patient—used as conversation starters, not clinical facts. The AI is a research assistant that reads thousands of messages and identifies patterns—but you remain the clinical expert who interprets meaning and develops treatment."
    },
    {
      question: "What about privacy and confidentiality?",
      answer: "Fully local deployment possible (no cloud required). Patient maintains data ownership. HIPAA/GDPR compliant infrastructure available. All communication between patient and their contacts remains private—clinician only sees analyzed patterns with patient consent. Patients can review all AI insights before they're shared with clinician."
    },
    {
      question: "This sounds expensive and time-consuming to set up",
      answer: "Initial setup requires 1-2 hours of clinician training and 30 minutes of patient onboarding. Ongoing usage is 5-10 minutes pre-session vault review. ROI comes from dramatically reduced assessment periods (months → hours), more effective sessions (objective data → targeted work), ability to take on more complex cases with confidence, and better outcomes through deeper understanding."
    }
  ];

  const complianceFeatures = [
    { title: 'Business Associate Agreement (BAA)', description: 'We sign BAAs with all Pro tier clinical users. Your client data is protected under HIPAA regulations.', icon: '📜' },
    { title: 'SOC 2 Type II Certified', description: 'Independent audit confirms our security controls meet enterprise standards for data protection.', icon: '🔒' },
    { title: 'Zero Data Retention', description: 'Pro tier includes immediate deletion after processing. Messages pass through—nothing stored on our servers.', icon: '🗑️' },
    { title: 'Encryption Everywhere', description: 'TLS 1.3 in transit, AES-256 at rest. HSM-protected API keys. Same standards used by major healthcare systems.', icon: '🔐' },
    { title: 'Audit Logs', description: 'Complete access logs for compliance reporting. Know exactly who accessed what and when.', icon: '📋' },
    { title: 'Client-Controlled Sharing', description: 'Clients choose what to share with you. They maintain full control over their vault and can revoke access anytime.', icon: '👤' }
  ];
</script>

<svelte:head>
  <title>For Clinicians - My Second Brain</title>
  <meta name="description" content="AI-augmented mental health practice. Transform everyday communication into clinical intelligence while maintaining the centrality of the therapeutic relationship." />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col">
  <MarketingHeader currentPage="clinical" />
  
  <main class="flex-1 pt-24 pb-16 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-20">
        <span class="text-violet-400 text-sm font-bold uppercase tracking-widest mb-4 block">
          For Therapists & Healthcare Providers
        </span>
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
          See what you've been<br/>
          <span class="text-white/40">missing.</span>
        </h1>
        <p class="text-xl text-white/50 max-w-3xl mx-auto mb-8">
          Your clients live 168 hours a week. You see them for one. 
          <span class="text-white">What happens in the other 167?</span>
        </p>
        <p class="text-lg text-white/40 max-w-2xl mx-auto">
          Transform everyday digital communication into clinical intelligence—enabling you to understand patients more deeply while maintaining the centrality of the therapeutic relationship.
        </p>
      </div>

      <!-- The Problem: Stats Grid -->
      <div class="mb-24">
        <h2 class="text-2xl font-bold text-center mb-4">The Session-Based Limitation</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Traditional mental health care faces structural limitations that impact treatment effectiveness.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#each coreProblems as problem}
            <div class="insight-premium text-center group hover:border-violet-500/30 transition-all duration-300">
              <div class="text-4xl font-black text-violet-400 mb-2 group-hover:scale-110 transition-transform">{problem.stat}</div>
              <h3 class="font-bold text-white mb-2 text-sm">{problem.title}</h3>
              <p class="text-white/40 text-xs">{problem.description}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Self-Reporting Bottleneck -->
      <div class="mb-24 p-8 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10 border border-red-500/20">
        <h2 class="text-2xl font-bold text-center mb-4">The Self-Reporting Bottleneck</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-8">
          Patients filter their experiences through multiple lenses before they reach you.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          {#each selfReportingFilters as filter}
            <div class="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 group hover:bg-white/10 transition-all">
              <span class="text-xl">{filter.icon}</span>
              <div>
                <div class="text-sm font-semibold text-white">{filter.label}</div>
                <div class="text-xs text-white/40">{filter.issue}</div>
              </div>
            </div>
          {/each}
        </div>
        <p class="text-center text-white/30 text-sm mt-6 italic">
          This creates a fundamental gap between clinical understanding and lived reality.
        </p>
      </div>

      <!-- The Solution: Interactive Comparison -->
      <div class="mb-24">
        <div class="text-center mb-12">
          <span class="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-4 block">
            The Solution
          </span>
          <h2 class="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Communication as Clinical Data
          </h2>
          <p class="text-white/50 max-w-2xl mx-auto">
            Transform natural, everyday communication into a structured knowledge base that reveals authentic behavioral patterns over time.
          </p>
        </div>

        <!-- Toggle Tabs -->
        <div class="flex justify-center mb-8">
          <div class="inline-flex rounded-xl bg-white/5 p-1 border border-white/10">
            <button 
              class="px-6 py-3 rounded-lg text-sm font-semibold transition-all {activeTab === 'traditional' ? 'bg-red-500/20 text-red-400' : 'text-white/50 hover:text-white'}"
              on:click={() => activeTab = 'traditional'}
            >
              Traditional Approach
            </button>
            <button 
              class="px-6 py-3 rounded-lg text-sm font-semibold transition-all {activeTab === 'platform' ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/50 hover:text-white'}"
              on:click={() => activeTab = 'platform'}
            >
              With My Second Brain
            </button>
          </div>
        </div>

        <!-- Comparison Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {#if activeTab === 'traditional'}
            <div class="insight-premium border-red-500/20">
              <h3 class="font-bold text-red-400 mb-4 flex items-center gap-2">
                <span class="text-xl">🗣️</span> Session Opening
              </h3>
              <div class="space-y-4">
                <div class="p-4 rounded-lg bg-white/5">
                  <p class="text-white/70 italic">"How was your week?"</p>
                </div>
                <div class="p-4 rounded-lg bg-white/5">
                  <p class="text-white/40 italic">"Fine, I guess... I don't really remember much"</p>
                </div>
                <p class="text-white/30 text-sm">Limited to what patient recalls and chooses to share.</p>
              </div>
            </div>
            <div class="insight-premium border-red-500/20">
              <h3 class="font-bold text-red-400 mb-4 flex items-center gap-2">
                <span class="text-xl">⏱️</span> Time to Understanding
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-white/30 text-sm w-24">Months 1-3:</span>
                  <span class="text-white/50">Building rapport, gathering history</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-white/30 text-sm w-24">Months 4-6:</span>
                  <span class="text-white/50">Starting to see behavioral patterns</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-white/30 text-sm w-24">Months 7-12:</span>
                  <span class="text-white/50">Deeper understanding enabling targeted treatment</span>
                </div>
              </div>
            </div>
          {:else}
            <div class="insight-premium border-emerald-500/20">
              <h3 class="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span class="text-xl">💡</span> Session Opening
              </h3>
              <div class="space-y-4">
                <div class="p-4 rounded-lg bg-emerald-500/10">
                  <p class="text-white/70 italic">"I noticed you text your mom daily but your brother only once a month. The tone with your mom includes frequent apologies and reassurance-seeking. Let's talk about that pattern."</p>
                </div>
                <p class="text-emerald-400/70 text-sm">Grounded in specific, verifiable behavioral data. Patient can't minimize or avoid patterns—the evidence is there.</p>
              </div>
            </div>
            <div class="insight-premium border-emerald-500/20">
              <h3 class="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span class="text-xl">⚡</span> Accelerated Understanding
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-emerald-400/70 text-sm w-24">Session 1-2:</span>
                  <span class="text-white/70">Review 3-6 months of communication data</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-emerald-400/70 text-sm w-24">Session 3-4:</span>
                  <span class="text-white/70">Validate patterns with patient, co-create understanding</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-emerald-400/70 text-sm w-24">Session 5+:</span>
                  <span class="text-white/70">Focus on intervention and change, not pattern discovery</span>
                </div>
              </div>
              <p class="text-emerald-400/50 text-xs mt-4">What typically requires 6-12 months can be synthesized in 1-2 hours of vault review.</p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Clinical Use Cases -->
      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-12">Clinical Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each useCases as useCase}
            <div class="insight-premium group hover:scale-[1.02] transition-all duration-300">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br {useCase.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span class="text-2xl">{useCase.icon}</span>
              </div>
              <h3 class="font-bold text-white mb-3 text-lg">{useCase.title}</h3>
              <p class="text-sm text-white/50 leading-relaxed">{useCase.description}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Clinical Query Examples (Accordion) -->
      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">Sample Clinical Queries</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Ask your Second Brain anything. Every insight is cited with specific sources you can verify.
        </p>
        <div class="space-y-3 max-w-4xl mx-auto">
          {#each queryCategories as category}
            <button
              on:click={() => toggleAccordion(category.id)}
              class="w-full text-left p-5 rounded-xl border transition-all duration-300 {
                openAccordion === category.id
                  ? 'bg-white/10 border-violet-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
              }"
            >
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{category.icon}</span>
                  <span class="font-semibold text-white">{category.title}</span>
                </div>
                <svg
                  class="w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 {openAccordion === category.id ? 'rotate-180' : ''}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {#if openAccordion === category.id}
                <div class="mt-4 pt-4 border-t border-white/10 space-y-3">
                  {#each category.queries as query}
                    <div class="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                      <code class="text-sm text-white/70 font-mono">{query}</code>
                    </div>
                  {/each}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- HIPAA Compliance -->
      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">HIPAA-Compliant by Design</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Pro tier includes full HIPAA compliance. We sign BAAs and maintain SOC 2 Type II certification.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each complianceFeatures as feature}
            <div class="insight-premium">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-2xl">{feature.icon}</span>
                <h4 class="font-bold text-white">{feature.title}</h4>
              </div>
              <p class="text-sm text-white/50">{feature.description}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Addressing Concerns -->
      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">Addressing Clinical Concerns</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          We've thought deeply about how this technology fits into ethical clinical practice.
        </p>
        <div class="space-y-3 max-w-4xl mx-auto">
          {#each concerns as concern, i}
            <button
              on:click={() => openConcern = openConcern === i ? null : i}
              class="w-full text-left p-5 rounded-xl border transition-all duration-300 {
                openConcern === i
                  ? 'bg-white/10 border-emerald-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
              }"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="font-semibold text-white">{concern.question}</span>
                <svg
                  class="w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 {openConcern === i ? 'rotate-180' : ''}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {#if openConcern === i}
                <div class="mt-4 pt-4 border-t border-white/10">
                  <p class="text-white/60 leading-relaxed">{concern.answer}</p>
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Clinical Pricing -->
      <div id="pricing" class="mb-24 p-8 rounded-2xl bg-white/5 border border-white/10">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Clinical Pricing</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div class="p-6 rounded-xl bg-white/5 border border-white/10">
            <div class="text-violet-400 text-sm font-bold uppercase tracking-wider mb-2">Per Client</div>
            <div class="text-4xl font-black mb-2">{clinicalPricing.perClient.price}<span class="text-lg text-white/40">{clinicalPricing.perClient.period}</span></div>
            <p class="text-white/50 text-sm mb-4">{clinicalPricing.perClient.description}</p>
            <ul class="space-y-2 text-sm text-white/60">
              {#each clinicalPricing.perClient.features as feature}
                <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> {feature}</li>
              {/each}
            </ul>
          </div>
          <div class="p-6 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <div class="text-violet-400 text-sm font-bold uppercase tracking-wider mb-2">Enterprise</div>
            <div class="text-4xl font-black mb-2">{clinicalPricing.enterprise.price}</div>
            <p class="text-white/50 text-sm mb-4">{clinicalPricing.enterprise.description}</p>
            <ul class="space-y-2 text-sm text-white/60">
              {#each clinicalPricing.enterprise.features as feature}
                <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> {feature}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="text-center p-12 rounded-2xl bg-gradient-to-r from-violet-500/10 via-transparent to-emerald-500/10 border border-violet-500/20">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Practice?</h2>
        <p class="text-white/50 mb-8 max-w-xl mx-auto">
          The goal isn't to replace the therapeutic relationship—it's to make every moment of that relationship more informed, more effective, and more focused on what truly matters: helping patients understand themselves and change their lives.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="mailto:clinical@mysecondbrain.app" class="btn-premium">
            <span>Contact Clinical Team</span>
          </a>
          <a href="/" class="btn-ghost">
            Back to Home
          </a>
        </div>
        <p class="text-sm text-white/30 mt-6">
          Questions? Email us at <a href="mailto:hipaa@mysecondbrain.app" class="text-violet-400 hover:text-violet-300">hipaa@mysecondbrain.app</a>
        </p>
      </div>
    </div>
  </main>
  
  <MarketingFooter />
</div>
