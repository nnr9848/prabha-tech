import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Globe2, Shield } from 'lucide-react';
import logoImg from '../../assets/prabhatech-logo.png';
import { SocialIconsGroup } from '../common/SocialIconsGroup';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020306] border-t border-white/8 pt-24 pb-12 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="PrabhaTech Logo"
                className="h-9 w-auto object-contain brightness-0 invert transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-sm font-normal">
              The world's leading Financial UX design agency. We architect intuitive digital banking, crypto ecosystems, and wealthtech platforms across 37+ countries.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9873ff]/10 border border-[#9873ff]/20 text-[#9873ff] font-semibold">
                <Award className="w-3.5 h-3.5" />
                Red Dot Award Winners
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                <Globe2 className="w-3.5 h-3.5 text-[#9873ff]" />
                Global Clients
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display text-white font-bold text-xs uppercase tracking-[0.15em] mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/case-studies" className="hover:text-[#9873ff] transition-colors">Case Studies</Link></li>
              <li><Link to="/services" className="hover:text-[#9873ff] transition-colors">Services & UX Audit</Link></li>
              <li><Link to="/philosophy" className="hover:text-[#9873ff] transition-colors">FXD Methodology</Link></li>
              <li><Link to="/insights" className="hover:text-[#9873ff] transition-colors">Fintech Blog & Reports</Link></li>
              <li><Link to="/about" className="hover:text-[#9873ff] transition-colors">About Agency</Link></li>
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
              <li><a href="mailto:info@prabhatech.com" className="text-white hover:text-[#9873ff] transition-colors flex items-center gap-1">info@prabhatech.com <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
              <li><a href="tel:+971543255456" className="text-white hover:text-[#9873ff] transition-colors">+971 54 325 5456</a></li>
              <li><Link to="/contact" className="hover:text-[#9873ff] transition-colors">Request Consultation</Link></li>
              <li><Link to="/admin" className="text-xs text-[#64748B] hover:text-[#9873ff] flex items-center gap-1 mt-3"><Shield className="w-3 h-3" /> Admin CMS Login</Link></li>
            </ul>

            {/* Social Icons Row */}
            <div className="mt-5">
              <SocialIconsGroup size="sm" />
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} Prabha Technologies. All Rights Reserved.</p>
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

