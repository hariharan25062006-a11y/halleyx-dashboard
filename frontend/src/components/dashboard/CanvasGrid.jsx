import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import WidgetCard from './WidgetCard';
import { LayoutDashboard } from 'lucide-react';

const CanvasGrid = ({
  widgets = [],
  orders = [],
  isConfigMode = false,
  selectedId = null,
  onSettings,
  onDelete,
  onReorder,
  onUpdateWidget,
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder?.(result.source.index, result.destination.index);
  };

  // Empty state
  if (widgets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[600px] h-full p-12">
        <div
          className="border-[3px] border-dashed rounded-[32px] w-full max-w-2xl h-[400px] flex flex-col items-center justify-center text-center bg-white/50"
          style={{ borderColor: '#E4E2F0' }}
        >
          <div className="w-20 h-20 rounded-2xl bg-surface flex items-center justify-center mb-6">
            <LayoutDashboard size={40} className="text-text-muted/60" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            {isConfigMode ? 'Drag widgets from the left panel to start building' : 'Your dashboard is empty'}
          </h3>
          <p className="text-sm text-text-muted">
            {isConfigMode
              ? 'Your dashboard will appear here'
              : 'Go to Dashboard Config to add widgets.'}
          </p>
          {!isConfigMode && (
            <a
              href="/app/config"
              className="mt-6 px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #4F2FD6 100%)' }}
            >
              Configure Dashboard →
            </a>
          )}
        </div>
      </div>
    );
  }

  const gridContent = (
    <div className="dashboard-grid p-6 relative z-10">
      {widgets.map((widget, index) => {
        const wSpan = widget.config.w || 2;
        const hRows = widget.config.h || 2;
        
        const style = {
          '--w-mob': Math.min(wSpan, 4),
          '--w-tab': Math.min(wSpan, 8),
          '--w-desk': wSpan,
          gridRow: `span ${hRows}`,
        };

        if (isConfigMode) {
          return (
            <Draggable key={widget.id} draggableId={widget.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`widget-gridItem ${snapshot.isDragging ? 'z-50' : 'z-0'} transition-shadow duration-300`}
                  style={{...provided.draggableProps.style, ...style}}
                >
                  <WidgetCard
                    widget={widget}
                    orders={orders}
                    isConfig={true}
                    isSelected={selectedId === widget.id}
                    onSelect={() => onSettings?.(widget)}
                    onRemove={() => onDelete?.(widget.id)}
                    onUpdateWidget={onUpdateWidget}
                  />
                </div>
              )}
            </Draggable>
          );
        }

        return (
          <div key={widget.id} className="widget-gridItem" style={style}>
            <WidgetCard
              widget={widget}
              orders={orders}
              isConfig={false}
            />
          </div>
        );
      })}
    </div>
  );

  if (isConfigMode) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[600px] h-full transition-colors relative ${
                snapshot.isDraggingOver ? 'bg-primary/5' : ''
              }`}
            >
              {snapshot.isDraggingOver && (
                <div className="absolute inset-x-6 inset-y-6 pointer-events-none flex z-0">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 border-r border-dashed border-primary/20"
                    />
                  ))}
                  <div className="flex-1" />
                </div>
              )}
              {gridContent}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return <div className="min-h-[600px] h-full">{gridContent}</div>;
};

export default CanvasGrid;
