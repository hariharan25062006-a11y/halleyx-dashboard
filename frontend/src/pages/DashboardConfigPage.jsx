import React, { useState, useMemo } from 'react';
import { Save, ChevronLeft, Sliders, Eye, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import { useOrders } from '../hooks/useOrders';
import { useToast } from '../components/ui/Toast';
import { WIDGET_TYPES } from '../constants/widgetTypes';
import { filterByDateRange, DATE_FILTERS } from '../utils/dateFilter';
import WidgetSidebar from '../components/dashboard/WidgetSidebar';
import CanvasGrid from '../components/dashboard/CanvasGrid';
import SettingsSidePanel from '../components/dashboard/SettingsSidePanel';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const DashboardConfigPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { config, setConfig, dateFilter, setDateFilter, saveConfig, loading } = useDashboard();
  const { orders } = useOrders();

  const [selectedWidget, setSelectedWidget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const filteredOrders = useMemo(
    () => filterByDateRange(orders, dateFilter),
    [orders, dateFilter]
  );

    // Keep selectedWidget in sync with config changes
  const currentSelected = useMemo(() => {
    if (!selectedWidget) return null;
    return config.find(w => w.id === selectedWidget.id) || null;
  }, [config, selectedWidget]);

  // Dirty state tracking
  const [initialConfig, setInitialConfig] = useState(null);
  React.useEffect(() => {
    if (!loading && initialConfig === null) {
      setInitialConfig(JSON.stringify(config));
    }
  }, [loading, config, initialConfig]);

  // Auto-save empty layout
  React.useEffect(() => {
    if (!loading && config.length === 0 && initialConfig !== null) {
      if (initialConfig !== '[]') {
        saveConfig([], dateFilter);
        setInitialConfig('[]');
      }
    }
  }, [config.length, loading, dateFilter, saveConfig, initialConfig]);

  const handleExit = () => {
    if (isPreview) {
      setIsPreview(false);
      return;
    }
    const isDirty = JSON.stringify(config) !== initialConfig;
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Exit anyway?")) {
        navigate('/app/dashboard');
      }
    } else {
      navigate('/app/dashboard');
    }
  };

  const handleAddWidget = (type, sourceIndex) => {
    const widgetType = WIDGET_TYPES.find(w => w.type === type);
    if (!widgetType) return;

    const newWidget = {
      id: crypto.randomUUID ? crypto.randomUUID() : `widget-${Date.now()}`,
      type: widgetType.type,
      config: { ...widgetType.defaultConfig },
    };
    setConfig([...config, newWidget]);
    setSelectedWidget(newWidget);
    toast?.(`Added ${widgetType.label} to canvas`, 'info');
  };

  const handleDeleteWidget = (id) => {
    setConfig(config.filter(w => w.id !== id));
    if (selectedWidget?.id === id) setSelectedWidget(null);
  };

  const handleUpdateWidget = (id, newConfig) => {
    const updatedWidgets = config.map(w =>
      w.id === id ? { ...w, config: newConfig } : w
    );
    setConfig(updatedWidgets);
    // Update selectedWidget reference
    if (selectedWidget?.id === id) {
      setSelectedWidget({ ...selectedWidget, config: newConfig });
    }
  };

  const handleReorder = (sourceIndex, destIndex) => {
    const items = Array.from(config);
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(destIndex, 0, moved);
    setConfig(items);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveConfig(config, dateFilter);
      setInitialConfig(JSON.stringify(config));
      toast?.('Dashboard saved successfully ✓', 'success');
      navigate('/app/dashboard');
    } catch {
      toast?.('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface -m-8 relative">
      {/* Editor Header */}
      <div
        className="bg-white border-b h-[56px] shrink-0 flex items-center justify-between px-6 z-20 transition-all duration-300"
        style={{ borderColor: '#E4E2F0', boxShadow: '0 1px 3px rgba(108,71,255,0.06)' }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={handleExit}
            className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors font-semibold text-sm group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            {isPreview ? 'Back to Editor' : 'Exit'}
          </button>

          <div className="h-5 w-px" style={{ backgroundColor: '#E4E2F0' }} />

          <div className="flex items-center gap-3">
            {!isPreview && (
              <div
                className="w-8 h-8 rounded-xl text-white flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #4F2FD6 100%)' }}
              >
                <Sliders size={16} />
              </div>
            )}
            <div className="flex flex-row items-center gap-4">
              <h1
                className="text-base font-bold text-text-primary leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {isPreview ? 'Dashboard Preview' : 'Dashboard Editor'}
              </h1>
              {!isPreview && (
                <span 
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}
                >
                  {config.length} WIDGETS
                </span>
              )}
              <div className="h-5 w-px" style={{ backgroundColor: '#E4E2F0' }} />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  DATA:
                </span>
                <Select
                  options={DATE_FILTERS}
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="!h-7 !px-3 !rounded-lg !text-xs min-w-[120px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsPreview(!isPreview)} 
            className={`gap-1.5 transition-colors border-primary text-primary hover:bg-primary/5 ${isPreview ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}`}
          >
            {isPreview ? <PenLine size={16} /> : <Eye size={16} />}
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          {!isPreview && (
            <Button onClick={handleSave} loading={saving} className="gap-2 px-6">
              <Save size={16} /> Save Dashboard
            </Button>
          )}
        </div>
      </div>

      {/* 3-panel layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Widget Sidebar */}
        <div className={`transition-all duration-300 ease-in-out h-full overflow-hidden ${isPreview ? 'w-0 opacity-0' : 'w-[280px] opacity-100 shrink-0'}`}>
          <div className="w-[280px] h-full">
            <WidgetSidebar onAddWidget={handleAddWidget} />
          </div>
        </div>

        {/* Center: Canvas */}
        <div className={`flex-1 overflow-y-auto relative transition-all duration-300 ${isPreview ? 'bg-white' : 'bg-surface'}`}>
          {!isPreview && (
            <div
              className="absolute inset-0 opacity-100"
              style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }}
            />
          )}
          <div className="relative z-10 w-full max-w-7xl mx-auto py-8 px-4 h-full">
            <CanvasGrid
              widgets={config}
              orders={filteredOrders}
              isConfigMode={!isPreview}
              selectedId={currentSelected?.id}
              onSettings={setSelectedWidget}
              onDelete={handleDeleteWidget}
              onReorder={handleReorder}
              onUpdateWidget={handleUpdateWidget}
            />
          </div>
        </div>

        {/* Right: Settings */}
        <div 
          className={`transition-all duration-300 ease-in-out h-full z-20 overflow-hidden bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.02)] ${
            isPreview || !selectedWidget ? 'w-0 opacity-0 border-l-0' : 'w-[320px] opacity-100 shrink-0 border-l border-border'
          }`}
        >
          <div className="w-[320px] h-full">
            <SettingsSidePanel
              selectedWidget={currentSelected}
              onClose={() => setSelectedWidget(null)}
              onUpdate={handleUpdateWidget}
              onDelete={handleDeleteWidget}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConfigPage;
