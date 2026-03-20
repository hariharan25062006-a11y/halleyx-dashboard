import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { getOrdersByDate } from '../../utils/aggregations';

const AreaChartWidget = ({ config = {}, orders = [] }) => {
  const { 
    title = 'Area Chart', 
    yAxis = 'total_amount', 
    groupBy = 'week',
    color = '#6C47FF',
    showDataLabel = false
  } = config;

  const data = useMemo(() => {
    const aggregated = getOrdersByDate(orders, groupBy);
    return aggregated.map(row => {
      const yVal = Number(row[yAxis === 'total_amount' ? 'revenue' : 'count']);
      return {
        name: row.date,
        value: isNaN(yVal) ? 0 : yVal
      };
    });
  }, [orders, groupBy, yAxis]);

  const isCurrency = yAxis === 'total_amount' || yAxis === 'unit_price';

  return (
    <div className="h-full flex flex-col">
      <h4
        className="text-sm font-bold mb-2 px-6 pt-4"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h4>
      <div className="flex-1 min-h-0 px-2 pb-2">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 15, right: 20, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id={`areaGrad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E2F0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickFormatter={isCurrency ? (v) => '$' + v.toLocaleString() : undefined}
            />
            <Tooltip
              formatter={(v) => (isCurrency ? formatCurrency(v) : v)}
              contentStyle={{ borderRadius: 12, border: '1px solid #E4E2F0' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#areaGrad-${title.replace(/\s+/g, '')})`}
            >
              {showDataLabel && (
                <LabelList dataKey="value" position="top" style={{ fontSize: '10px', fill: '#6B7280' }} />
              )}
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartWidget;
