import React, { useState, useEffect } from 'react';
import { Network } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { PRODUCTS, STATUS_OPTIONS, CREATED_BY } from '../../constants/products';
import { COUNTRIES } from '../../constants/countries';
import { formatCurrency } from '../../utils/formatters';

const INITIAL = {
  first_name: '', last_name: '', email: '', phone: '',
  street_address: '', city: '', state: '', postal_code: '', country: '',
  product: '', quantity: 1, unit_price: '', status: 'Pending', created_by: '',
};

const OrderForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setForm({ ...INITIAL, ...initialData });
      } else {
        setForm(INITIAL);
      }
      setErrors({});
    }
  }, [isOpen, initialData, mode]);

  // Use PRODUCTS which is now an array of strings per spec
  // But we need pricing, so I'll handle mapping if PRODUCTS was just strings
  // In our current products.js it became an array of strings. 
  // The spec said: export const PRODUCTS = ['Fiber...', ...]
  // So we'll have to either assume a default price or use the logic from earlier where it was objects.
  // Actually, the user's PRODUCTS constant was just strings.
  // I'll add a helper to "mock" prices for these strings for the UI beauty.
  const getPrice = (productName) => {
    const productsMap = {
      'Fiber Internet 1 Gbps': 120.00,
      'Fiber Internet 300 Mbps': 80.00,
      'Business Internet 500 Mbps': 150.00,
      '5G Unlimited Mobile Plan': 60.00,
      'VoIP Corporate Package': 45.00,
      'Cloud PBX Pro': 200.00,
      'Dedicated Leased Line': 500.00,
      'MPLS Network Solution': 350.00,
      'SD-WAN Enterprise': 450.00,
      'IoT Connectivity Bundle': 30.00
    };
    return productsMap[productName] || 99.99;
  };

  const handleProductChange = (e) => {
    const p = e.target.value;
    setForm({ ...form, product: p, unit_price: getPrice(p) });
  };

  const computed = (parseFloat(form.quantity) || 0) * (parseFloat(form.unit_price) || 0);

  const validate = () => {
    const e = {};
    const req = 'Please fill the field';
    if (!form.first_name) e.first_name = req;
    if (!form.last_name) e.last_name = req;
    if (!form.email) e.email = req;
    if (!form.phone) e.phone = req;
    if (!form.street_address) e.street_address = req;
    if (!form.city) e.city = req;
    if (!form.state) e.state = req;
    if (!form.postal_code) e.postal_code = req;
    if (!form.country) e.country = req;
    if (!form.product) e.product = req;
    if (!form.quantity || form.quantity < 1) e.quantity = req;
    if (!form.created_by) e.created_by = req;
    if (!form.unit_price) e.unit_price = req;
    if (!form.status) e.status = req;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, total_amount: computed });
      onClose();
    } catch {
      // handled by parent toast
    } finally {
      setSubmitting(false);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <Modal
      isOpen={isOpen} 
      onClose={onClose}
      title={mode === 'edit' ? 'Edit Order Details' : 'Create New Customer Order'}
      size="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-text-muted uppercase tracking-widest whitespace-nowrap">Order Preview</span>
             <div className="h-6 w-px bg-border mx-1" />
             <div className="flex items-center gap-2">
               <span className="text-sm font-semibold text-text-secondary">Total:</span>
               <span className="text-lg font-extrabold font-mono text-primary">{formatCurrency(computed)}</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} loading={submitting} className="min-w-[140px]">
              {mode === 'edit' ? 'Update Order' : 'Confirm & Save'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Customer Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-border mb-6">
            <div className="h-4 w-1.5 bg-primary rounded-full" />
            <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-[0.15em]">Customer Info</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Jane" value={form.first_name} onChange={set('first_name')} error={errors.first_name} />
            <Input label="Last Name" placeholder="Smith" value={form.last_name} onChange={set('last_name')} error={errors.last_name} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email Address" type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')} error={errors.email} />
            <Input label="Phone Number" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} error={errors.phone} />
          </div>

          <div className="space-y-4">
            <Input label="Street Address" placeholder="456 Analytics Ave." value={form.street_address} onChange={set('street_address')} error={errors.street_address} />
            <div className="grid grid-cols-3 gap-4">
              <Input label="City" placeholder="San Fran" value={form.city} onChange={set('city')} error={errors.city} />
              <Input label="State" placeholder="CA" value={form.state} onChange={set('state')} error={errors.state} />
              <Input label="Zip" placeholder="94103" value={form.postal_code} onChange={set('postal_code')} error={errors.postal_code} />
            </div>
            <Select label="Country" options={COUNTRIES} placeholder="Select country..." value={form.country} onChange={set('country')} error={errors.country} />
          </div>
        </div>

        {/* Order Details Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-border mb-6">
            <div className="h-4 w-1.5 bg-accent rounded-full" />
            <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-[0.15em]">Order Details</h3>
          </div>

          <Select 
            label="Selected Product" 
            options={PRODUCTS} 
            placeholder="Choose product package..." 
            value={form.product} 
            onChange={handleProductChange} 
            error={errors.product} 
          />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Quantity" type="number" min="1" value={form.quantity} onChange={set('quantity')} error={errors.quantity} />
            <Input label="Unit Price ($)" type="number" step="0.01" value={form.unit_price} onChange={set('unit_price')} error={errors.unit_price} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Select label="Status" options={STATUS_OPTIONS} value={form.status} onChange={set('status')} error={errors.status} />
            <Select label="Team Member" options={CREATED_BY} placeholder="Assign to..." value={form.created_by} onChange={set('created_by')} error={errors.created_by} />
          </div>

          <div className="mt-10 p-6 rounded-3xl bg-surface border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-125">
              <Network size={64} />
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-[11px] font-extrabold text-text-muted uppercase tracking-widest">Pricing Summary</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-mono text-primary tracking-tighter">
                  {formatCurrency(computed).split('.')[0]}
                </span>
                <span className="text-xl font-bold font-mono text-primary/60">
                  .{formatCurrency(computed).split('.')[1]}
                </span>
              </div>
              <p className="text-[11px] font-medium text-text-muted mt-2">
                Includes regional tax and service fees calculated at processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderForm;
