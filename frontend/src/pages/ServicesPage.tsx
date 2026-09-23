import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { ServiceItem } from '../types';
import { InquirySection } from '../components/home/InquirySection';

export const ServicesPage: React.FC = () => {
  const { data: services = [] } = useQuery<ServiceItem[]>({
    queryKey: ['services'],
    queryFn: () => publicApi.getServices(),
  });

  return (
    <div className="pt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 text-center">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#00F0FF] mb-3">
          Agency Capabilities
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Financial UX Strategy & Engineering
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
          We transform digital banking apps, enterprise wealthtech portals, and fintech ecosystems into captivating products that deliver exponential ROI.
        </p>
      </div>

      <ServicesGrid services={services} />
      <InquirySection />
    </div>
  );
};
