import React from 'react';
import { useIframeContext } from '../../contexts/IframeContext';
import { useIframeActions } from '../../hooks';

export function RenderModeNotice() {
  const { isRenderMode, showEditSettings } = useIframeContext();
  const { handleClearRender, handleEditSettings } = useIframeActions();

  if (!isRenderMode) return null;

  return (
    <div className="mb-6 bg-clay-mint/20 border border-clay-mint/40 rounded-clay-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 bg-clay-success rounded-full animate-pulse"></div>
          <span className="text-clay-ink font-semibold text-sm">
            Iframe is currently being rendered with your settings
          </span>
        </div>
        <button
          onClick={showEditSettings ? handleClearRender : handleEditSettings}
          className="text-clay-primary hover:text-clay-primary-active text-sm font-semibold underline transition-colors"
        >
          {showEditSettings ? 'Clear Settings' : 'Edit Settings'}
        </button>
      </div>
    </div>
  );
} 