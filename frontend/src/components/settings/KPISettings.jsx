import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CollapsibleSection from '../ui/CollapsibleSection';

const METRICS = [
  { value: 'id', label: 'Customer ID' },
  { value: 'first_name', label: 'Customer name' },
  { value: 'email', label: 'Email id' },
  { value: 'street_address', label: 'Address' },
  { value: 'order_date', label: 'Order date' },
  { value: 'product', label: 'Product' },
  { value: 'created_by', label: 'Created by' },
  { value: 'status', label: 'Status' },
  { value: 'total_amount', label: 'Total amount' },
  { value: 'unit_price', label: 'Unit price' },
  { value: 'quantity', label: 'Quantity' },
];

const AGGREGATIONS = [
  { value: 'Sum', label: 'Sum' },
  { value: 'Average', label: 'Average' },
  { value: 'Count', label: 'Count' },
];

const FORMATS = [
  { value: 'Number', label: 'Number' },
  { value: 'Currency', label: 'Currency' },
];

const KPISettings = ({ config = {}, onUpdate }) => {
  const handleChange = (field) => (e) => {
    onUpdate({ ...config, [field]: e.target.value });
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
            label="Select Metric"
            options={METRICS}
            value={config.metric || 'total_amount'}
            onChange={handleChange('metric')}
          />
          <Select
            label="Aggregation"
            options={AGGREGATIONS}
            value={config.aggregation || 'Sum'}
            onChange={handleChange('aggregation')}
          />
          <Select
            label="Data Format"
            options={FORMATS}
            value={config.format || 'Number'}
            onChange={handleChange('format')}
          />
          <Input
            label="Decimal Precision"
            type="number"
            min="0"
            value={config.precision ?? 0}
            onChange={handleChange('precision')}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default KPISettings;
