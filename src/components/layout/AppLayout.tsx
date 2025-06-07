import React from 'react';
import { useIframeContext } from '../../contexts/IframeContext';
import { ConfigurationPanel, PreviewPanel } from './index';
import { IframePreview } from '../IframePreview';
import { DebugPanel } from '../DebugPanel';

export function AppLayout() {
  const { isRenderMode, showEditSettings, config, errors } = useIframeContext();
  const isValid = Object.keys(errors).length === 0 && config.url.length > 0;

  if (!isRenderMode) {
    // Settings Only Mode - No iframe URL params
    return (
      <div className="max-w-4xl mx-auto">
        <ConfigurationPanel />
      </div>
    );
  }

  if (showEditSettings) {
    // Two-Column Mode - Render mode with edit settings active
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConfigurationPanel />
        <PreviewPanel />
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