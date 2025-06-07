import React from 'react';
import { useIframeContext } from '../../contexts/IframeContext';
import { useIframeActions } from '../../hooks';

export function RenderModeNotice() {
  const { isRenderMode, showEditSettings } = useIframeContext();
  const { handleClearRender, handleEditSettings } = useIframeActions();

  if (!isRenderMode) return null;

  return (
    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-800 font-medium">
            Iframe is currently being rendered with your settings
          </span>
        </div>
        <button
          onClick={showEditSettings ? handleClearRender : handleEditSettings}
          className="text-green-700 hover:text-green-800 text-sm underline"
        >
          {showEditSettings ? 'Clear Settings' : 'Edit Settings'}
        </button>
      </div>
    </div>
  );
} 