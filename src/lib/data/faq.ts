export interface FAQ {
  question: string;
  answer: string;
}

export const featuredFaqs: FAQ[] = [
  {
    question: 'How is this different from therapy apps?',
    answer: "We're not therapy. We don't diagnose or treat. Think of us as an executive intelligence tool—pattern recognition for your conversations. We help you see what's already there. Many users find this complements their therapy beautifully; therapists get richer context, you get better insights between sessions."
  },
  {
    question: 'Will anyone know I use this?',
    answer: "No. There's no app icon on your phone. You're just using WhatsApp—like billions of others. Your data flows to your private Obsidian vault. Even if someone looked at your phone, they'd see nothing unusual. Complete discretion by design."
  },
  {
    question: 'I have ADHD. Will I actually use this?',
    answer: "This was literally built by someone with ADHD. Zero daily habits required. You don't open an app, you don't write anything, you don't remember to do anything. You text people like you already do. Scan a QR code once. That's it. Forever."
  },
  {
    question: 'What exactly happens to my messages?',
    answer: "Your WhatsApp messages flow through our AI for analysis, then land directly in YOUR Obsidian vault on YOUR device. We're a pipeline, not a warehouse. We never store your messages on our servers. You own every byte."
  },
  {
    question: 'Can I use this for work conversations?',
    answer: "Absolutely. Many users track professional relationships, meeting notes, and project context. The 'executive intelligence' framing isn't marketing—it's how many of our users actually use the tool. Your Second Brain doesn't judge what's important to you."
  },
  {
    question: 'What if I want to exclude certain chats?',
    answer: "Full control. Exclude any contact, group, or conversation from processing. Some users only track close friends, others focus on work contacts. Your rules, your filters."
  },
  {
    question: 'Is this just for English speakers?',
    answer: "The AI understands multiple languages. Your insights will be in the language you communicate in. We're expanding language support continuously."
  },
  {
    question: 'Can I cancel anytime?',
    answer: "Yes. Cancel with one click. Your vault stays yours—we just stop processing new messages. No lock-in, no tricks, no guilt-trips. We'd rather you leave happy than stay resentful."
  }
];
