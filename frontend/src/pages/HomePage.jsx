import React from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowRight, BarChart3, Zap, Shield, Globe, Users, Database, Network } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

// Mock data for decorative hero chart
const mockData = [
  { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 }, { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 }, { name: 'Sat', value: 8390 },
  { name: 'Sun', value: 10490 },
];

const FEATURES = [
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Monitor your KPIs with instant data updates and beautiful visualizations.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Built on React and Vite for a seamless, lag-free user experience.' },
  { icon: Shield, title: 'Secure by Default', desc: 'Enterprise-grade security with JWT authentication and encrypted data.' },
  { icon: Globe, title: 'Global Operations', desc: 'Manage orders and customers from over 20+ supported countries.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Built for teams. Track who created what and when with audit logs.' },
  { icon: Database, title: 'Automated Reports', desc: 'Generate customized reports with powerful drag-and-drop widgets.' },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-card font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 animate-[slideInRight_0.6s_ease]">
            <h1 className="text-5xl lg:text-7xl font-extrabold font-display leading-[1.1] text-text-primary tracking-tight mb-6">
              Insights that drive <br />
              <span className="text-gradient">growth.</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
              The ultimate SaaS dashboard for managing orders, building custom analytical views, and growing your revenue faster than ever.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Start Free Trial <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">Sign In</Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm font-medium text-text-secondary">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> No credit card required</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> 14-day free trial</span>
            </div>
          </div>

          <div className="flex-1 w-full max-w-[600px] animate-[fadeInUp_0.8s_ease]">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-white/50 backdrop-blur-xl transition-transform duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-sm font-semibold text-text-secondary mb-1">Total Revenue</div>
                  <div className="text-4xl font-extrabold font-mono text-text-primary">$212,490.00</div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                  +24.5%
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6C47FF" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#6C47FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                    <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="value" stroke="#6C47FF" strokeWidth={4} fill="url(#heroGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/20">
          {[
            { label: 'Active Users', value: '10,000+' },
            { label: 'Data Points Analyzed', value: '5B+' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Customer Satisfaction', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-4xl font-extrabold font-mono text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-primary-light uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold font-display text-text-primary mb-4 tracking-tight">Everything you need to scale</h2>
            <p className="text-lg text-text-secondary leading-relaxed">Halleyx provides a complete suite of tools to manage your orders, analyze performance, and make data-driven decisions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <f.icon size={26} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary mb-3.5">{f.title}</h3>
                <p className="text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
              <Network size={16} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-text-primary">Halleyx.</span>
          </div>
          <p className="text-sm font-medium text-text-muted">
            &copy; {new Date().getFullYear()} Halleyx Systems Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
