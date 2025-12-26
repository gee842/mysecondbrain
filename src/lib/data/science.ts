/**
 * Shared Science/Research data for My Second Brain
 * Single source of truth for all research citations and statistics
 */

export interface Study {
  stat: string;
  label: string;
  description: string;
  source: string;
  sourceUrl: string;
  color: 'emerald' | 'pink' | 'violet' | 'cyan' | 'amber';
}

export interface ResearchArea {
  title: string;
  icon: string;
  description: string;
  studies: {
    title: string;
    source: string;
    url: string;
  }[];
  quote: string;
  quoteAuthor: string;
}

/**
 * Key research findings - Featured statistics
 * Used in ScienceSection component and /science page
 */
export const keyFindings: Study[] = [
  {
    stat: '50%',
    label: 'Fewer health center visits',
    description: 'Students who wrote about emotional experiences visited health centers half as often over the following 6 months.',
    source: 'Pennebaker & Beall, 1986',
    sourceUrl: 'https://doi.org/10.1037/0021-843X.95.3.274',
    color: 'emerald'
  },
  {
    stat: '50%',
    label: 'Increased survival likelihood',
    description: 'Meta-analysis of 308,849 participants found strong social connections increase survival by 50%—comparable to quitting smoking.',
    source: 'Holt-Lunstad et al., 2010',
    sourceUrl: 'https://doi.org/10.1371/journal.pmed.1000316',
    color: 'pink'
  },
  {
    stat: '↓',
    label: 'Reduced amygdala activity',
    description: "Simply labeling emotions reduces activity in your brain's fear center. The act of naming what you feel calms the feeling itself.",
    source: 'Lieberman et al., 2007',
    sourceUrl: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x',
    color: 'violet'
  },
  {
    stat: '269',
    label: 'Meta-analyses confirm CBT',
    description: 'Comprehensive review of 269 meta-analyses confirms the effectiveness of cognitive-behavioral techniques for mental health.',
    source: 'Hofmann et al., 2012',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3584580/',
    color: 'cyan'
  }
];

/**
 * Featured studies for landing page section (subset of keyFindings)
 * Limit to 3 for visual balance
 */
export const featuredStudies: Study[] = keyFindings.slice(0, 3);

/**
 * Research areas with detailed explanations
 * Used on dedicated /science page
 */
export const researchAreas: ResearchArea[] = [
  {
    title: 'Expressive Writing',
    icon: '✍️',
    description: "Dr. James Pennebaker's foundational research shows that translating experiences into language literally changes how we process them. 40+ years of studies confirm: writing about emotional events improves physical and mental health.",
    studies: [
      { 
        title: 'Health benefits of expressive writing', 
        source: 'Pennebaker & Beall, 1986', 
        url: 'https://doi.org/10.1037/0021-843X.95.3.274' 
      },
      { 
        title: 'Writing about emotional experiences', 
        source: 'Pennebaker, 1997', 
        url: 'https://doi.org/10.1111/j.1467-9280.1997.tb00403.x' 
      },
      { 
        title: '40-year review of expressive writing', 
        source: 'Pennebaker, 2018', 
        url: 'https://journals.sagepub.com/doi/full/10.1177/1745691617707315' 
      }
    ],
    quote: '"The act of converting emotions into words changes how we think about ourselves and organize our experiences."',
    quoteAuthor: '— Dr. James Pennebaker, University of Texas'
  },
  {
    title: 'Affect Labeling',
    icon: '🏷️',
    description: "Neuroscience research demonstrates that putting feelings into words (\"affect labeling\") reduces the intensity of emotions by quieting the amygdala—the brain's fear and emotion center.",
    studies: [
      { 
        title: 'Putting feelings into words', 
        source: 'Lieberman et al., 2007', 
        url: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x' 
      }
    ],
    quote: '"Simply naming your emotions reduces their intensity. Your brain literally calms down when you label what you\'re feeling."',
    quoteAuthor: '— Neuroimaging research summary'
  },
  {
    title: 'Social Connection',
    icon: '🤝',
    description: 'Loneliness is now recognized as a major public health crisis. Strong social relationships are as important as quitting smoking or exercising for longevity.',
    studies: [
      { 
        title: 'Social relationships and mortality risk', 
        source: 'Holt-Lunstad et al., 2010', 
        url: 'https://doi.org/10.1371/journal.pmed.1000316' 
      },
      { 
        title: 'Global loneliness epidemic', 
        source: 'WHO Commission, 2023', 
        url: 'https://www.who.int/groups/commission-on-social-connection/report' 
      }
    ],
    quote: '"Social isolation increases mortality risk equivalent to smoking 15 cigarettes daily."',
    quoteAuthor: '— WHO Commission on Social Connection, 2023'
  },
  {
    title: 'Self-Monitoring',
    icon: '📊',
    description: 'Tracking your own patterns—without judgment—is one of the most effective tools for behavior change. When you see your patterns clearly, change becomes possible.',
    studies: [
      { 
        title: 'Self-monitoring for behavior change', 
        source: 'Compernolle et al., 2019', 
        url: 'https://doi.org/10.1186/s12966-019-0824-3' 
      },
      { 
        title: 'CBT effectiveness review', 
        source: 'Hofmann et al., 2012', 
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3584580/' 
      }
    ],
    quote: '"What gets measured gets managed. Self-monitoring is the foundation of behavioral change."',
    quoteAuthor: '— Behavioral science consensus'
  }
];

/**
 * WHO citation data - used in multiple places
 */
export const whoReport = {
  year: 2023,
  title: 'WHO Commission on Social Connection',
  description: 'In 2023, the World Health Organization declared social disconnection a global health crisis, citing impacts comparable to smoking, obesity, and physical inactivity.',
  url: 'https://www.who.int/groups/commission-on-social-connection/report',
  shortLabel: 'WHO 2023'
};

/**
 * Hero quote for science section
 */
export const heroQuote = {
  text: '"The act of converting emotions into words changes how we think about ourselves and organize our experiences."',
  author: '— Dr. James Pennebaker, University of Texas'
};
