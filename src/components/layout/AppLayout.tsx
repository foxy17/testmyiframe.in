import React, { useState } from 'react';
import { useIframeContext } from '../../contexts/IframeContext';
import { ConfigurationPanel, PreviewPanel } from './index';
import { IframePreview } from '../IframePreview';
import { DebugPanel } from '../DebugPanel';
import { Settings, Eye } from 'lucide-react';

export function AppLayout() {
  const { isRenderMode, showEditSettings, config, errors } = useIframeContext();
  const isValid = Object.keys(errors).length === 0 && config.url.length > 0;
  
  // State for mobile tabs when editing in render mode
  const [activeTab, setActiveTab] = useState<'settings' | 'preview'>('settings');

  if (!isRenderMode) {
    // Settings Only Mode - No iframe URL params
    return (
      <div className="max-w-6xl mx-auto">
        <ConfigurationPanel layoutMode="grid" />
      </div>
    );
  }

  if (showEditSettings) {
    // Two-Column Mode - Render mode with edit settings active
    return (
      <div className="space-y-6">
        {/* Mobile Tab Header (hidden on desktop) */}
        <div className="flex border border-clay-hairline rounded-clay-lg p-1.5 bg-clay-surface-soft lg:hidden">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-clay-md text-sm font-semibold transition-all duration-200
              ${activeTab === 'settings'
                ? 'bg-clay-primary text-white shadow-sm'
                : 'text-clay-muted hover:text-clay-ink'
              }
            `}
          >
            <Settings className="w-4.5 h-4.5" />
            <span>Edit Settings</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-clay-md text-sm font-semibold transition-all duration-200
              ${activeTab === 'preview'
                ? 'bg-clay-primary text-white shadow-sm'
                : 'text-clay-muted hover:text-clay-ink'
              }
            `}
          >
            <Eye className="w-4.5 h-4.5" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Desktop Layout (Side-by-side grid) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          <ConfigurationPanel />
          <PreviewPanel />
        </div>

        {/* Mobile Layout (Tabbed) */}
        <div className="lg:hidden">
          {activeTab === 'settings' ? (
            <ConfigurationPanel />
          ) : (
            <PreviewPanel />
          )}
        </div>
      </div>
    );
  }

  // Preview Only Mode - Render mode with full-width preview
  return (
    <div className="max-w-full">
      <IframePreview config={config} isValid={isValid} isRenderMode={isRenderMode} />
      <div className="mt-4 max-w-4xl mx-auto">
        <DebugPanel config={config} />
      </div>
    </div>
  );
} 