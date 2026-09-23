import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Globe2, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020306] border-t border-white/8 pt-24 pb-12 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] via-[#3877FF] to-[#7C3AED] p-[1.5px] shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-lg text-white">UX</span>
                </div>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-[#00F2FE] transition-colors">
                UXDA
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-sm font-normal">
              The world's leading Financial UX design agency. We architect intuitive digital banking, crypto ecosystems, and wealthtech platforms across 37+ countries.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/20 text-[#00F2FE] font-semibold">
                <Award className="w-3.5 h-3.5" />
                Red Dot Award Winners
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                <Globe2 className="w-3.5 h-3.5 text-[#00F2FE]" />
                Global Clients
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display text-white font-bold text-xs uppercase tracking-[0.15em] mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/case-studies" className="hover:text-[#00F2FE] transition-colors">Case Studies</Link></li>
              <li><Link to="/services" className="hover:text-[#00F2FE] transition-colors">Services & UX Audit</Link></li>
              <li><Link to="/philosophy" className="hover:text-[#00F2FE] transition-colors">FXD Methodology</Link></li>
              <li><Link to="/insights" className="hover:text-[#00F2FE] transition-colors">Fintech Blog & Reports</Link></li>
              <li><Link to="/about" className="hover:text-[#00F2FE] transition-colors">About Agency</Link></li>
            </ul>
          </div>

          {/* Col 3: Expertise */}
          <div>
            <h4 className="font-display text-white font-bold text-xs uppercase tracking-[0.15em] mb-4">Expertise</h4>
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
            <h4 className="font-display text-white font-bold text-xs uppercase tracking-[0.15em] mb-4">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:info@theuxda.com" className="text-white hover:text-[#00F2FE] transition-colors flex items-center gap-1">info@theuxda.com <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
              <li><Link to="/contact" className="hover:text-[#00F2FE] transition-colors">Request Consultation</Link></li>
              <li><Link to="/admin" className="text-xs text-[#64748B] hover:text-[#00F2FE] flex items-center gap-1 mt-3"><Shield className="w-3 h-3" /> Admin CMS Login</Link></li>
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

