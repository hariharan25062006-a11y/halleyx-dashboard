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
  { value: 'order_date', label: 'Duration' },
];

const GROUP_BY_OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const ChartSettings = ({ config = {}, onUpdate, type }) => {
  const handleChange = (field) => (e) => {
    const value = e.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    onUpdate({ ...config, [field]: value });
  };

  const isLineOrArea = type === 'line' || type === 'area';

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
            label="Choose X-Axis data"
            options={DATA_FIELDS}
            value={config.xAxis || 'product'}
            onChange={handleChange('xAxis')}
          />
          <Select
            label="Choose Y-Axis data"
            options={DATA_FIELDS}
            value={config.yAxis || 'total_amount'}
            onChange={handleChange('yAxis')}
          />
          {isLineOrArea && (
            <Select
              label="Group By (Time)"
              options={GROUP_BY_OPTIONS}
              value={config.groupBy || 'day'}
              onChange={handleChange('groupBy')}
            />
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Styling">
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
              Chart Color
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={config.color || '#6C47FF'} 
                onChange={handleChange('color')}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <Input 
                placeholder="#6C47FF"
                value={config.color || '#6C47FF'}
                onChange={handleChange('color')}
                className="flex-1 !mb-0"
              />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={!!config.showDataLabel}
              onChange={handleChange('showDataLabel')}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
              Show data label
            </span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default ChartSettings;
