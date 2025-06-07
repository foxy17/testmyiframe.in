import React from 'react';
import { Monitor, Zap } from 'lucide-react';
import { useIframeActions } from '../../hooks';

export function Header() {
  const { handleQuickTest } = useIframeActions();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="p-3 bg-blue-600 rounded-xl text-white">
          <Monitor className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Iframe Tester</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto mb-4">
        Test and configure iframes with advanced security settings, responsive dimensions,
        and real-time preview. Click "Render Iframe" to load content in a fresh page.
      </p>
      <button
        onClick={handleQuickTest}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <Zap className="w-4 h-4 mr-2" />
        Quick Test with Working Example
      </button>
    </div>
  );
} 