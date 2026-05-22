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
    <div className="bg-clay-lavender text-clay-ink rounded-clay-xl border border-clay-ink/10 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="w-5 h-5 text-clay-ink/80" />
        <h2 className="text-lg font-semibold text-clay-ink">Website URL</h2>
      </div>
      
      <div className="space-y-2">
        <input
          type="url"
          value={config.url.replace(/^https?:\/\//, '')}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Enter website URL (e.g., example.com)"
          className={`
            w-full rounded-clay-md border px-4 py-3 text-sm transition-all duration-200 h-11
            ${errors.url 
              ? 'border-clay-error text-clay-error placeholder-clay-error/60 bg-red-50 focus:border-clay-error' 
              : 'border-clay-hairline bg-white text-clay-ink focus:border-clay-primary'
            }
            focus:outline-none focus:ring-0
          `}
        />
        {errors.url && (
          <p className="text-xs font-semibold text-clay-error mt-1">{errors.url}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-xs font-semibold text-clay-ink/75 mb-1 uppercase tracking-wider">
            Title (optional)
          </label>
          <input
            type="text"
            value={config.title || ''}
            onChange={(e) => handleConfigChange('title', e.target.value)}
            placeholder="Iframe title"
            className="w-full rounded-clay-md border border-clay-hairline bg-white px-3 py-2 text-sm text-clay-ink h-11 focus:border-clay-primary focus:outline-none focus:ring-0 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-clay-ink/75 mb-1 uppercase tracking-wider">
            Name (optional)
          </label>
          <input
            type="text"
            value={config.name || ''}
            onChange={(e) => handleConfigChange('name', e.target.value)}
            placeholder="Iframe name"
            className="w-full rounded-clay-md border border-clay-hairline bg-white px-3 py-2 text-sm text-clay-ink h-11 focus:border-clay-primary focus:outline-none focus:ring-0 transition-colors"
          />
        </div>
      </div>

      {/* Render Button */}
      <div className="mt-6 pt-4 border-t border-clay-ink/10">
        <button
          onClick={handleRenderIframe}
          disabled={!isValid}
          className={`
            w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-clay-md font-semibold transition-all h-11
            ${isValid
              ? 'bg-clay-primary text-white hover:bg-clay-primary-active active:scale-[0.99] shadow-md hover:shadow-lg'
              : 'bg-clay-primary-disabled text-clay-muted cursor-not-allowed'
            }
          `}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Render Iframe</span>
        </button>
        <p className="text-xs text-clay-ink/60 mt-2 text-center">
          This will reload the page with your iframe settings applied
        </p>
      </div>
    </div>
  );
} 