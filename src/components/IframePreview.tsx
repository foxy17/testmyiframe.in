import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2, ExternalLink, Copy, Check, Info, Settings2 } from 'lucide-react';
import { IframeConfig } from '../types/iframe';
import { formatDimension } from '../utils/validation';
import { generateIframeCode, copyToClipboard } from '../utils/iframeGenerator';

interface IframePreviewProps {
  config: IframeConfig;
  isValid: boolean;
  isRenderMode: boolean;
}

export const IframePreview: React.FC<IframePreviewProps> = ({ config, isValid, isRenderMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState<NodeJS.Timeout | null>(null);

  const iframeCode = generateIframeCode(config);
  const displayWidth = formatDimension(config.dimensions.width, config.dimensions.widthUnit);
  const displayHeight = formatDimension(config.dimensions.height, config.dimensions.heightUnit);

  useEffect(() => {
    if (config.url && isRenderMode) {
      setIsLoading(true);
      setHasError(false);
      setErrorDetails('');

      // Set a timeout for loading
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setHasError(true);
        setErrorDetails('Loading timeout - the site may be blocking iframe embedding or taking too long to respond');
      }, 15000); // 15 second timeout

      setLoadTimeout(timeout);
    }
  }, [config.url, isRenderMode]);

  const handleIframeLoad = () => {
    if (loadTimeout) {
      clearTimeout(loadTimeout);
      setLoadTimeout(null);
    }
    setIsLoading(false);
    setHasError(false);
    setErrorDetails('');
    console.log('Iframe loaded successfully:', config.url);
  };

  const handleIframeError = () => {
    if (loadTimeout) {
      clearTimeout(loadTimeout);
      setLoadTimeout(null);
    }
    setIsLoading(false);
    setHasError(true);
    setErrorDetails('Failed to load - the site may have X-Frame-Options or CSP policies that prevent iframe embedding');
    console.error('Iframe failed to load:', config.url);
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(iframeCode);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const openInNewTab = () => {
    window.open(config.url, '_blank');
  };

  // If not in render mode and URL is present, show configuration mode
  if (!isRenderMode && config.url) {
    return (
      <div className="space-y-4">
        {/* Configuration Notice */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Settings2 className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-800">Configuration Mode</h3>
          </div>
          <p className="text-amber-700 mb-4">
            Configure your iframe settings and click "Render Iframe" to load the content with a fresh page load, 
            which can bypass many embedding restrictions.
          </p>
          <div className="bg-amber-100 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>Current URL:</strong> {config.url}
            </p>
            <p className="text-sm text-amber-800">
              <strong>Dimensions:</strong> {displayWidth} × {displayHeight}
            </p>
          </div>
        </div>

        {/* Generated Code Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Generated Code</h3>
            <button
              onClick={handleCopyCode}
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                ${isCopied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto border">
            <code className="text-gray-800 font-mono">
              {iframeCode}
            </code>
          </pre>
        </div>

        {/* Iframe-friendly URL suggestions */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="flex items-start space-x-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Need iframe-friendly test URLs?
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                Try these URLs that typically allow iframe embedding:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'https://www.openstreetmap.org/export/embed.html',
                  'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  'https://httpbin.org/html',
                  'https://jsonplaceholder.typicode.com/',
                  'https://via.placeholder.com/800x600'
                ].map((url) => (
                  <button
                    key={url}
                    onClick={() => {
                      const event = { target: { value: url.replace(/^https?:\/\//, '') } };
                      // Simulate input change
                      const inputElement = document.querySelector('input[type="url"]') as HTMLInputElement;
                      if (inputElement) {
                        inputElement.value = url.replace(/^https?:\/\//, '');
                        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                      }
                    }}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    {new URL(url).hostname}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no valid URL or not in render mode, show placeholder
  if (!isValid || !config.url || !isRenderMode) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Enter a valid URL and click "Render Iframe" to see the preview</p>
          </div>
        </div>
      </div>
    );
  }

  // Render mode - show the actual iframe
  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {displayWidth} × {displayHeight}
            </span>
            <button
              onClick={openInNewTab}
              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="relative bg-gray-50 rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="flex items-center space-x-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading content...</span>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
              <div className="text-center text-red-600 p-4 max-w-md">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium mb-2">Failed to load content</p>
                {errorDetails && (
                  <p className="text-xs text-red-600 mb-2 bg-red-100 p-2 rounded">
                    {errorDetails}
                  </p>
                )}
                <div className="text-xs text-red-500 space-y-1">
                  <p>Common reasons for iframe blocking:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-left">
                    <li>X-Frame-Options: DENY or SAMEORIGIN headers</li>
                    <li>Content Security Policy (CSP) frame-ancestors directive</li>
                    <li>HTTPS/HTTP mixed content restrictions</li>
                    <li>JavaScript-based frame-busting scripts</li>
                    <li>Network connectivity issues</li>
                  </ul>
                  <p className="mt-2 text-xs">Try adjusting sandbox settings or use iframe-friendly URLs above.</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-4">
            <div
              style={{
                width: config.dimensions.widthUnit === '%' 
                  ? `${config.dimensions.width}%` 
                  : `${config.dimensions.width}px`,
                height: config.dimensions.heightUnit === '%' 
                  ? `${config.dimensions.height}vh` 
                  : `${config.dimensions.height}px`,
                maxWidth: '100%',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <iframe
                src={config.url}
                width="100%"
                height="100%"
                title={config.title || 'Preview'}
                name={config.name}
                allowFullScreen={config.attributes.allowFullscreen}
                sandbox={(() => {
                  const sandboxValues = [
                    config.attributes.allowScripts && 'allow-scripts',
                    config.attributes.allowForms && 'allow-forms',
                    config.attributes.allowPopups && 'allow-popups',
                    config.attributes.allowModals && 'allow-modals',
                    config.attributes.allowPointerLock && 'allow-pointer-lock',
                    config.attributes.allowPresentation && 'allow-presentation',
                    config.attributes.allowTopNavigation && 'allow-top-navigation'
                  ].filter(Boolean);

                  // Only add allow-same-origin if we have other permissions
                  // This prevents conflicts that can cause loading failures
                  if (sandboxValues.length > 0) {
                    sandboxValues.push('allow-same-origin');
                  }

                  return sandboxValues.length > 0 ? sandboxValues.join(' ') : undefined;
                })()}
                allow={[
                  config.attributes.allowAutoplay && 'autoplay',
                  config.attributes.allowCamera && 'camera',
                  config.attributes.allowMicrophone && 'microphone',
                  config.attributes.allowGeolocation && 'geolocation',
                  config.attributes.allowClipboard && 'clipboard-write',
                  config.attributes.allowPaymentRequest && 'payment'
                ].filter(Boolean).join('; ') || undefined}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Generated Code</h3>
          <button
            onClick={handleCopyCode}
            className={`
              flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors
              ${isCopied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto border">
          <code className="text-gray-800 font-mono">
            {iframeCode}
          </code>
        </pre>
      </div>
    </div>
  );
};