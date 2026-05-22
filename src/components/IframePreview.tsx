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
  const [loadTimeout, setLoadTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const iframeCode = generateIframeCode(config);
  const displayWidth = formatDimension(config.dimensions.width, config.dimensions.widthUnit);
  const displayHeight = formatDimension(config.dimensions.height, config.dimensions.heightUnit);

  useEffect(() => {
    if (config.url && isRenderMode) {
      setIsLoading(true);
      setHasError(false);
      setErrorDetails('');

      // Set a longer timeout and make it less aggressive
      const timeout = setTimeout(() => {
        setIsLoading(false);
        // Don't show error immediately, just stop loading indicator
        console.log('Iframe load timeout reached, but iframe may still be loading normally');
      }, 30000); // 30 second timeout, and don't show error

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

  const handleDismissLoading = () => {
    if (loadTimeout) {
      clearTimeout(loadTimeout);
      setLoadTimeout(null);
    }
    setIsLoading(false);
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
      <div className="space-y-6">
        {/* Configuration Notice */}
        <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Settings2 className="w-5 h-5 text-clay-ink/80" />
            <h3 className="text-lg font-semibold text-clay-ink">Configuration Mode</h3>
          </div>
          <p className="text-clay-body text-sm mb-4">
            Configure your iframe settings and click <strong className="text-clay-ink">"Render Iframe"</strong> to load the content with a fresh page load, 
            which can bypass many embedding restrictions.
          </p>
          <div className="bg-white/60 border border-clay-hairline rounded-clay-md p-4 space-y-1">
            <p className="text-sm text-clay-body">
              <strong className="text-clay-ink font-semibold">Current URL:</strong> {config.url}
            </p>
            <p className="text-sm text-clay-body">
              <strong className="text-clay-ink font-semibold">Dimensions:</strong> {displayWidth} × {displayHeight}
            </p>
          </div>
        </div>

        {/* Generated Code Preview */}
        <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-clay-ink">Generated Code</h3>
            <button
              onClick={handleCopyCode}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-clay-md text-sm font-semibold transition-all active:scale-[0.98]
                ${isCopied 
                  ? 'bg-clay-mint text-clay-ink border border-clay-ink/10' 
                  : 'bg-clay-primary text-white hover:bg-clay-primary-active'
                }
              `}
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="bg-white border border-clay-hairline rounded-clay-md p-4 text-sm overflow-x-auto">
            <code className="text-clay-ink font-mono text-xs select-all">
              {iframeCode}
            </code>
          </pre>
        </div>

        {/* Iframe-friendly URL suggestions */}
        <div className="bg-clay-mint/20 border border-clay-mint/40 text-clay-ink rounded-clay-lg p-5">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-clay-ink/80 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-clay-ink mb-1">
                Need iframe-friendly test URLs?
              </h4>
              <p className="text-xs text-clay-body mb-3">
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
                      const inputElement = document.querySelector('input[type="url"]') as HTMLInputElement;
                      if (inputElement) {
                        inputElement.value = url.replace(/^https?:\/\//, '');
                        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                      }
                    }}
                    className="text-xs font-semibold bg-white border border-clay-ink/10 text-clay-ink px-2.5 py-1.5 rounded-clay-md hover:bg-clay-canvas transition-colors shadow-sm"
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
      <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-8">
        <div className="flex items-center justify-center h-64 text-clay-muted">
          <div className="text-center max-w-sm">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 text-clay-muted-soft" />
            <p className="text-sm font-semibold text-clay-ink">No Preview Available</p>
            <p className="text-xs text-clay-muted mt-1">Enter a valid URL and click "Render Iframe" to see the preview</p>
          </div>
        </div>
      </div>
    );
  }

  // Render mode - show the actual iframe
  return (
    <div className="space-y-6">
      {/* Preview Header & Container */}
      <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-clay-ink">Live Preview</h3>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-clay-ink/75 bg-white px-2.5 py-1 rounded-clay-md border border-clay-hairline">
              {displayWidth} × {displayHeight}
            </span>
            <button
              onClick={openInNewTab}
              className="p-2 bg-white text-clay-ink hover:text-clay-primary hover:bg-clay-canvas border border-clay-hairline rounded-clay-md transition-all active:scale-[0.95]"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="relative bg-clay-canvas border border-clay-hairline rounded-clay-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-clay-mint/90 z-10 transition-all duration-300">
              <div className="text-center p-6 bg-white rounded-clay-lg border border-clay-ink/10 shadow-lg max-w-xs m-4">
                <div className="flex items-center justify-center space-x-2 text-clay-ink mb-3 font-semibold">
                  <Loader2 className="w-5 h-5 animate-spin text-clay-ink/70" />
                  <span className="text-sm">Loading content...</span>
                </div>
                <button
                  onClick={handleDismissLoading}
                  className="text-xs text-clay-muted hover:text-clay-ink hover:underline font-semibold"
                >
                  Dismiss (content may still load)
                </button>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-clay-coral/95 z-10 overflow-y-auto">
              <div className="text-center text-clay-ink p-6 max-w-md bg-white rounded-clay-lg border border-clay-ink/10 shadow-lg m-4">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-clay-coral animate-bounce" />
                <p className="text-md font-bold text-clay-ink mb-2">Failed to load content</p>
                {errorDetails && (
                  <p className="text-xs text-clay-coral mb-4 bg-clay-coral/10 p-3 rounded-clay-md font-semibold border border-clay-coral/20">
                    {errorDetails}
                  </p>
                )}
                <div className="text-xs text-clay-body text-left space-y-2">
                  <p className="font-semibold text-clay-ink">Common reasons for iframe blocking:</p>
                  <ul className="list-disc list-inside space-y-1 text-clay-body">
                    <li>X-Frame-Options: DENY or SAMEORIGIN headers</li>
                    <li>CSP frame-ancestors directive configured</li>
                    <li>Mixed content constraints (HTTPS page requesting HTTP url)</li>
                    <li>Frame-busting JavaScript code</li>
                    <li>Site offline or invalid URL</li>
                  </ul>
                  <p className="mt-3 text-center text-clay-ink/70 font-semibold">Try adjusting sandbox options or use a friendly URL.</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 flex justify-center items-center">
            <div
              style={{
                width: config.dimensions.widthUnit === '%' 
                  ? `${config.dimensions.width}%` 
                  : `${config.dimensions.width}px`,
                height: config.dimensions.heightUnit === '%' 
                  ? `${config.dimensions.height}vh` 
                  : `${config.dimensions.height}px`,
                maxWidth: '100%',
                border: '1px solid rgba(10, 10, 10, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#ffffff'
              }}
              className="shadow-sm"
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
                ref={(iframe) => {
                  if (iframe && isRenderMode) {
                    const checkIfLoaded = () => {
                      try {
                        if (iframe.contentWindow) {
                          handleIframeLoad();
                        }
                      } catch (e) {
                        setTimeout(() => {
                          if (isLoading) {
                            console.log('Iframe loaded cross-origin safely');
                            handleIframeLoad();
                          }
                        }, 3000);
                      }
                    };
                    
                    setTimeout(checkIfLoaded, 1000);
                    setTimeout(checkIfLoaded, 3000);
                    setTimeout(checkIfLoaded, 5000);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-clay-ink">Generated Code</h3>
          <button
            onClick={handleCopyCode}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-clay-md text-sm font-semibold transition-all active:scale-[0.98]
              ${isCopied 
                ? 'bg-clay-mint text-clay-ink border border-clay-ink/10' 
                : 'bg-clay-primary text-white hover:bg-clay-primary-active'
              }
            `}
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <pre className="bg-white border border-clay-hairline rounded-clay-md p-4 text-sm overflow-x-auto">
          <code className="text-clay-ink font-mono text-xs select-all">
            {iframeCode}
          </code>
        </pre>
      </div>
    </div>
  );
};