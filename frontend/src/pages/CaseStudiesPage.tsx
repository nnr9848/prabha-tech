import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { CaseStudiesGrid } from '../components/home/CaseStudiesGrid';
import { CaseStudy } from '../types';

export const CaseStudiesPage: React.FC = () => {
  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ['caseStudies', 'all'],
    queryFn: () => publicApi.getCaseStudies(),
  });

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 text-center">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#00F0FF] mb-3">
          Agency Work
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Financial UX & Fintech Case Studies
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
          Explore how we help global retail banks, wealth management unicorns, and DeFi protocols elevate their user experience.
        </p>
      </div>

      <CaseStudiesGrid caseStudies={caseStudies} showFilters={true} />
    </div>
  );
};
