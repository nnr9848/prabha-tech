import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Globe2, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#04060A] border-t border-white/10 pt-20 pb-12 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#7928CA] p-[2px]">
                <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-lg text-white">UX</span>
                </div>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">UXDA</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-sm">
              The world's leading Financial UX design agency. We architect intuitive digital banking, crypto ecosystems, and wealthtech platforms across 37+ countries.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#00F0FF]">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                <Award className="w-3.5 h-3.5" />
                Red Dot Award Winners
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white">
                <Globe2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                Global Clients
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/case-studies" className="hover:text-[#00F0FF] transition-colors">Case Studies</Link></li>
              <li><Link to="/services" className="hover:text-[#00F0FF] transition-colors">Services & UX Audit</Link></li>
              <li><Link to="/philosophy" className="hover:text-[#00F0FF] transition-colors">FXD Methodology</Link></li>
              <li><Link to="/insights" className="hover:text-[#00F0FF] transition-colors">Fintech Blog & Reports</Link></li>
              <li><Link to="/about" className="hover:text-[#00F0FF] transition-colors">About Agency</Link></li>
            </ul>
          </div>

          {/* Col 3: Expertise */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Expertise</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-white/80">Digital Banking UX</span></li>
              <li><span className="text-white/80">Wealthtech & AI Coaching</span></li>
              <li><span className="text-white/80">Crypto & Web3 Interfaces</span></li>
              <li><span className="text-white/80">B2B SaaS & Treasury</span></li>
              <li><span className="text-white/80">Enterprise Design Systems</span></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:info@theuxda.com" className="text-white hover:text-[#00F0FF] transition-colors flex items-center gap-1">info@theuxda.com <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
              <li><Link to="/contact" className="hover:text-[#00F0FF] transition-colors">Request Consultation</Link></li>
              <li><Link to="/admin" className="text-xs text-[#64748B] hover:text-[#00F0FF] flex items-center gap-1 mt-3"><Shield className="w-3 h-3" /> Admin CMS Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} UXDA Clone — Built with React Vite TS, Tailwind CSS & Spring Boot.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
