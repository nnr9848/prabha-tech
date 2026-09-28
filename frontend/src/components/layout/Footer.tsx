import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Globe2, Shield } from 'lucide-react';
import logoImg from '../../assets/prabhatech-white-logo.png';
import { SocialIconsGroup } from '../common/SocialIconsGroup';
import { BrandButton } from '../common/BrandButton';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000B1E] text-slate-300 pt-20 pb-12 border-t border-[#0A1C3E]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#0A1C3E]/80">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="inline-block group">
              <img
                src={logoImg}
                alt="Prabha Technologies Logo"
                className="h-10 sm:h-11 lg:h-14 xl:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Prabha Technologies is an AI innovation hub delivering enterprise software, mobile applications, industrial IoT and managed IT services for a smarter tomorrow.
            </p>
            <div className="pt-2">
              <SocialIconsGroup size="md" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-[#E5A93C] transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-[#E5A93C] transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#E5A93C] transition-colors">Portfolio</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Industries</Link></li>
              <li><Link to="/about" className="hover:text-[#E5A93C] transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-[#E5A93C] transition-colors">Careers</Link></li>
              <li><Link to="/insights" className="hover:text-[#E5A93C] transition-colors">Insights</Link></li>
              <li><Link to="/contact" className="hover:text-[#E5A93C] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/services/custom-software-development" className="hover:text-[#E5A93C] transition-colors">Enterprise Software</Link></li>
              <li><Link to="/services/mobile-app-development" className="hover:text-[#E5A93C] transition-colors">Mobile Applications</Link></li>
              <li><Link to="/services/ai-analytics" className="hover:text-[#E5A93C] transition-colors">AI & Analytics</Link></li>
              <li><Link to="/services/iiot-automation" className="hover:text-[#E5A93C] transition-colors">Industrial IoT & BEMS</Link></li>
              <li><Link to="/services/metaverse-development" className="hover:text-[#E5A93C] transition-colors">Metaverse & Web3</Link></li>
              <li><Link to="/services/managed-it-services" className="hover:text-[#E5A93C] transition-colors">Managed IT Services</Link></li>
              <li><Link to="/services/staffing-recruitment" className="hover:text-[#E5A93C] transition-colors">IT Consulting & Staffing</Link></li>
            </ul>
          </div>

          {/* Col 4: Industries */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Industries</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Manufacturing</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Construction</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Real Estate</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Healthcare</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Retail & Hospitality</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Logistics & Transport</Link></li>
              <li><Link to="/industries" className="hover:text-[#E5A93C] transition-colors">Agriculture</Link></li>
            </ul>
          </div>

          {/* Col 5: Let's Connect */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Let's Connect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discuss your project with our team and explore new possibilities.
            </p>
            <BrandButton to="/contact" variant="gold" size="sm">
              LET'S TALK
            </BrandButton>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Prabha Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
          <p>Crafted & Designed by Prabha Technologies</p>
        </div>
      </div>
    </footer>
  );
};

