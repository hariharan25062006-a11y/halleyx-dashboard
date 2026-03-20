import React, { useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import OrderStats from '../components/orders/OrderStats';
import OrdersTable from '../components/orders/OrdersTable';
import OrderForm from '../components/orders/OrderForm';
import ConfirmDelete from '../components/ui/ConfirmDelete';

const CustomerOrdersPage = () => {
  const { orders, loading, error, addOrder, editOrder, removeOrder } = useOrders();
  const toast = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // EXPORT AND OTHER LOGIC REMOVED FOR BREVITY IN CHUNK REPLACEMENT. (Not really, leaving it intact).
  
  const handleCreate = () => {
    setFormMode('create');
    setEditData(null);
    setFormOpen(true);
  };

  const handleEdit = (order) => {
    setFormMode('edit');
    setEditData(order);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === 'edit' && editData) {
        await editOrder(editData.id, data);
        toast('Order updated successfully', 'success');
      } else {
        await addOrder(data);
        toast('Order created successfully', 'success');
      }
    } catch (err) {
      toast(err.response?.data?.error || 'Something went wrong', 'error');
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeOrder(deleteTarget.id);
      toast('Order deleted successfully', 'success');
      setDeleteTarget(null);
    } catch (err) {
      toast('Failed to delete order', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    if (!orders || orders.length === 0) {
      toast('No orders to export', 'info');
      return;
    }

    const headers = ['Order ID', 'Customer Name', 'Email', 'Product', 'Quantity', 'Unit Price', 'Total Amount', 'Status', 'Date'];
    
    const rows = orders.map(o => [
      o.order_id,
      `${o.first_name} ${o.last_name}`,
      o.email,
      o.product,
      o.quantity,
      o.unit_price,
      o.total_amount,
      o.status,
      new Date(o.order_date).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `customer_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast('Data exported to CSV', 'success');
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-text-primary tracking-tight">
            Customer Orders
          </h1>
          <p className="text-text-secondary font-medium mt-1">
            Manage your sales pipeline and track fulfillment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2" onClick={handleExport}>
            <Download size={16} /> Export Data
          </Button>
          <Button onClick={handleCreate} className="gap-2 shrink-0">
            <Plus size={18} strokeWidth={2.5} /> Create Order
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 font-medium text-sm flex items-center border border-red-100">
          Could not connect to server. Please make sure the backend is running on port 5000.
        </div>
      )}

      {/* Stats */}
      <div className="mb-10">
        <OrderStats orders={orders} />
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border bg-surface/50 flex items-center justify-between">
          <h3 className="font-bold text-text-primary">Order History</h3>
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-border">
            {orders.length} Total Orders
          </div>
        </div>
        <div className="p-4">
          <OrdersTable 
            orders={orders} 
            loading={loading} 
            onEdit={handleEdit} 
            onDelete={(o) => setDeleteTarget(o)} 
          />
        </div>
      </div>

      {/* Form Modal */}
      <OrderForm
        isOpen={formOpen} onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit} initialData={editData} mode={formMode}
      />

      {/* Delete Confirm */}
      <ConfirmDelete
        isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting}
      />
    </div>
  );
};

export default CustomerOrdersPage;
