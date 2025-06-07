import React from 'react';
import { Globe, Play } from 'lucide-react';
import { useIframeContext } from '../../contexts/IframeContext';
import { useIframeActions } from '../../hooks';

export function UrlInputSection() {
  const { config, errors } = useIframeContext();
  const { handleUrlChange, handleRenderIframe } = useIframeActions();

  const isValid = Object.keys(errors).length === 0 && config.url.length > 0;

  const { dispatch } = useIframeContext();
  
  const handleConfigChange = (field: 'title' | 'name', value: string) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: { [field]: value }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Website URL</h2>
      </div>
      
      <div className="space-y-2">
        <input
          type="url"
          value={config.url.replace(/^https?:\/\//, '')}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Enter website URL (e.g., example.com)"
          className={`
            w-full rounded-lg border px-4 py-3 text-sm transition-colors
            ${errors.url 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }
            focus:outline-none focus:ring-2
          `}
        />
        {errors.url && (
          <p className="text-sm text-red-600">{errors.url}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (optional)
          </label>
          <input
            type="text"
            value={config.title || ''}
            onChange={(e) => handleConfigChange('title', e.target.value)}
            placeholder="Iframe title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name (optional)
          </label>
          <input
            type="text"
            value={config.name || ''}
            onChange={(e) => handleConfigChange('name', e.target.value)}
            placeholder="Iframe name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Render Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleRenderIframe}
          disabled={!isValid}
          className={`
            w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all
            ${isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Play className="w-5 h-5" />
          <span>Render Iframe</span>
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This will reload the page with your iframe settings applied
        </p>
      </div>
    </div>
  );
} 