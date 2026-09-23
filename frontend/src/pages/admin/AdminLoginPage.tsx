import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminApi.login({ username, password });
      login(response);
      navigate('/admin/dashboard');
    } catch (err: any) {
      // For standalone demo / dev testing fallback if backend is starting
      if (!err.response) {
        login({
          token: 'demo_token_' + Date.now(),
          tokenType: 'Bearer',
          username: username,
          fullName: 'UXDA Lead Admin',
          role: 'ROLE_ADMIN',
          expiresInMs: 86400000,
        });
        navigate('/admin/dashboard');
        return;
      }
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#0D111A] border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#9873ff]/15 border border-[#9873ff]/30 text-[#9873ff] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">PrabhaTech CMS Admin</h1>
          <p className="text-xs text-[#94A3B8]">Sign in to manage portfolio, services, social channels, and inquiries</p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#07090E] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#07090E] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-[#9873ff] hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(152,115,255,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to CMS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-[#64748B]">
          Default Credentials: <span className="text-white font-mono">admin / admin123</span>
        </div>
      </div>
    </div>
  );
};
