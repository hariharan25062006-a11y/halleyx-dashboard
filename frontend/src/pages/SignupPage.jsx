import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ui/Toast';
import { Network, UserPlus, Lock, Mail, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { getPasswordStrength } from '../utils/formatters';

const SignupPage = () => {
  const { signup, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.full_name) newErrors.full_name = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password !== form.confirm_password) newErrors.confirm_password = 'Passwords do not match';
    if (!form.terms) newErrors.terms = 'You must agree to the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signup({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });
      toast('Account created successfully! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      toast(err.response?.data?.error || 'Registration failed', 'error');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Right Panel - Branding (Swapped for Signup) */}
      <div className="hidden lg:flex lg:w-1/2 bg-accent relative flex-col justify-between p-16 overflow-hidden order-last">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-2xl" />

        <Link to="/" className="flex items-center gap-3 relative z-10 no-underline group w-fit self-end">
          <span className="font-display text-2xl font-bold text-white tracking-tight">Halleyx.</span>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-lg transition-transform group-hover:scale-110">
            <Network size={22} strokeWidth={2.5} />
          </div>
        </Link>

        <div className="relative z-10 max-w-md ml-auto text-right">
          <h2 className="text-4xl font-extrabold font-display text-white leading-tight mb-6 animate-[slideDown_0.5s_ease]">
            Scale your <br />
            <span className="text-primary underline decoration-4 underline-offset-8">business</span> with <br />
            automated tools.
          </h2>
          <p className="text-[#E0FBF5] text-lg mb-10 leading-relaxed font-medium">
            Take full control of your customer data and analytics with our easy-to-use drag-and-drop dashboard builder.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 animate-[fadeInUp_0.7s_ease] text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div className="text-white font-bold text-lg">Verified Results</div>
            </div>
            <div className="space-y-4">
              {['99.9% Uptime SLA', '24/7 Priority Support', 'Dedicated Account Manager'].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-accent">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[#E0FBF5] text-sm font-medium self-end">
          The all-in-one operations suite.
        </div>
      </div>

      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-surface lg:bg-white">
        <div className="w-full max-w-md animate-[fadeIn_0.5s_ease]">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-accent mb-10 transition-colors">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold font-display text-text-primary mb-3 text-gradient inline-block">Join Halleyx</h1>
            <p className="text-text-secondary">Start your 14-day free trial today. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="John Wilson"
              icon={User}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              error={errors.full_name}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />

            <div className="space-y-2">
              <Input
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                icon={Lock}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
              />
              
              {/* Strength Bar */}
              {form.password && (
                <div className="flex gap-1 h-1.5 px-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`h-full flex-1 rounded-full transition-all duration-500 ${
                        strength >= i * 25 
                        ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-amber-400' : 'bg-emerald-400'
                        : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              icon={Lock}
              value={form.confirm_password}
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              error={errors.confirm_password}
            />

            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                checked={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.checked })}
              />
              <span className="text-xs text-text-secondary leading-relaxed font-medium group-hover:text-text-primary transition-colors">
                I agree to the <button type="button" className="text-primary font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-primary font-bold hover:underline">Privacy Policy</button>.
              </span>
            </label>
            {errors.terms && <span className="block text-xs text-red-500 font-medium -mt-2">{errors.terms}</span>}

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 shadow-lg"
              loading={loading}
            >
              Create Account <UserPlus size={18} />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-text-secondary font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-bold hover:underline underline-offset-4 decoration-2">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
