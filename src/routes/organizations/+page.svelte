<script lang="ts">
  import { MarketingFooter } from '$lib/components/marketing';
  import MarketingHeader from '$lib/components/landing/MarketingHeader.svelte';

  let activeUseCase: number = 0;
  let openFaq: number | null = null;

  const crisisStats = [
    { stat: '500K+', label: 'Young people waiting', description: 'Currently waiting for mental health services in UK', color: 'red' },
    { stat: '6-12mo', label: 'Average wait time', description: 'Before initial assessment appointment', color: 'amber' },
    { stat: '0', label: 'Monitoring during wait', description: 'Critical deterioration happens invisibly', color: 'orange' },
    { stat: '∞', label: 'Unmet need', description: 'Resource constraints prevent traditional expansion', color: 'violet' }
  ];

  const useCases = [
    {
      id: 'waitlist',
      title: 'Waitlist Management & Crisis Prevention',
      icon: '📋',
      color: 'red',
      challenge: 'Hundreds or thousands of individuals waiting months for services with no monitoring. Deterioration during wait periods leads to more intensive intervention needs.',
      queries: [
        { query: '"Has Emma stopped engaging with her support network in the past 2 weeks? Show change in message frequency and tone"', result: 'Emma\'s messages to friends have dropped from daily to once every 5 days. Tone has shifted from collaborative to passive. No longer initiating conversations. Flag for priority contact.' },
        { query: '"Analyze all waitlist clients—which 5 show withdrawal, increased conflict, or hopelessness language?"', result: 'Ranked risk list with specific evidence citations for each flagged individual' },
        { query: '"Marcus told us he\'s \'doing okay\' but analyze his actual communication patterns over the past month"', result: 'Marcus\'s messages show escalating frustration, sleep complaints increasing from weekly to daily, conflict language in 40% of recent messages vs. 10% baseline. Recommend priority clinical contact.' }
      ],
      impact: ['Transform passive waitlist into actively monitored population', 'Prioritize appointments based on actual deterioration, not just wait time', 'Intervene before crisis escalation reduces need for expensive emergency services', 'Demonstrate duty of care during wait periods to regulators and funders']
    },
    {
      id: 'outcomes',
      title: 'Evidence-Based Outcome Validation',
      icon: '📊',
      color: 'emerald',
      challenge: 'Funders and NHS commissioners demand evidence that interventions create real-world change. Self-reported questionnaires are subject to social desirability bias and don\'t capture actual daily functioning.',
      queries: [
        { query: '"Client reports reduced anxiety after 8 weeks. Validate with behavioral evidence: social plans, conflict language, texting frequency"', result: 'Social engagement increased 40% (initiating plans 3x/month vs. 0 pre-treatment). Conflict markers decreased 60%. Positive affect language increased from 15% to 35%. Objective evidence confirms self-reported improvement.' },
        { query: '"Compare Q3 treatment completers: social functioning at baseline, post-treatment, and 3-month follow-up"', result: 'Treatment group shows 45% increase in support-seeking behavior, 30% increase in reciprocal friendship communication, 25% reduction in isolation patterns.' },
        { query: '"Sarah completed post-treatment questionnaire reporting \'much improved.\' Does her communication support this?"', result: 'Tone analysis shows continued negative affect in 55% of messages. No increase in social plan initiation. Gap between self-report and behavioral evidence suggests need for follow-up.' }
      ],
      impact: ['Provide objective outcome evidence to funders beyond self-report questionnaires', 'Identify clients who need additional support despite reporting improvement', 'Build evidence base for specific intervention effectiveness', 'Demonstrate real-world behavioral change, not just symptom scores']
    },
    {
      id: 'efficiency',
      title: 'Clinical Session Efficiency',
      icon: '⚡',
      color: 'violet',
      challenge: 'Resource-constrained teams need every clinical hour to count. Substantial session time is spent gathering information rather than doing therapeutic work.',
      queries: [
        { query: '"Summarize Sarah\'s week through her actual conversations: work stress, partner conflicts, friend outreach"', result: 'Sarah texted mum 3x about work deadline stress (Wed-Fri). Conflict with partner Thursday evening re: household tasks. Reached out to best friend Jess Friday. Suggested session focus: explore work-relationship stress interaction.' },
        { query: '"Client says they\'re implementing coping strategies. Show evidence in real situations"', result: 'No mentions of breathing exercises in messages. However, evidence of \'going for walks\' when stressed (mentioned to partner 2x). Suggests some strategies not translating to real-world use—explore barriers in session.' },
        { query: '"Give me 3 most important talking points for today\'s session"', result: '1. Withdrawal pattern: Responding but not initiating (5 days straight) 2. Increased irritability: Short responses with family, declined 2 social invitations 3. Sleep complaints: Mentioned being tired in 8 conversations this week vs. usual 1-2' }
      ],
      impact: ['Reduce "catch-up" time by arriving with objective behavioral summary', 'Focus clinical time on therapeutic work rather than information gathering', 'Identify patterns client may not report or recognize themselves', 'Track between-session behavioral implementation of therapeutic strategies']
    },
    {
      id: 'prevention',
      title: 'Early Intervention & Prevention',
      icon: '🛡️',
      color: 'cyan',
      challenge: 'Preventing crisis is more effective than crisis response, but early warning signs are invisible until patients self-report—by which time deterioration is already significant.',
      queries: [
        { query: '"Identify clients showing early isolation patterns: reduced communication frequency, declining invitations, withdrawal language"', result: 'Flagged list of 12 clients with specific evidence for each, enabling proactive outreach before full depressive episode develops' },
        { query: '"Track patterns that precede this client\'s depressive episodes. What markers appear 5-7 days before?"', result: 'Pattern identified: Social withdrawal begins 6 days before reported low mood. Sleep complaints increase 5 days before. Irritability in family messages appears 4 days before. Next time these markers appear, intervene proactively.' },
        { query: '"Monitor all high-risk clients: flag hopelessness language, increased conflict, reduced support-seeking"', result: 'Real-time monitoring enables intervention at early stages rather than waiting for crisis' }
      ],
      impact: ['Shift from reactive crisis response to proactive prevention', 'Demonstrate prevention effectiveness to funders (reduced crisis service utilization)', 'Better outcomes through earlier intervention when issues are more tractable', 'More cost-effective service delivery (prevention cheaper than crisis care)']
    },
    {
      id: 'monitoring',
      title: 'Between-Session Monitoring',
      icon: '👁️',
      color: 'amber',
      challenge: 'Clients seen weekly or bi-weekly leave substantial gaps where deterioration can occur invisibly. Youth services particularly need to monitor wellbeing outside clinical hours.',
      queries: [
        { query: '"Check in on Emma\'s communication patterns between our weekly sessions"', result: 'Automated weekly summaries showing stability or flagging concerning changes' },
        { query: '"Emma didn\'t show up for her appointment today. Review her patterns over past 3 days"', result: 'Emma\'s messages show increased family conflict past 2 days with concerning language about \'wanting to disappear.\' Last outreach to friends was 4 days ago. Recommend immediate safety check-in call.' }
      ],
      impact: ['Maintain care continuity between appointments', 'Catch missed appointment situations that might indicate crisis', 'Provide sense of connection and monitoring even when not in direct clinical contact', 'Reduce adverse events through closer monitoring of at-risk individuals']
    },
    {
      id: 'evaluation',
      title: 'Program Evaluation & Improvement',
      icon: '🔬',
      color: 'pink',
      challenge: 'Understanding which interventions work best requires objective outcome data across cohorts, not just aggregated self-report questionnaires.',
      queries: [
        { query: '"Compare outcomes: DBT skills training vs. CBT for anxiety over 6 months. Which shows greater improvement in social functioning?"', result: 'Data-driven program evaluation with objective behavioral measures' },
        { query: '"Analyze clients who disengaged prematurely. What patterns were present before dropout?"', result: 'Identify early warning signs of disengagement to intervene and improve retention' },
        { query: '"Which clients who completed treatment show sustained improvement 3 months post-discharge?"', result: 'Identify who needs booster sessions or continued support, inform discharge planning' }
      ],
      impact: ['Evidence-based program refinement and resource allocation', 'Identify which interventions work best for which populations', 'Reduce dropout rates through early disengagement warning system', 'Continuous quality improvement based on objective data']
    }
  ];

  const pilotPhases = [
    { phase: 'Phase 1: Foundation', duration: 'Months 1-2', color: 'violet', items: ['Staff training on platform usage, clinical querying, and ethical considerations', 'Patient consent process development and ethics review', 'Select 10-15 appropriate patients for pilot (informed consent critical)', 'Establish data ingestion workflows and security protocols'] },
    { phase: 'Phase 2: Active Pilot', duration: 'Months 3-6', color: 'emerald', items: ['Clinical staff use platform for session preparation and patient monitoring', 'Monthly supervision and feedback sessions to refine workflows', 'Track time savings, clinical insights gained, and early intervention opportunities', 'Document case examples and outcome improvements'] },
    { phase: 'Phase 3: Evaluation & Scale', duration: 'Months 7-9', color: 'amber', items: ['Formal evaluation of pilot outcomes (efficiency, interventions, measurement quality)', 'Decision point: Scale to broader organization or refine approach', 'Develop organizational guidelines and best practices', 'Staff satisfaction and clinical value assessment'] },
    { phase: 'Phase 4: Integration', duration: 'Months 10+', color: 'cyan', items: ['Expand to additional service lines and client populations', 'Integration with existing clinical workflows and systems', 'Ongoing training for new staff', 'Continuous quality improvement based on usage data'] }
  ];

  const successStories = [
    { category: 'Waitlist Management', icon: '📋', color: 'red', quotes: ['We identified 8 clients showing early deterioration signs and moved them to priority appointments—likely prevented 3 crisis presentations to A&E', 'Reduced \'did not attend\' rates by 30% through proactive engagement with clients showing disengagement patterns', 'Funders impressed by our active waitlist monitoring demonstrating duty of care during delays'] },
    { category: 'Outcome Measurement', icon: '📊', color: 'emerald', quotes: ['Generated objective behavioral evidence showing 65% of treatment completers demonstrated sustained real-world improvements 3 months post-discharge', 'Identified gap between self-reported outcomes and behavioral evidence for 25% of clients, enabling targeted booster sessions', 'Commissioning team accepted our outcome data as gold-standard evidence, leading to contract renewal'] },
    { category: 'Clinical Efficiency', icon: '⚡', color: 'violet', quotes: ['Counselors report saving 15-20 minutes per session on information gathering, allowing reallocation to therapeutic work', 'Reduced average assessment period from 4 sessions to 1.5 sessions with more comprehensive patient understanding', 'Able to serve 20% more clients without adding clinical hours through efficiency gains'] },
    { category: 'Prevention', icon: '🛡️', color: 'cyan', quotes: ['Identified emerging crisis patterns for 12 clients over 6 months, intervened early, prevented escalation in 10 cases', 'Demonstrated prevention effectiveness to funders: 70% reduction in crisis service utilization for monitored population', 'Developed predictive early warning patterns specific to our client population'] }
  ];

  const faqs = [
    { question: 'How do we ensure ethical use and safeguard vulnerable clients?', answer: 'Comprehensive staff training on appropriate use, clinical supervision and oversight of platform usage, clear organizational policies on AI insights as decision support (not sole decision-maker), patient consent and rights framework, regular ethics review and patient feedback integration, and compliance with professional guidelines (BACP, UKCP standards).' },
    { question: 'What about clients who don\'t use digital communication extensively?', answer: 'Platform works best with clients who regularly communicate via messaging apps, have support networks they engage with digitally, and are comfortable with technology. Typical ideal candidates: young adults, working professionals, digitally-connected populations. May be less appropriate for elderly clients, those with limited digital literacy, or highly isolated individuals.' },
    { question: 'How do we get clients to consent to this?', answer: 'Key messaging: "This helps your counselor understand what\'s really happening between sessions," "Instead of trying to remember your week, we can look at actual patterns together," "Your counselor will notice if you\'re struggling before it becomes a crisis," "You maintain full control and can review everything." Early pilots show patients appreciate being truly understood, having less catch-up time, and the safety net of monitoring between sessions.' },
    { question: 'What are the costs and implementation requirements?', answer: 'Initial investment: Staff training time (6-8 hours per person), technical setup, pilot management. Ongoing: Platform licensing (based on organization size), support and maintenance, continued training. Expected ROI: Clinical time savings, reduced crisis escalation, better outcomes, stronger funder case. Early pilots suggest 3-6 month payback period through efficiency gains and crisis prevention.' },
    { question: 'How do we integrate with existing systems?', answer: 'Platform designed to complement existing clinical management systems, EHRs, outcome measurement tools, and session documentation practices. Staff queries inform clinical notes in existing systems. Outcome data enriches existing measurement frameworks. Works alongside, not instead of, traditional clinical practice.' }
  ];

  const partnerBenefits = [
    { icon: '🎁', text: 'Initial trial period at no cost while we develop workflows' },
    { icon: '🤝', text: 'Dedicated implementation support tailored to your structure' },
    { icon: '🔧', text: 'Co-development opportunity—your feedback shapes features' },
    { icon: '📚', text: 'Case study collaboration for funder communications' },
    { icon: '💰', text: 'Preferential pricing for post-pilot expansion' },
    { icon: '👥', text: 'Peer learning community access with other pilot organizations' }
  ];
