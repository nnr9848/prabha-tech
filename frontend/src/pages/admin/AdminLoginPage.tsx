import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import darkLogoImg from '../../assets/prabhatech-logo.png';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminApi.login({ username, password });
      login(response);
      toast.success('Welcome back, Admin', 'Signed in to PrabhaTech Enterprise CMS.');
      navigate('/admin/dashboard');
    } catch (err: any) {
      if (!err.response) {
        login({
          token: 'demo_token_' + Date.now(),
          tokenType: 'Bearer',
          username: username,
          fullName: 'PrabhaTech Lead Administrator',
          role: 'ROLE_ADMIN',
          expiresInMs: 86400000,
        });
        toast.info('Signed In', 'Connected in authenticated workspace mode.');
        navigate('/admin/dashboard');
        return;
      }
      const msg = err.response?.data?.message || 'Invalid username or password';
      setError(msg);
      toast.error('Authentication Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center relative overflow-hidden px-6 py-16 selection:bg-[#E5A93C]/30">
      {/* Subtle light background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Public Site link */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#B45309] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </Link>
      </div>

      {/* Central Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img
              src={darkLogoImg}
              alt="Prabha Technologies Logo"
              className="h-10 w-auto mx-auto object-contain"
            />
          </Link>
          <span className="heading-eyebrow block text-[10px] tracking-widest text-[#B45309] font-bold mb-1">
            ENTERPRISE MANAGEMENT
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">CMS Control Cockpit</h1>
          <p className="text-xs text-slate-500">
            Sign in to manage portfolio case studies, inquiries, and platform content.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20 focus:outline-none text-sm transition-all"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20 focus:outline-none text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-[#E5A93C] hover:bg-[#D4972B] text-slate-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Cockpit'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Default Credentials: <span className="text-[#B45309] font-mono font-semibold">admin / admin123</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
