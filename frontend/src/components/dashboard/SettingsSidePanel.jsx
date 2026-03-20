import React from 'react';
import { X, Sliders, MousePointer, Trash2 } from 'lucide-react';
import KPISettings from '../settings/KPISettings';
import ChartSettings from '../settings/ChartSettings';
import PieSettings from '../settings/PieSettings';
import TableSettings from '../settings/TableSettings';
import CollapsibleSection from '../ui/CollapsibleSection';

const SETTINGS_MAP = {
  kpi: KPISettings,
  bar: ChartSettings,
  line: ChartSettings,
  area: ChartSettings,
  scatter: ChartSettings,
  pie: PieSettings,
  table: TableSettings,
};

const Stepper = ({ label, value, onChange, min, max, step }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-text-primary">{label}</span>
      <div className="flex items-center gap-2 border rounded-xl p-1 bg-surface" style={{ borderColor: '#E4E2F0' }}>
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-50 transition-all text-text-muted hover:text-primary"
        >
          -
        </button>
        <div className="w-10 text-center text-sm font-bold text-text-primary px-1 pointer-events-none">
          {value}
        </div>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-50 transition-all text-text-muted hover:text-primary"
        >
          +
        </button>
      </div>
    </div>
  );
};

const MiniGrid = ({ w, h, onChange }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleUpdate = (row, col) => {
    onChange?.(col + 1, row + 1);
  };

  return (
    <div 
      className="mt-4 p-3 bg-surface border rounded-xl" 
      style={{ borderColor: '#E4E2F0' }}
      onMouseLeave={() => setIsDragging(false)}
      onMouseUp={() => setIsDragging(false)}
    >
      <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex justify-between mb-3 select-none">
        <span>Footprint Preview</span>
        <span className="text-primary">{w} × {h}</span>
      </div>
      <div className="grid grid-cols-12 gap-1 w-full aspect-square select-none cursor-crosshair">
        {Array.from({ length: 12 * 12 }).map((_, i) => {
          const row = Math.floor(i / 12);
          const col = i % 12;
          const isActive = row < h && col < w;
          return (
            <div 
              key={i} 
              onMouseDown={() => {
                setIsDragging(true);
                handleUpdate(row, col);
              }}
              onMouseEnter={() => {
                if (isDragging) handleUpdate(row, col);
              }}
              className={`rounded-[2px] transition-colors duration-150 ${isActive ? 'bg-primary shadow-[0_0_8px_rgba(108,71,255,0.4)] hover:bg-primary-light' : 'bg-black/5 hover:bg-black/10'}`} 
            />
          );
        })}
      </div>
    </div>
  );
};

const SettingsSidePanel = ({ selectedWidget, onClose, onUpdate, onDelete }) => {
  // Nothing selected state
  if (!selectedWidget) {
    return (
      <div
        className="w-full bg-white border-l h-full flex flex-col items-center justify-center shrink-0"
        style={{ borderColor: '#E4E2F0' }}
      >
        <MousePointer size={32} className="text-text-muted mb-3" />
        <p className="text-sm text-text-muted text-center px-6">
          Select a widget to edit its settings
        </p>
      </div>
    );
  }

  const SettingsComponent = SETTINGS_MAP[selectedWidget.type];

  return (
    <div
      className="w-full bg-white border-l h-full flex flex-col shrink-0"
      style={{ borderColor: '#E4E2F0' }}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#E4E2F0' }}>
        <div>
          <h3
            className="text-base font-bold text-text-primary"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {selectedWidget.type.charAt(0).toUpperCase() + selectedWidget.type.slice(1)} Widget
          </h3>
          <p className="text-xs text-text-muted mt-0.5 font-medium">Settings</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              onDelete(selectedWidget.id);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-red-500 hover:bg-red-50 transition-colors"
            title="Remove Widget"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-text-muted hover:bg-border hover:text-text-primary transition-colors"
            title="Close Settings"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Settings body */}
      <div className="flex-1 overflow-y-auto px-5 pb-12">
        <CollapsibleSection title="Dimensions">
          <Stepper 
            label="Width (Columns)" 
            value={selectedWidget.config.w || 2} 
            onChange={(val) => onUpdate(selectedWidget.id, { ...selectedWidget.config, w: val })}
            min={1} max={12} step={1} 
          />
          <Stepper 
            label="Height (Rows)" 
            value={selectedWidget.config.h || 2} 
            onChange={(val) => onUpdate(selectedWidget.id, { ...selectedWidget.config, h: val })}
            min={1} max={12} step={1} 
          />
          <MiniGrid 
            w={selectedWidget.config.w || 2} 
            h={selectedWidget.config.h || 2} 
            onChange={(newW, newH) => onUpdate(selectedWidget.id, { ...selectedWidget.config, w: newW, h: newH })}
          />
        </CollapsibleSection>
        
        {SettingsComponent ? (
          <div className="mt-2">
            <SettingsComponent
              config={selectedWidget.config}
              onUpdate={(newConfig) => onUpdate(selectedWidget.id, newConfig)}
              type={selectedWidget.type}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Sliders size={32} className="text-text-muted mb-3" />
            <p className="text-sm text-text-muted">
              No configurable settings for this widget type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSidePanel;
