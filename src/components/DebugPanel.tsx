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
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-2">
          <Bug className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-800">Debug Information</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="font-medium text-gray-700 mb-1">URL Details</h4>
              <div className="space-y-1 text-gray-600">
                <div><span className="font-medium">Protocol:</span> {debugInfo.protocol}</div>
                <div><span className="font-medium">Hostname:</span> {debugInfo.hostname}</div>
                <div><span className="font-medium">Dimensions:</span> {debugInfo.dimensions}</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-1">Security Settings</h4>
              <div className="space-y-1 text-gray-600">
                <div>
                  <span className="font-medium">Sandbox:</span> 
                  {debugInfo.sandboxAttributes.length > 0 ? (
                    <span className="ml-1">{debugInfo.sandboxAttributes.join(', ')}</span>
                  ) : (
                    <span className="ml-1 text-orange-600">No restrictions</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Permissions:</span> 
                  {debugInfo.allowAttributes.length > 0 ? (
                    <span className="ml-1">{debugInfo.allowAttributes.join(', ')}</span>
                  ) : (
                    <span className="ml-1 text-gray-500">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {debugInfo.customAttributes.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-1 text-xs">Custom Attributes</h4>
              <div className="text-xs text-gray-600">
                {debugInfo.customAttributes.map((attr, index) => (
                  <div key={index}>
                    <span className="font-medium">{attr.name}:</span> {attr.value}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={handleCopyDebugInfo}
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs transition-colors
                ${isCopied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Copied!' : 'Copy Debug Info'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
