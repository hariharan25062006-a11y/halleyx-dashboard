import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CollapsibleSection from '../ui/CollapsibleSection';

const DATA_COLUMNS = [
  { id: 'id', label: 'Customer ID' },
  { id: 'first_name', label: 'Customer name' },
  { id: 'email', label: 'Email id' },
  { id: 'phone_number', label: 'Phone number' },
  { id: 'street_address', label: 'Address' },
  { id: 'order_date', label: 'Order date' },
  { id: 'product', label: 'Product' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'unit_price', label: 'Unit price' },
  { id: 'total_amount', label: 'Total amount' },
  { id: 'status', label: 'Status' },
  { id: 'created_by', label: 'Created by' },
];

const SORT_OPTIONS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
  { value: 'order_date', label: 'Order date' },
];

const ROWS_OPTIONS = [
  { value: '5', label: '5 rows' },
  { value: '10', label: '10 rows' },
  { value: '15', label: '15 rows' },
];

const TableSettings = ({ config = {}, onUpdate }) => {
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onUpdate({ ...config, [field]: value });
  };

  const handleRowsChange = (e) => {
    onUpdate({ ...config, rows: parseInt(e.target.value, 10) });
  };

  const toggleColumn = (colId) => {
    const currentCols = config.columns || DATA_COLUMNS.map(c => c.id);
    const newCols = currentCols.includes(colId) 
      ? currentCols.filter(c => c !== colId)
      : [...currentCols, colId];
    onUpdate({ ...config, columns: newCols });
  };

  const currentCols = config.columns || DATA_COLUMNS.map(c => c.id);

  return (
    <div>
      <CollapsibleSection title="General">
        <div className="space-y-4">
          <Input
            label="Widget Title"
            placeholder="Untitled"
            value={config.title || ''}
            onChange={handleChange('title')}
          />
          <Input
            label="Description (Optional)"
            placeholder="Add context..."
            value={config.description || ''}
            onChange={handleChange('description')}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Data Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
              Choose Columns
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-border rounded-xl bg-surface">
              {DATA_COLUMNS.map(col => (
                <label key={col.id} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={currentCols.includes(col.id)}
                    onChange={() => toggleColumn(col.id)}
                    className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {col.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Select
            label="Sort By"
            options={SORT_OPTIONS}
            value={config.sortBy || 'desc'}
            onChange={handleChange('sortBy')}
          />
          <Select
            label="Pagination"
            options={ROWS_OPTIONS}
            value={String(config.rows || 5)}
            onChange={handleRowsChange}
          />
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={!!config.applyFilter}
              onChange={handleChange('applyFilter')}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
              Apply filter
            </span>
          </label>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Styling">
        <div className="space-y-4">
          <Input
            label="Font size (px)"
            type="number"
            min="12" max="18"
            value={config.fontSize || 14}
            onChange={handleChange('fontSize')}
          />
          <div>
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
              Header Background
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={config.headerBg || '#54bd95'} 
                onChange={handleChange('headerBg')}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <Input 
                placeholder="#54bd95"
                value={config.headerBg || '#54bd95'}
                onChange={handleChange('headerBg')}
                className="flex-1 !mb-0"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default TableSettings;
