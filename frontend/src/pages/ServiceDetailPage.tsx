import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Calendar,
  Code2,
} from 'lucide-react';
import { publicApi } from '../api/client';
import { ServiceItem } from '../types';
import { renderServiceIcon } from './admin/components/ServicesManager';
import { BrandButton } from '../components/common/BrandButton';
import { CustomSoftwareDevelopmentPage } from './CustomSoftwareDevelopmentPage';
import { MobileAppDevelopmentPage } from './MobileAppDevelopmentPage';
import { AiAnalyticsPage } from './AiAnalyticsPage';
import { IiotAutomationPage } from './IiotAutomationPage';
import { MetaverseDevelopmentPage } from './MetaverseDevelopmentPage';
import { ManagedItServicesPage } from './ManagedItServicesPage';
import { StaffingRecruitmentPage } from './StaffingRecruitmentPage';

// Bespoke static service mapping for bespoke landing pages
const BESPOKE_SERVICE_PAGES: Record<string, React.FC> = {
  'custom-software-development': CustomSoftwareDevelopmentPage,
  'mobile-app-development': MobileAppDevelopmentPage,
  'ai-analytics': AiAnalyticsPage,
  'iiot-automation': IiotAutomationPage,
  'metaverse-development': MetaverseDevelopmentPage,
  'managed-it-services': ManagedItServicesPage,
  'staffing-recruitment': StaffingRecruitmentPage,
};

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // If this slug matches one of the canonical bespoke multi-section pages, render it seamlessly
  if (slug && BESPOKE_SERVICE_PAGES[slug]) {
    const BespokeComponent = BESPOKE_SERVICE_PAGES[slug];
    return <BespokeComponent />;
  }

  // Fetch dynamic service from PostgreSQL database via publicApi
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery<ServiceItem>({
    queryKey: ['serviceDetail', slug],
    queryFn: () => publicApi.getServiceBySlug(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-3 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-4xl mx-auto px-6 text-center text-slate-900">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-[#020E26]">Enterprise Service Not Found</h2>
        <p className="text-sm text-slate-600 mb-8 max-w-md mx-auto">
          The service offering you requested could not be located or may have been retired.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#020E26] hover:bg-[#E5A93C] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Services</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30 min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 border-b border-slate-100 bg-[#000B1E] text-white overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          {/* Back to Services Navigation */}
          <div className="mb-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#E5A93C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Enterprise Services</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={`${service.heroImageUrl ? 'lg:col-span-7' : 'lg:col-span-10 max-w-3xl'} space-y-6`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-[#E5A93C]">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{service.tagline || 'Enterprise Capability'}</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5A93C] shrink-0">
                  {renderServiceIcon(service.icon, 'w-7 h-7')}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {service.title}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                {service.shortDescription}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Engage Our Specialists
                </BrandButton>
                <BrandButton to="/portfolio" variant="outline" size="lg">
                  View Related Portfolio
                </BrandButton>
              </div>
            </div>

            {/* Showcase Image / Visual Mockup */}
            {service.heroImageUrl && (
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-blue-500/10 rounded-3xl blur-2xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900/60 aspect-[16/11] w-full">
                  <img
                    src={service.heroImageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OVERVIEW & DELIVERABLES */}
      {/* ========================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Overview */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600 block mb-2">
                  Service Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#020E26]">
                  Strategic Capabilities & Engineering Depth
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                {service.fullDescription ? (
                  service.fullDescription
                    .split('\n\n')
                    .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                ) : (
                  <p>{service.shortDescription}</p>
                )}
              </div>

              {/* Engineering Standard Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <div className="font-bold text-xs text-slate-900">Zero-Trust Security</div>
                  <div className="text-[11px] text-slate-500">GCC & Global compliance</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <div className="font-bold text-xs text-slate-900">High-Performance</div>
                  <div className="text-[11px] text-slate-500">Sub-second SLAs</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <div className="font-bold text-xs text-slate-900">Enterprise Ready</div>
                  <div className="text-[11px] text-slate-500">Scalable cloud topologies</div>
                </div>
              </div>
            </div>

            {/* Right Deliverables & Engagement Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    What We Deliver
                  </span>
                  <h3 className="text-lg font-bold text-[#020E26]">Core Deliverables</h3>
                </div>

                {service.deliverables && service.deliverables.length > 0 ? (
                  <ul className="space-y-3">
                    {service.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-800 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500">
                    Comprehensive deliverables customized per enterprise project engagement.
                  </p>
                )}

                <div className="pt-6 border-t border-slate-200">
                  <Link
                    to="/contact"
                    className="w-full py-3 px-4 rounded-xl bg-[#020E26] hover:bg-[#E5A93C] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Request Technical Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ENGAGEMENT CALL TO ACTION */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#020E26] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
            Enterprise Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Architect Solutions for Your Enterprise?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect with our solution architects in Dubai to discuss requirements, feasibility, and technical roadmaps.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <BrandButton to="/contact" variant="gold" size="lg">
              Start a Conversation
            </BrandButton>
            <BrandButton to="/services" variant="outline" size="lg">
              Explore All Services
            </BrandButton>
          </div>
        </div>
      </section>
    </div>
  );
};
