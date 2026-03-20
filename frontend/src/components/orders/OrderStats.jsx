import React from 'react';
import { ShoppingCart, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { getTotalRevenue, getTotalOrders } from '../../utils/aggregations';

const OrderStats = ({ orders = [] }) => {
  const totalOrders = getTotalOrders(orders);
  const totalRevenue = getTotalRevenue(orders);
  const completed = orders.filter((o) => o.status === 'Completed').length;
  const pending = orders.filter((o) => o.status === 'Pending').length;

  const cards = [
    { label: 'Total Orders', value: formatNumber(totalOrders), icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Pending', value: pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div 
          key={i} 
          className="bg-white rounded-3xl p-6 border border-border flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
            <c.icon size={26} className={c.color} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
              {c.label}
            </div>
            <div className="text-2xl font-extrabold font-mono text-text-primary truncate">
              {c.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;
