import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Package, User } from 'lucide-react';
import Badge from '../ui/Badge';
import ContextMenu from '../ui/ContextMenu';
import EmptyState from '../ui/EmptyState';
import { formatCurrency, formatDate, getInitials } from '../../utils/formatters';

const ROWS_PER_PAGE = 10;
const STATUS_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed'];

const OrdersTable = ({ orders = [], onEdit, onDelete, loading }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = orders;
    if (statusFilter !== 'All') result = result.filter((o) => o.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((o) =>
        (`${o.first_name} ${o.last_name}`.toLowerCase().includes(q)) ||
        o.email?.toLowerCase().includes(q) ||
        o.order_id?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  // Reset page when filters change
  React.useEffect(() => { setPage(1); }, [search, statusFilter]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-14 w-full bg-surface rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
        <div className="relative w-full sm:max-w-xs group">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            placeholder="Search orders..."
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 bg-surface border border-transparent rounded-xl pl-11 pr-4 text-sm font-medium text-text-primary focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto px-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all
                ${statusFilter === s 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-border text-text-secondary hover:border-primary/40 hover:text-primary'}
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState 
          icon={Package} 
          title="No orders found" 
          subtitle="Try adjusting your search or category filters." 
          className="my-10"
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface/50">
                  {['Order ID', 'Customer', 'Product', 'Total', 'Status', 'Date', ''].map((label) => (
                    <th key={label} className="px-6 py-4 text-left text-[11px] font-extrabold text-text-muted uppercase tracking-[0.1em] border-b border-border">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {paginated.map((order) => (
                  <tr 
                    key={order.id}
                    className="group hover:bg-surface/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-[13px] font-bold text-primary">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-[11px] text-white shadow-sm"
                          style={{ background: order.customer_color || 'var(--color-primary)' }}
                        >
                          {getInitials(`${order.first_name} ${order.last_name}`)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text-primary">{order.first_name} {order.last_name}</span>
                          <span className="text-[11px] font-medium text-text-muted">{order.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-primary truncate max-w-[140px]">{order.product}</span>
                        <span className="text-[11px] font-medium text-text-muted">Qty: {order.quantity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[14px] font-extrabold text-text-primary">
                      {formatCurrency(order.total_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-text-secondary italic">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ContextMenu onEdit={() => onEdit(order)} onDelete={() => onDelete(order)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-4">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Showing <span className="text-text-primary">{(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}</span> of <span className="text-text-primary">{filtered.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-text-secondary hover:text-primary hover:border-primary disabled:opacity-30 disabled:hover:text-text-secondary disabled:hover:border-border transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-surface border border-border">
                  <span className="text-sm font-bold text-primary">{page}</span>
                  <span className="text-xs font-bold text-text-muted">/</span>
                  <span className="text-sm font-bold text-text-primary">{totalPages}</span>
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-text-secondary hover:text-primary hover:border-primary disabled:opacity-30 disabled:hover:text-text-secondary disabled:hover:border-border transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersTable;
