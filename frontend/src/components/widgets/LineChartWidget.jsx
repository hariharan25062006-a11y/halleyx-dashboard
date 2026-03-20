import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { getOrdersByDate } from '../../utils/aggregations';

const LineChartWidget = ({ config = {}, orders = [] }) => {
  const { 
    title = 'Line Chart', 
    yAxis = 'total_amount', 
    groupBy = 'day',
    color = '#6C47FF',
    showDataLabel = false
  } = config;
  
  const data = useMemo(() => {
    // We already have a good date aggregator for Line charts
    const aggregated = getOrdersByDate(orders, groupBy);
    // mapped to a generalized "value" for consistency
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
          <LineChart data={data} margin={{ top: 15, right: 20, left: 10, bottom: 20 }}>
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
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            >
              {showDataLabel && (
                <LabelList dataKey="value" position="top" style={{ fontSize: '10px', fill: '#6B7280' }} />
              )}
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartWidget;
