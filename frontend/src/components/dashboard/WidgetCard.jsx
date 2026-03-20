import React, { useState, useRef } from 'react';
import { Settings, Trash2, GripVertical, MoveDiagonal } from 'lucide-react';
import KPIWidget from '../widgets/KPIWidget';
import BarChartWidget from '../widgets/BarChartWidget';
import LineChartWidget from '../widgets/LineChartWidget';
import AreaChartWidget from '../widgets/AreaChartWidget';
import ScatterWidget from '../widgets/ScatterWidget';
import PieChartWidget from '../widgets/PieChartWidget';
import TableWidget from '../widgets/TableWidget';

const RENDERERS = {
  kpi: KPIWidget,
  bar: BarChartWidget,
  line: LineChartWidget,
  area: AreaChartWidget,
  scatter: ScatterWidget,
  pie: PieChartWidget,
  table: TableWidget,
};

const TYPE_LABELS = {
  kpi: 'KPI',
  bar: 'Bar Chart',
  line: 'Line Chart',
  area: 'Area Chart',
  scatter: 'Scatter Plot',
  pie: 'Pie Chart',
  table: 'Data Table',
};

const WidgetCard = ({
  widget,
  orders = [],
  isConfig = false,
  isSelected = false,
  onSelect,
  onRemove,
  onUpdateWidget,
}) => {
  const Renderer = RENDERERS[widget.type];
  const cardRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizePreview, setResizePreview] = useState(null);

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const startWidth = cardElement.offsetWidth;
    const startHeight = cardElement.offsetHeight;

    const dashboardGrid = cardElement.closest('.dashboard-grid');
    const canvasWidth = dashboardGrid.clientWidth - 48; // padding 6 (1.5rem * 2)

    setIsResizing(true);
    
    const startColSpan = widget.config.w || 2;
    const startRowSpan = widget.config.h || 2;
    setResizePreview({ w: startColSpan, h: startRowSpan });

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const columnWidth = canvasWidth / 12;
      const rowHeight = 80; // Assuming 80px per row auto size

      let newColSpan = Math.max(1, Math.round((startWidth + deltaX) / columnWidth));
      newColSpan = Math.min(newColSpan, 12);
      
      let newRowSpan = Math.max(1, Math.round((startHeight + deltaY) / rowHeight));
      newRowSpan = Math.min(newRowSpan, 12);

      setResizePreview({ w: newColSpan, h: newRowSpan });
      // Live update config so Stepper syncs in real time
      onUpdateWidget?.(widget.id, { ...widget.config, w: newColSpan, h: newRowSpan });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setIsResizing(false);
      setResizePreview(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => isConfig && onSelect?.()}
      className={`bg-white rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-200 group relative ${isConfig ? 'cursor-pointer' : ''}`}
      style={{
        border: isSelected ? '2px solid #7c3aed' : '1px solid #E4E2F0',
        boxShadow: isSelected 
          ? '0 0 0 3px rgba(124, 58, 237, 0.15), 0 8px 24px rgba(108,71,255,0.06)' 
          : '0 1px 3px rgba(108,71,255,0.08), 0 8px 24px rgba(108,71,255,0.06)',
      }}
    >
      {/* Resizing Blue Overlay */}
      {isResizing && resizePreview && (
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] z-50 flex items-center justify-center rounded-2xl pointer-events-none border border-primary/20">
          <div className="bg-white text-primary font-bold px-4 py-2 rounded-xl shadow-lg border border-primary/20 text-sm">
            W: {resizePreview.w} cols × H: {resizePreview.h} rows
          </div>
        </div>
      )}

      {/* Config mode top bar */}
      {isConfig && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b bg-white" style={{ borderColor: '#E4E2F0' }}>
          <div className="flex items-center gap-2">
            <GripVertical size={16} className="text-text-muted cursor-grab hover:text-text-primary" />
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#EDE9FF', color: '#6C47FF' }}
            >
              {TYPE_LABELS[widget.type] || widget.type}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
              className={`p-1.5 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:text-primary hover:bg-primary/5'
              }`}
              title="Settings"
            >
              <Settings size={15} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
              className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Remove"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Widget body */}
      <div className="flex-1 min-h-0 bg-white">
        {Renderer ? (
          <Renderer config={widget.config} orders={orders} isConfig={isConfig} />
        ) : (
          <div className="p-4 text-xs font-bold text-red-400">
            Unknown Widget Type: {widget.type}
          </div>
        )}
      </div>

      {/* Resize Handle */}
      {isConfig && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center cursor-se-resize text-text-muted/40 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity z-40 bg-white/80 rounded-tl-lg"
          title="Drag to resize"
        >
          <MoveDiagonal size={12} className="rotate-90" />
        </div>
      )}
    </div>
  );
};

export default WidgetCard;
