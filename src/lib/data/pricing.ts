export interface PlanFeature {
  text: string;
  included: boolean | 'info';
}

export interface PricingPlan {
  name: string;
  tierKey: string;
  price: string;
  period: string;
  description: string;
  highlight: boolean;
  badge?: string;
  features: PlanFeature[];
  cta: string;
  ctaHref: string;
  ctaStyle: 'primary' | 'ghost';
}

export const clinicalPricing = {
  perClient: {
    price: '$200',
    period: '/mo',
    description: 'For individual client accounts with full HIPAA compliance',
    features: [
      'BAA included',
      'Zero data retention',
      'Priority support'
    ]
  },
  enterprise: {
    price: 'Custom',
    description: 'For practices, clinics, and healthcare organizations',
    features: [
      'Volume discounts',
      'Dedicated success manager',
      'Custom integrations'
    ]
  }
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    tierKey: 'free',
    price: '$0',
    period: '',
    description: 'Get started and see the value.',
    highlight: false,
    features: [
      { text: '500 messages/month', included: true },
      { text: '3 insights/day', included: true },
      { text: 'Basic knowledge graph', included: true },
      { text: 'WhatsApp integration', included: true },
      { text: 'Contributes to training', included: 'info' },
      { text: 'Voice transcription', included: false },
      { text: 'Priority processing', included: false },
      { text: 'HIPAA compliance', included: false }
    ],
    cta: 'Get Started',
    ctaHref: '/register',
    ctaStyle: 'ghost'
  },
  {
    name: 'Lite',
    tierKey: 'lite',
    price: '$20',
    period: '/mo',
    description: 'Full power, flexible privacy.',
    highlight: true,
    badge: 'POPULAR',
    features: [
      { text: 'Unlimited messages', included: true },
      { text: 'Unlimited insights', included: true },
      { text: 'Advanced knowledge graph', included: true },
      { text: 'All messaging platforms', included: true },
      { text: 'Privacy OR training discount', included: true },
      { text: 'Voice transcription', included: true },
      { text: 'Priority processing', included: false },
      { text: 'HIPAA compliance', included: false }
    ],
    cta: 'Start Free Trial',
    ctaHref: '/register?plan=lite',
    ctaStyle: 'primary'
  },
  {
    name: 'Pro',
    tierKey: 'pro',
    price: '$200',
    period: '/mo',
    description: 'Maximum privacy & priority.',
    highlight: false,
    features: [
      { text: 'Unlimited messages', included: true },
      { text: 'Unlimited insights', included: true },
      { text: 'Full knowledge graph + API', included: true },
      { text: 'All messaging platforms', included: true },
      { text: 'Zero data retention', included: true },
      { text: 'Voice transcription', included: true },
      { text: 'Priority processing', included: true },
      { text: 'HIPAA compliance', included: true }
    ],
    cta: 'Start Free Trial',
    ctaHref: '/register?plan=pro',
    ctaStyle: 'ghost'
  }
];
