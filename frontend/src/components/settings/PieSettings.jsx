import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CollapsibleSection from '../ui/CollapsibleSection';

const DATA_FIELDS = [
  { value: 'product', label: 'Product' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'unit_price', label: 'Unit price' },
  { value: 'total_amount', label: 'Total amount' },
  { value: 'status', label: 'Status' },
  { value: 'created_by', label: 'Created by' },
];

const PieSettings = ({ config = {}, onUpdate }) => {
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onUpdate({ ...config, [field]: value });
  };

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
          <Select
            label="Choose chart data"
            options={DATA_FIELDS}
            value={config.groupBy || 'status'}
            onChange={handleChange('groupBy')}
          />
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={!!config.showLegend}
              onChange={handleChange('showLegend')}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
              Show legend
            </span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PieSettings;
