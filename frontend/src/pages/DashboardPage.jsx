import React, { useMemo } from 'react';
import { LayoutDashboard, Calendar, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { useOrders } from '../hooks/useOrders';
import WidgetCard from '../components/dashboard/WidgetCard';
import Select from '../components/ui/Select';
import Spinner from '../components/ui/Spinner';
import { DATE_FILTERS, filterByDateRange } from '../utils/dateFilter';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const DashboardPage = () => {
  const { config, dateFilter, setDateFilter, loading: dashLoading } = useDashboard();
  const { orders, loading: ordersLoading, loadOrders } = useOrders();

  const filteredOrders = useMemo(() => {
    return filterByDateRange(orders, dateFilter);
  }, [orders, dateFilter]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  if (dashLoading || ordersLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" color="var(--primary)" />
        <span className="text-sm font-bold text-text-muted uppercase tracking-widest">
          Loading Dashboard...
        </span>
      </div>
    );
  }

  // Empty state
  if (!config || config.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <LayoutDashboard size={64} className="text-text-muted mx-auto mb-4" />
          <h2
            className="text-2xl font-bold text-text-primary mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Your dashboard is empty
          </h2>
          <p className="text-text-muted mb-6">
            Go to Dashboard Config to add widgets and build your custom analytics view.
          </p>
          <Link to="/app/config">
            <Button className="gap-2">
              <SlidersHorizontal size={18} /> Configure Dashboard →
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1
            className="text-3xl font-extrabold text-text-primary tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Dashboard
          </h1>
          <p className="text-text-muted font-medium mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {today}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border shadow-sm" style={{ borderColor: '#E4E2F0' }}>
          <div className="flex items-center gap-2 pl-3">
            <Calendar size={16} className="text-text-muted" />
            <span className="text-[11px] font-extrabold text-text-muted uppercase tracking-widest">
              Range:
            </span>
          </div>
          <Select
            options={DATE_FILTERS}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-40 !gap-0"
          />
          <div className="h-8 w-px mx-1" style={{ backgroundColor: '#E4E2F0' }} />
          <button
            onClick={loadOrders}
            className="p-2.5 text-text-muted hover:text-primary hover:bg-surface rounded-xl transition-all"
            title="Reload Data"
          >
            <RefreshCw size={16} />
          </button>
          <Link to="/app/config">
            <button className="p-2.5 text-text-muted hover:text-primary hover:bg-surface rounded-xl transition-all" title="Edit Dashboard">
              <SlidersHorizontal size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="dashboard-grid">
        {config.map(widget => {
          const wSpan = widget.config.w || 2;
          const hRows = widget.config.h || 2;
          
          return (
            <div 
              key={widget.id}
              className="widget-gridItem"
              style={{
                '--w-mob': Math.min(wSpan, 4),
                '--w-tab': Math.min(wSpan, 8),
                '--w-desk': wSpan,
                gridRow: `span ${hRows}`,
              }}
            >
              <WidgetCard
                widget={widget}
                orders={filteredOrders}
                isConfig={false}
              />
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div
        className="mt-10 flex items-center justify-between p-8 rounded-3xl overflow-hidden relative group"
        style={{ backgroundColor: '#6C47FF' }}
      >
        <div className="absolute top-0 right-0 p-8 text-white/5 transition-transform group-hover:scale-125">
          <LayoutDashboard size={120} />
        </div>
        <div className="relative z-10 flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white">Need a different view?</h3>
          <p className="font-medium" style={{ color: '#EDE9FF' }}>
            Customize your layout, add new charts, and organize your metrics.
          </p>
        </div>
        <Link to="/app/config" className="relative z-10">
          <Button
            variant="secondary"
            className="bg-white text-primary border-none hover:bg-primary-light hover:text-primary-dark shadow-xl gap-2"
          >
            <SlidersHorizontal size={18} /> Customize Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
