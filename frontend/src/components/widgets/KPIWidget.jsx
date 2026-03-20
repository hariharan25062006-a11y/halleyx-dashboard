import React from 'react';
import { DollarSign, ShoppingCart, TrendingUp, CheckCircle, Activity } from 'lucide-react';

const getIcon = (metric) => {
  if (metric === 'total_amount' || metric === 'unit_price') return DollarSign;
  if (metric === 'quantity') return ShoppingCart;
  if (metric === 'status') return CheckCircle;
  return Activity;
};

const KPIWidget = ({ config = {}, orders = [] }) => {
  const { 
    title = 'KPI Card', 
    metric = 'total_amount', 
    aggregation = 'Sum',
    format = 'Number',
    precision = 0 
  } = config;

  const Icon = getIcon(metric);

  // Compute Value
  let rawValue = 0;
  if (aggregation === 'Count') {
    rawValue = orders.length;
  } else {
    const sum = orders.reduce((acc, order) => {
      const v = Number(order[metric]) || 0;
      return acc + v;
    }, 0);
    rawValue = aggregation === 'Average' ? (orders.length ? sum / orders.length : 0) : sum;
  }

  // Format Value
  const valNum = Number(rawValue);
  const prec = parseInt(precision, 10) || 0;
  let displayValue = '';

  if (format === 'Currency') {
    displayValue = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: prec, 
      maximumFractionDigits: prec 
    }).format(valNum);
  } else {
    displayValue = new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: prec, 
      maximumFractionDigits: prec 
    }).format(valNum);
  }

  return (
    <div className="flex flex-col h-full justify-between p-6">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-text-muted font-medium">{title}</span>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#EDE9FF' }}
        >
          <Icon size={20} style={{ color: '#6C47FF' }} />
        </div>
      </div>

      {/* Big number */}
      <div
        className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-none mb-4 truncate"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: '#4F2FD6' }}
        title={displayValue}
      >
        {displayValue}
      </div>

      {/* Bottom row */}
      <div>
        {orders.length > 0 ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ↑ Live data
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
            No data
          </span>
        )}
      </div>
    </div>
  );
};

export default KPIWidget;
