import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { HeroSection } from '../components/home/HeroSection';
import { ImpactStatsSection } from '../components/home/ImpactStatsSection';
import { CaseStudiesGrid } from '../components/home/CaseStudiesGrid';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { PhilosophySection } from '../components/home/PhilosophySection';
import { InquirySection } from '../components/home/InquirySection';
import { CaseStudy, ServiceItem, Article } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { PillButton } from '../components/common/PillButton';

export const HomePage: React.FC = () => {
  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ['caseStudies', 'featured'],
    queryFn: () => publicApi.getCaseStudies(),
    initialData: [
      {
        slug: 'cr2-digital-banking-platform',
        title: 'BankWorld: Redefining Global ATM & Digital Banking',
        subtitle: 'Empowering millions of users worldwide with an intuitive next-generation banking ecosystem',
        clientName: 'CR2 (Global Banking Software)',
        category: 'Banking',
        heroImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80',
        summary: 'PrabhaTech engineered an omni-channel financial UX ecosystem for CR2 BankWorld, streamlining retail banking, business finance, and smart ATM transactions into a singular frictionless experience.',
        awards: ['Red Dot Award Winner', 'IF Design Award'],
        metrics: [{ label: '+180%', description: 'Digital Engagement' }, { label: '60+', description: 'Countries Deployed' }],
        tags: ['Fintech', 'Omnichannel', 'Design System'],
        featured: true,
      },
      {
        slug: 'myeva-wealthtech-ai-financial-coach',
        title: "myEva: World's First AI-Driven Wealth & Pension Coach",
        subtitle: 'Democratizing financial wellbeing and automated wealth management for enterprise workforces',
        clientName: 'Wealth Wizards',
        category: 'Wealthtech',
        heroImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
        summary: 'Transforming complex UK pension advice and investment planning into a warm, conversational AI mentor that builds tailored financial fitness roadmaps.',
        awards: ['Banking Technology Awards'],
        metrics: [{ label: '£1B+', description: 'Guided Assets' }, { label: '+350%', description: 'Active Users' }],
        tags: ['AI Coach', 'Wealthtech', 'Conversational UI'],
        featured: true,
      },
    ],
  });

  const { data: services = [] } = useQuery<ServiceItem[]>({
    queryKey: ['services'],
    queryFn: () => publicApi.getServices(),
    initialData: [
      {
        slug: 'financial-ux-engineering',
        title: 'Financial UX & UI Design',
        tagline: 'Designing world-class financial interfaces',
        icon: 'Layers',
        shortDescription: 'We engineer state-of-the-art mobile banking, web platforms, and wealthtech dashboards that turn complex finance into effortless, delightful journeys.',
        deliverables: ['Fintech UX Audit', 'Customer Journey Maps', 'Design System & Tokens', 'Hi-Fi Prototyping'],
      },
      {
        slug: 'fintech-digital-transformation',
        title: 'Fintech Product Strategy & Architecture',
        tagline: 'Unifying vision and tech',
        icon: 'Compass',
        shortDescription: 'Guiding tier-1 banks and fintech unicorns through holistic product evolution, competitive disruption, and human-centered architecture.',
        deliverables: ['Product Vision Roadmap', 'Competitive Fintech Benchmark', 'Information Architecture'],
      },
      {
        slug: 'ux-audit-optimization',
        title: 'Fintech UX Audit & Optimization',
        tagline: 'Pinpointing friction & drop-offs',
        icon: 'Zap',
        shortDescription: 'In-depth forensic UX analysis across your mobile apps and web platforms with actionable recommendations to skyrocket onboarding and retention.',
        deliverables: ['Heuristic Evaluation Report', 'Friction Heatmaps', 'Conversion Rate Optimization Plan'],
      },
    ],
  });

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['articles', 'featured'],
    queryFn: () => publicApi.getArticles(undefined, true),
    initialData: [
      {
        slug: '10-fintech-design-trends-2026',
        title: 'Top 10 Fintech Design Trends That Are Transforming Banking in 2026',
        excerpt: 'Discover how spatial financial experiences, ambient AI agents, and hyper-personalized interfaces are redefining customer loyalty.',
        content: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
        authorName: 'Alex Kreger',
        category: 'Fintech Trends',
        readTime: '6 min read',
      },
      {
        slug: 'why-traditional-banking-apps-fail',
        title: 'Why 70% of Banking Digital Transformations Fail and How UX Solves It',
        excerpt: 'A deep dive into the systemic architectural and design flaws holding back legacy banking institutions from true digital disruption.',
        content: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        authorName: 'Linda Zaikovska',
        category: 'Strategy',
        readTime: '8 min read',
      },
    ],
  });

  return (
    <div>
      <HeroSection />
      <ImpactStatsSection />
      <CaseStudiesGrid caseStudies={caseStudies} />
      <ServicesGrid services={services} />
      <PhilosophySection />

      {/* Featured Insights Section */}
      <section className="py-24 relative z-10 bg-[#07090E]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#9873ff] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Fintech Design Insights
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Latest Research, Frameworks & Trends
              </h2>
            </div>
            <PillButton to="/insights" size="sm" variant="secondary">
              View All Articles
            </PillButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art, idx) => (
              <Link
                key={art.slug || idx}
                to={`/insights/${art.slug}`}
                className="group rounded-2xl bg-[#0D111A] border border-white/10 overflow-hidden hover:border-[#9873ff]/40 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden bg-black relative">
                  <img
                    src={art.coverImageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 border border-white/10 text-[#9873ff]">
                    {art.category}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#64748B] mb-2 flex items-center gap-3">
                      <span>By {art.authorName}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#9873ff] transition-colors mb-3">
                      {art.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-wider text-[#9873ff]">
                    <span>Read Full Insight</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InquirySection />
    </div>
  );
};
