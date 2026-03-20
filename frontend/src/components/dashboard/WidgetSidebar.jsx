import React from 'react';
import { WIDGET_TYPES } from '../../constants/widgetTypes';
import * as Icons from 'lucide-react';

const WidgetSidebar = ({ onAddWidget }) => {
  return (
    <div className="w-full bg-white border-r h-full flex flex-col shrink-0" style={{ borderColor: '#E4E2F0' }}>
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: '#E4E2F0' }}>
        <h3
          className="text-base font-bold text-text-primary"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Widgets
        </h3>
        <p className="text-xs text-text-muted mt-0.5">Click to add to canvas</p>
      </div>

      {/* Widget List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {WIDGET_TYPES.map((widget, index) => {
          const Icon = Icons[widget.icon] || Icons.HelpCircle;
          return (
            <button
              key={widget.type}
              onClick={() => onAddWidget(widget.type, index)}
              className="w-full flex items-center gap-3 p-3 bg-white border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/40 active:scale-[0.98] text-left group"
              style={{ borderColor: '#E4E2F0' }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                style={{ backgroundColor: '#EDE9FF' }}
              >
                <Icon size={18} style={{ color: '#6C47FF' }} />
              </div>

              {/* Label + Description */}
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-text-primary block leading-tight">
                  {widget.label}
                </span>
                <span className="text-[11px] text-text-muted leading-tight">
                  {widget.description}
                </span>
              </div>

              {/* Drag handle indicator */}
              <Icons.GripVertical
                size={14}
                className="text-text-muted/40 group-hover:text-text-muted transition-colors shrink-0"
              />
            </button>
          );
        })}
      </div>

      {/* Pro Tip */}
      <div className="p-3 border-t" style={{ borderColor: '#E4E2F0' }}>
        <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#6C47FF' }}>
          <div className="text-[10px] font-extrabold text-white/70 uppercase tracking-widest mb-1">Pro Tip</div>
          <p className="text-[11px] font-medium text-white leading-tight">
            Widgets automatically sync with your live order data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WidgetSidebar;
