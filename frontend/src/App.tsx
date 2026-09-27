import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { JobApplicationPage } from './pages/JobApplicationPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ContactPage } from './pages/ContactPage';
import { CustomSoftwareDevelopmentPage } from './pages/CustomSoftwareDevelopmentPage';
import { MobileAppDevelopmentPage } from './pages/MobileAppDevelopmentPage';
import { AiAnalyticsPage } from './pages/AiAnalyticsPage';
import { IiotAutomationPage } from './pages/IiotAutomationPage';
import { MetaverseDevelopmentPage } from './pages/MetaverseDevelopmentPage';
import { ManagedItServicesPage } from './pages/ManagedItServicesPage';
import { StaffingRecruitmentPage } from './pages/StaffingRecruitmentPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

// Layout wrapper for all public marketing pages
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-white selection:bg-[#9873ff] selection:text-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Protected Route Wrapper for Admin CMS
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public PrabhaTech Marketing Website Layout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<CaseStudiesPage />} />
                <Route path="/portfolio/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/case-studies" element={<Navigate to="/portfolio" replace />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopmentPage />} />
                <Route path="/services/enterprise-software" element={<CustomSoftwareDevelopmentPage />} />
                <Route path="/services/mobile-apps" element={<MobileAppDevelopmentPage />} />
                <Route path="/services/mobile-app-development" element={<MobileAppDevelopmentPage />} />
                <Route path="/services/ai-analytics" element={<AiAnalyticsPage />} />
                <Route path="/services/ai-and-analytics" element={<AiAnalyticsPage />} />
                <Route path="/services/iiot-automation" element={<IiotAutomationPage />} />
                <Route path="/services/industrial-iot" element={<IiotAutomationPage />} />
                <Route path="/services/metaverse" element={<MetaverseDevelopmentPage />} />
                <Route path="/services/metaverse-development" element={<MetaverseDevelopmentPage />} />
                <Route path="/services/managed-it-services" element={<ManagedItServicesPage />} />
                <Route path="/services/managed-it" element={<ManagedItServicesPage />} />
                <Route path="/services/recruitment-and-staffing" element={<StaffingRecruitmentPage />} />
                <Route path="/services/staffing-recruitment" element={<StaffingRecruitmentPage />} />
                <Route path="/services/consulting" element={<StaffingRecruitmentPage />} />
                <Route path="/philosophy" element={<PhilosophyPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/insights/:slug" element={<InsightDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/apply" element={<JobApplicationPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Admin CMS Authentication Route */}
              <Route path="/admin" element={<AdminLoginPage />} />

              {/* Enterprise Admin CMS Workspace */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardPage />
                  </ProtectedAdminRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
