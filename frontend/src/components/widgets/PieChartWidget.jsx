import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  getStatusDistribution, getProductDistribution, getCountryDistribution,
} from '../../utils/aggregations';

const CHART_COLORS = [
  '#6C47FF', '#00D4AA', '#F59E0B', '#EF4444',
  '#3B82F6', '#8B5CF6', '#10B981', '#F97316',
];

const PieChartWidget = ({ config = {}, orders = [] }) => {
  const { title = 'Pie Chart', groupBy = 'status' } = config;

  let data = [];
  if (groupBy === 'status') data = getStatusDistribution(orders);
  else if (groupBy === 'product') data = getProductDistribution(orders);
  else if (groupBy === 'country') data = getCountryDistribution(orders);

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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }) =>
                `${name.length > 12 ? name.slice(0, 12) + '…' : name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E4E2F0' }} />
            {config.showLegend && (
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartWidget;