</script>

<svelte:head>
  <title>For Organizations - My Second Brain</title>
  <meta name="description" content="Bridge the care gap with AI-augmented intelligence. Monitor waitlists, measure outcomes, and prevent crises with real-world behavioral data." />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col">
  <MarketingHeader currentPage="organizations" />
  
  <main class="flex-1 pt-24 pb-16 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 block">
          For Mental Health Organizations & Charities
        </span>
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
          Bridge the<br/>
          <span class="text-white/40">care gap.</span>
        </h1>
        <p class="text-xl text-white/50 max-w-3xl mx-auto mb-8">
          500,000+ people waiting. Zero monitoring. 
          <span class="text-white">Until now.</span>
        </p>
        <p class="text-lg text-white/40 max-w-2xl mx-auto">
          Transform everyday communication into clinical intelligence—enabling organizations to monitor patient wellbeing between sessions, prioritize care effectively, and demonstrate real-world outcomes.
        </p>
      </div>

      <div class="mb-24">
        <h2 class="text-2xl font-bold text-center mb-4">The UK Mental Health Crisis</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Traditional service delivery cannot scale to meet overwhelming demand.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#each crisisStats as stat}
            <div class="insight-premium text-center group hover:border-{stat.color}-500/30 transition-all duration-300">
              <div class="text-4xl font-black text-{stat.color}-400 mb-2 group-hover:scale-110 transition-transform">{stat.stat}</div>
              <h3 class="font-bold text-white mb-2 text-sm">{stat.label}</h3>
              <p class="text-white/40 text-xs">{stat.description}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="mb-24 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10 border border-cyan-500/20">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-4">The Core Insight</h2>
          <p class="text-white/60 max-w-3xl mx-auto text-lg">
            People communicate more honestly with friends and family than in clinical settings. A client might minimize struggles in session—<span class="italic">"I'm fine, just tired"</span>—while their messages to friends reveal isolation, conflict, or deteriorating wellbeing.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="text-center">
            <div class="text-4xl mb-3">📱</div>
            <h3 class="font-bold text-white mb-2">Capture</h3>
            <p class="text-white/50 text-sm">With consent, patients export their WhatsApp communication data</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-3">🧠</div>
            <h3 class="font-bold text-white mb-2">Analyze</h3>
            <p class="text-white/50 text-sm">AI identifies behavioral indicators, relationship dynamics, and wellbeing signals</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-3">⚡</div>
            <h3 class="font-bold text-white mb-2">Act</h3>
            <p class="text-white/50 text-sm">Proactive monitoring flags concerning changes for timely intervention</p>
          </div>
        </div>
      </div>

      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">Use Cases for Organizations</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Click each use case to see real query examples and organizational impact.
        </p>

        <div class="flex flex-wrap justify-center gap-2 mb-8">
          {#each useCases as useCase, i}
            <button
              class="px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 {
                activeUseCase === i 
                  ? `bg-${useCase.color}-500/20 text-${useCase.color}-400 border border-${useCase.color}-500/30` 
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
              }"
              on:click={() => activeUseCase = i}
            >
              <span>{useCase.icon}</span>
              <span class="hidden sm:inline">{useCase.title.split(' ')[0]}</span>
            </button>
          {/each}
        </div>

        <div class="insight-premium border-{useCases[activeUseCase].color}-500/20">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-3xl">{useCases[activeUseCase].icon}</span>
            <h3 class="text-2xl font-bold text-white">{useCases[activeUseCase].title}</h3>
          </div>

          <div class="mb-6">
            <h4 class="text-sm uppercase tracking-wider text-white/30 mb-2">The Challenge</h4>
            <p class="text-white/60">{useCases[activeUseCase].challenge}</p>
          </div>

          <div class="mb-6">
            <h4 class="text-sm uppercase tracking-wider text-white/30 mb-4">Example Queries</h4>
            <div class="space-y-4">
              {#each useCases[activeUseCase].queries as query}
                <div class="p-4 rounded-xl bg-white/5 border border-white/10">
                  <code class="text-sm text-cyan-400 font-mono block mb-3">{query.query}</code>
                  <p class="text-sm text-white/50 pl-4 border-l-2 border-emerald-500/30">{query.result}</p>
                </div>
              {/each}
            </div>
          </div>

          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 class="font-bold text-emerald-400 mb-3">Organizational Impact</h4>
            <ul class="space-y-2">
              {#each useCases[activeUseCase].impact as item}
                <li class="text-sm text-white/70 flex items-start gap-2">
                  <span class="text-emerald-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">Implementation for Your Organization</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          A structured pilot program designed for responsible adoption.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each pilotPhases as phase}
            <div class="insight-premium">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs px-2 py-1 rounded-full bg-{phase.color}-500/20 text-{phase.color}-400">
                  {phase.duration}
                </span>
              </div>
              <h3 class="font-bold text-white mb-4">{phase.phase}</h3>
              <ul class="space-y-2">
                {#each phase.items as item}
                  <li class="text-xs text-white/50 flex items-start gap-2">
                    <span class="text-{phase.color}-400 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>

      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">What Success Looks Like</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Real outcomes from organizations using the platform.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each successStories as story}
            <div class="insight-premium">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">{story.icon}</span>
                <h3 class="font-bold text-{story.color}-400">{story.category}</h3>
              </div>
              <div class="space-y-3">
                {#each story.quotes as quote}
                  <p class="text-sm text-white/60 italic pl-4 border-l-2 border-{story.color}-500/30">
                    "{quote}"
                  </p>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="mb-24 p-8 rounded-2xl bg-gradient-to-r from-violet-500/10 via-transparent to-emerald-500/10 border border-violet-500/20">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Early Pilot Partner Benefits</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each partnerBenefits as benefit}
            <div class="flex items-center gap-3 p-4 rounded-xl bg-white/5">
              <span class="text-2xl">{benefit.icon}</span>
              <span class="text-sm text-white/70">{benefit.text}</span>
            </div>
          {/each}
        </div>
        <p class="text-center text-white/40 text-sm mt-6">
          We ask pilot partners to identify staff champions, commit 10-15 patient pilot cohort, and provide regular feedback.
        </p>
      </div>

      <div class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">Organizational FAQs</h2>
        <p class="text-center text-white/50 max-w-2xl mx-auto mb-12">
          Common questions from healthcare organizations.
        </p>
        <div class="space-y-3 max-w-4xl mx-auto">
          {#each faqs as faq, i}
            <button
              on:click={() => openFaq = openFaq === i ? null : i}
              class="w-full text-left p-5 rounded-xl border transition-all duration-300 {
                openFaq === i
                  ? 'bg-white/10 border-cyan-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
              }"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="font-semibold text-white">{faq.question}</span>
                <svg
                  class="w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 {openFaq === i ? 'rotate-180' : ''}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {#if openFaq === i}
                <div class="mt-4 pt-4 border-t border-white/10">
                  <p class="text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <div class="mb-24 p-8 rounded-2xl bg-white/5 border border-white/10">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">What This Means for Your Organization</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div>
            <div class="text-3xl font-black text-cyan-400 mb-2">Scalability</div>
            <p class="text-white/50 text-sm">Monitor more people without proportional increase in clinical hours</p>
          </div>
          <div>
            <div class="text-3xl font-black text-emerald-400 mb-2">Evidence</div>
            <p class="text-white/50 text-sm">Objective behavioral data demonstrating real-world impact</p>
          </div>
          <div>
            <div class="text-3xl font-black text-amber-400 mb-2">Prevention</div>
            <p class="text-white/50 text-sm">Early intervention before crisis escalation</p>
          </div>
          <div>
            <div class="text-3xl font-black text-violet-400 mb-2">Efficiency</div>
            <p class="text-white/50 text-sm">Make limited clinical time more effective</p>
          </div>
          <div>
            <div class="text-3xl font-black text-pink-400 mb-2">Innovation</div>
            <p class="text-white/50 text-sm">Position as leader in technology-augmented care</p>
          </div>
        </div>
      </div>

      <div class="text-center p-12 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10 border border-cyan-500/20">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Service?</h2>
        <p class="text-white/50 mb-8 max-w-xl mx-auto">
          The mental health crisis demands new approaches. Let's explore how this platform could serve your organization and your clients.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="mailto:partnerships@mysecondbrain.app" class="btn-premium">
            <span>Discuss Partnership</span>
          </a>
          <a href="/clinical" class="btn-ghost">
            For Individual Clinicians
          </a>
        </div>
        <p class="text-sm text-white/30 mt-6">
          No pressure, no rush. Contact us at <a href="mailto:partnerships@mysecondbrain.app" class="text-cyan-400 hover:text-cyan-300">partnerships@mysecondbrain.app</a>
        </p>
      </div>
    </div>
  </main>
  
  <MarketingFooter />
</div>
