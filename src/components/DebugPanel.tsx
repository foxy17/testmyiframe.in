import React, { useState } from 'react';
import { Bug, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { IframeConfig } from '../types/iframe';
import { copyToClipboard } from '../utils/iframeGenerator';

interface DebugPanelProps {
  config: IframeConfig;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ config }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const debugInfo = {
    url: config.url,
    protocol: config.url ? new URL(config.url.includes('://') ? config.url : `https://${config.url}`).protocol : 'N/A',
    hostname: config.url ? new URL(config.url.includes('://') ? config.url : `https://${config.url}`).hostname : 'N/A',
    sandboxAttributes: [
      config.attributes.allowScripts && 'allow-scripts',
      config.attributes.allowForms && 'allow-forms',
      config.attributes.allowPopups && 'allow-popups',
      config.attributes.allowModals && 'allow-modals',
      config.attributes.allowPointerLock && 'allow-pointer-lock',
      config.attributes.allowPresentation && 'allow-presentation',
      config.attributes.allowTopNavigation && 'allow-top-navigation'
    ].filter(Boolean),
    allowAttributes: [
      config.attributes.allowAutoplay && 'autoplay',
      config.attributes.allowCamera && 'camera',
      config.attributes.allowMicrophone && 'microphone',
      config.attributes.allowGeolocation && 'geolocation',
      config.attributes.allowClipboard && 'clipboard-write',
      config.attributes.allowPaymentRequest && 'payment'
    ].filter(Boolean),
    dimensions: `${config.dimensions.width}${config.dimensions.widthUnit} × ${config.dimensions.height}${config.dimensions.heightUnit}`,
    customAttributes: config.customAttributes
  };

  const handleCopyDebugInfo = async () => {
    const debugText = `
Iframe Debug Information:
========================
URL: ${debugInfo.url}
Protocol: ${debugInfo.protocol}
Hostname: ${debugInfo.hostname}
Dimensions: ${debugInfo.dimensions}

Sandbox Attributes: ${debugInfo.sandboxAttributes.length > 0 ? debugInfo.sandboxAttributes.join(', ') : 'None'}
Allow Attributes: ${debugInfo.allowAttributes.length > 0 ? debugInfo.allowAttributes.join(', ') : 'None'}
Custom Attributes: ${debugInfo.customAttributes.length > 0 ? debugInfo.customAttributes.map(attr => `${attr.name}="${attr.value}"`).join(', ') : 'None'}

Troubleshooting Tips:
- If the iframe doesn't load, try the "Permissive" security preset
- Check browser console for error messages
- Verify the URL is accessible and allows iframe embedding
- Some sites block embedding with X-Frame-Options or CSP headers
    `.trim();

    const success = await copyToClipboard(debugText);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!config.url) {
    return null;
  }

  return (
    <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left focus:outline-none"
      >
        <div className="flex items-center space-x-2.5">
          <Bug className="w-4.5 h-4.5 text-clay-ink/80" />
          <h3 className="text-sm font-semibold text-clay-ink">Debug Information</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4.5 h-4.5 text-clay-ink/60" />
        ) : (
          <ChevronDown className="w-4.5 h-4.5 text-clay-ink/60" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="font-semibold text-clay-ink mb-1.5 uppercase tracking-wider text-[10px]">URL Details</h4>
              <div className="space-y-1 text-clay-body">
                <div><span className="font-semibold text-clay-ink/80">Protocol:</span> {debugInfo.protocol}</div>
                <div><span className="font-semibold text-clay-ink/80">Hostname:</span> {debugInfo.hostname}</div>
                <div><span className="font-semibold text-clay-ink/80">Dimensions:</span> {debugInfo.dimensions}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-clay-ink mb-1.5 uppercase tracking-wider text-[10px]">Security Settings</h4>
              <div className="space-y-1 text-clay-body">
                <div>
                  <span className="font-semibold text-clay-ink/80">Sandbox:</span> 
                  {debugInfo.sandboxAttributes.length > 0 ? (
                    <span className="ml-1 text-clay-body">{debugInfo.sandboxAttributes.join(', ')}</span>
                  ) : (
                    <span className="ml-1 text-clay-coral font-semibold">No restrictions</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-clay-ink/80">Permissions:</span> 
                  {debugInfo.allowAttributes.length > 0 ? (
                    <span className="ml-1 text-clay-body">{debugInfo.allowAttributes.join(', ')}</span>
                  ) : (
                    <span className="ml-1 text-clay-muted">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {debugInfo.customAttributes.length > 0 && (
            <div>
              <h4 className="font-semibold text-clay-ink mb-1.5 uppercase tracking-wider text-[10px]">Custom Attributes</h4>
              <div className="text-xs text-clay-body space-y-0.5">
                {debugInfo.customAttributes.map((attr, index) => (
                  <div key={index}>
                    <span className="font-semibold text-clay-ink/80">{attr.name}:</span> {attr.value}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-clay-ink/10">
            <button
              onClick={handleCopyDebugInfo}
              className={`
                flex items-center space-x-2 px-3.5 py-2 rounded-clay-md text-xs font-semibold transition-all active:scale-[0.98]
                ${isCopied 
                  ? 'bg-clay-mint text-clay-ink border border-clay-ink/10' 
                  : 'bg-clay-primary text-white hover:bg-clay-primary-active'
                }
              `}
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied!' : 'Copy Debug Info'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
