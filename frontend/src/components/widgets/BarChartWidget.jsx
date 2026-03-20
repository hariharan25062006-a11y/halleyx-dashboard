import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const BarChartWidget = ({ config = {}, orders = [] }) => {
  const { 
    title = 'Bar Chart', 
    xAxis = 'product', 
    yAxis = 'total_amount',
    color = '#6C47FF',
    showDataLabel = false
  } = config;

  const data = useMemo(() => {
    const map = {};
    orders.forEach(order => {
      let xVal = order[xAxis];
      if (xAxis === 'order_date' && order.order_date) {
        xVal = new Date(order.order_date).toLocaleDateString();
      }
      xVal = xVal || 'Unknown';
      
      const yVal = Number(order[yAxis]);
      const add = isNaN(yVal) ? 1 : yVal; 
      
      map[xVal] = (map[xVal] || 0) + add;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [orders, xAxis, yAxis]);

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
          <BarChart data={data} margin={{ top: 15, right: 20, left: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E2F0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickFormatter={isCurrency ? (v) => '$' + v.toLocaleString() : undefined}
            />
            <Tooltip
              formatter={(v) => (isCurrency ? formatCurrency(v) : v)}
              contentStyle={{ borderRadius: 12, border: '1px solid #E4E2F0' }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]}>
              {showDataLabel && (
                <LabelList dataKey="value" position="top" style={{ fontSize: '10px', fill: '#6B7280' }} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartWidget;
