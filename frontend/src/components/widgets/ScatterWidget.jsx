import React, { useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

const ScatterWidget = ({ config = {}, orders = [] }) => {
  const { 
    title = 'Scatter Plot', 
    xAxis = 'quantity', 
    yAxis = 'unit_price',
    color = '#6C47FF',
    showDataLabel = false
  } = config;

  const data = useMemo(() => {
    return orders.map(o => ({
      x: Number(o[xAxis]) || 0,
      y: Number(o[yAxis]) || 0,
      name: o.product || 'Order',
    })).filter(d => !isNaN(d.x) && !isNaN(d.y));
  }, [orders, xAxis, yAxis]);

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
          <ScatterChart margin={{ top: 15, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E2F0" />
            <XAxis
              dataKey="x"
              name="X-Axis"
              type="number"
              tick={{ fontSize: 11, fill: '#6B7280' }}
            />
            <YAxis
              dataKey="y"
              name="Y-Axis"
              type="number"
              tick={{ fontSize: 11, fill: '#6B7280' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div
                    style={{
                      background: 'white',
                      border: '1px solid #E4E2F0',
                      borderRadius: 12,
                      padding: '8px 12px',
                    }}
                  >
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                      {d.name}
                    </p>
                    <p style={{ fontSize: 12 }}>
                      X: {d.x} | Y: {d.y}
                    </p>
                  </div>
                );
              }}
            />
            <Scatter data={data} fill={color} opacity={0.75}>
              {showDataLabel && (
                <LabelList dataKey="name" position="top" style={{ fontSize: '10px', fill: '#6B7280' }} />
              )}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScatterWidget;
