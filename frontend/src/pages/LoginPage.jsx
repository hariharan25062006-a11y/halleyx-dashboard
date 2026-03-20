import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ui/Toast';
import { Network, LogIn, Lock, Mail, ArrowLeft, BarChart2 } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(form);
      toast('Welcome back!', 'success');
      navigate('/app/dashboard');
    } catch (err) {
      toast(err.response?.data?.error || 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel - Branding & Stats */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col justify-between p-16 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-[-5%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-2xl" />

        <Link to="/" className="flex items-center gap-3 relative z-10 no-underline group w-fit">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg transition-transform group-hover:scale-110">
            <Network size={22} strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-tight">Halleyx.</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-extrabold font-display text-white leading-tight mb-6 animate-[slideInRight_0.5s_ease]">
            Elevate your <br />
            <span className="text-accent underline decoration-4 underline-offset-8">workflow</span> with <br />
            real-time insights.
          </h2>
          <p className="text-primary-light text-lg mb-10 leading-relaxed font-medium">
            Join thousands of businesses scaling their operations with Halleyx’s intuitive dashboard and order management.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 animate-[fadeInUp_0.7s_ease]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <BarChart2 size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-primary-light uppercase tracking-widest mb-0.5">Live Snapshot</div>
                <div className="text-xl font-extrabold text-white font-mono">+$42,890.00</div>
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full animate-[slideInRight_1.5s_ease_infinite]" 
                    style={{ width: `${30 + i * 15}%`, animationDelay: `${i * 0.2}s` }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-primary-light text-sm font-medium">
          &copy; {new Date().getFullYear()} Halleyx Systems Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-surface lg:bg-white">
        <div className="w-full max-w-md animate-[fadeIn_0.5s_ease]">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-extrabold font-display text-text-primary mb-3">Sign in</h1>
            <p className="text-text-secondary">Enter your credentials to access your account dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
              />
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              loading={loading}
            >
              Sign in <LogIn size={18} />
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-border text-center">
            <p className="text-sm text-text-secondary font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
