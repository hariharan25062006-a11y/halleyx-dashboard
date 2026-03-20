import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/formatters';
import Badge from '../ui/Badge';

const COLUMN_MAP = {
  'id': { label: 'Order ID', render: (o) => o.order_id || o.id },
  'first_name': { label: 'Customer', render: (o) => `${o.first_name || ''} ${o.last_name || ''}`.trim() },
  'email': { label: 'Email', render: (o) => o.email },
  'phone_number': { label: 'Phone', render: (o) => o.phone_number },
  'street_address': { label: 'Address', render: (o) => o.street_address },
  'order_date': { label: 'Date', render: (o) => new Date(o.order_date).toLocaleDateString() },
  'product': { label: 'Product', render: (o) => o.product },
  'quantity': { label: 'Qty', render: (o) => o.quantity },
  'unit_price': { label: 'Unit Price', render: (o) => formatCurrency(o.unit_price) },
  'total_amount': { label: 'Total', render: (o) => formatCurrency(o.total_amount) },
  'status': { label: 'Status', render: (o) => <Badge status={o.status} /> },
  'created_by': { label: 'Created By', render: (o) => o.created_by },
};

const DEFAULT_COLS = ['id', 'first_name', 'product', 'quantity', 'total_amount', 'status'];

const TableWidget = ({ config = {}, orders = [] }) => {
  const { 
    title = 'Top Orders', 
    sortBy = 'desc', 
    rows = 5,
    columns = DEFAULT_COLS,
    fontSize = 14,
    headerBg = '#54bd95'
  } = config;

  const data = useMemo(() => {
    let sorted = [...orders];
    
    // basic sort (desc by default usually means by total_amount or order_date)
    // if sortBy is explicitly order_date, we sort by date. Otherwise asc/desc assume total_amount.
    sorted.sort((a, b) => {
      if (sortBy === 'order_date') {
        return new Date(b.order_date) - new Date(a.order_date);
      }
      const valA = Number(a.total_amount) || 0;
      const valB = Number(b.total_amount) || 0;
      return sortBy === 'asc' ? valA - valB : valB - valA;
    });

    return sorted.slice(0, rows);
  }, [orders, sortBy, rows]);

  const activeColumns = columns.map(c => ({ id: c, ...COLUMN_MAP[c] })).filter(c => c.label);

  return (
    <div className="h-full flex flex-col pt-3" style={{ fontSize: `${fontSize}px` }}>
      <h4
        className="font-bold px-6 py-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h4>
      <div className="flex-1 overflow-y-auto min-h-0">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10" style={{ backgroundColor: headerBg }}>
            <tr>
              {activeColumns.map(col => (
                <th key={col.id} className="px-4 py-2.5 font-extrabold text-white uppercase tracking-widest whitespace-nowrap" style={{ fontSize: '0.85em' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((order, i) => (
              <tr
                key={i}
                className="border-b transition-colors hover:bg-surface"
                style={{ borderColor: '#E4E2F0' }}
              >
                {activeColumns.map(col => (
                  <td key={col.id} className="px-4 py-2.5 text-text-primary whitespace-nowrap">
                    {col.render(order)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={activeColumns.length} className="text-center py-8 text-text-muted">
                  No orders to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWidget;
