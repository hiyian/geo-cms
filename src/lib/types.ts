export type HeroDemoItem = {
  rank: number;
  name: string;
  tags: string;
  highlight?: boolean;
  badge?: string;
};

export type HeroDemoScene = {
  id: string;
  assistantName: string;
  assistantLabel: string;
  assistantAccent?: "orange" | "purple" | "cyan";
  userMessage: string;
  aiIntro: string;
  items: HeroDemoItem[];
  footerNote: string;
  badgeGood: string;
  badgeBadLabel: string;
  badgeBad: string;
};

export type HeroContent = {
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  platforms: string[];
  demos: HeroDemoScene[];
};

export type PainPoint = {
  id: string;
  title: string;
  description: string;
  accent: string;
  icon: string;
};

export type PainSection = {
  badge: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  resolveText: string;
  items: PainPoint[];
};

export type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  accent: string;
  current?: boolean;
};

export type TimelineSection = {
  badge: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  ctaBefore: string;
  ctaHighlight: string;
  ctaButton: string;
  ctaHref: string;
  items: TimelineItem[];
};

export type MigrationStat = {
  value: string;
  label: string;
};

export type MigrationSection = {
  quotePrompt: string;
  titleMiddle: string;
  recommend: string;
  invisible: string;
  subtitle: string;
  platforms: string[];
  stats: MigrationStat[];
};

export type GeoCoverItem = {
  title: string;
  description: string;
  features: string[];
};

export type ServicesSection = {
  badge: string;
  title: string;
  subtitle: string;
  covers: GeoCoverItem[];
};

export type StatsSection = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  items: { value: string; label: string; desc: string }[];
  methodTitle: string;
  methodDesc: string;
  methodTags: string[];
};

export type CtaSection = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  phone?: string;
};

export type HomePageData = {
  hero: HeroContent;
  pain: PainSection;
  timeline: TimelineSection;
  migration: MigrationSection;
  servicesSection: ServicesSection;
  stats: StatsSection;
  faqSection: { title: string; subtitle: string };
  cta: CtaSection;
};

export type AboutPageData = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  highlights: { title: string; desc: string }[];
};

export type ContactPageData = {
  title: string;
  subtitle: string;
  formTitle: string;
  successMessage: string;
};
