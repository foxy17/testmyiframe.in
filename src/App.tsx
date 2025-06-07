import React, { useState, useEffect } from 'react';
import { Monitor, Globe, Settings, Play, Zap } from 'lucide-react';
import { IframeConfig, IframeDimensions, IframeAttributes, CustomAttribute, PresetDimension } from './types/iframe';
import { validateUrl, validateDimension, sanitizeUrl } from './utils/validation';
import { decodeConfigFromUrl, buildRenderUrl } from './utils/urlParams';
import { PresetDimensions } from './components/PresetDimensions';
import { DimensionControls } from './components/DimensionControls';
import { AttributeControls } from './components/AttributeControls';
import { AttributePresets } from './components/AttributePresets';
import { DebugPanel } from './components/DebugPanel';
import { TroubleshootingTips } from './components/TroubleshootingTips';
import { IframePreview } from './components/IframePreview';

const initialDimensions: IframeDimensions = {
  width: 800,
  height: 600,
  widthUnit: 'px',
  heightUnit: 'px'
};

const initialAttributes: IframeAttributes = {
  allowFullscreen: true,
  allowPaymentRequest: false,
  allowAutoplay: false,
  allowCamera: false,
  allowMicrophone: false,
  allowGeolocation: false,
  allowClipboard: false,
  allowPopups: true,
  allowScripts: true,
  allowForms: true,
  allowModals: true,
  allowPointerLock: false,
  allowPresentation: false,
  allowTopNavigation: false
};

function App() {
  const [config, setConfig] = useState<IframeConfig>({
    url: '',
    dimensions: initialDimensions,
    attributes: initialAttributes,
    customAttributes: [],
    title: '',
    name: ''
  });

  const [errors, setErrors] = useState<{
    url?: string;
    width?: string;
    height?: string;
  }>({});

  const [selectedPreset, setSelectedPreset] = useState<string>();
  const [selectedAttributePreset, setSelectedAttributePreset] = useState<string>();
  const [isRenderMode, setIsRenderMode] = useState(false);

  // Load configuration from URL parameters on mount
  useEffect(() => {
    const urlConfig = decodeConfigFromUrl();
    if (urlConfig && urlConfig.url) {
      setConfig(prevConfig => ({
        ...prevConfig,
        ...urlConfig,
        dimensions: urlConfig.dimensions || prevConfig.dimensions,
        attributes: urlConfig.attributes || prevConfig.attributes,
        customAttributes: urlConfig.customAttributes || prevConfig.customAttributes
      }));
      setIsRenderMode(true);
    }
  }, []);

  // Validation
  useEffect(() => {
    const newErrors: typeof errors = {};

    if (config.url) {
      const urlValidation = validateUrl(config.url);
      if (!urlValidation.isValid) {
        newErrors.url = urlValidation.error;
      }
    }

    const widthValidation = validateDimension(config.dimensions.width, config.dimensions.widthUnit);
    if (!widthValidation.isValid) {
      newErrors.width = widthValidation.error;
    }

    const heightValidation = validateDimension(config.dimensions.height, config.dimensions.heightUnit);
    if (!heightValidation.isValid) {
      newErrors.height = heightValidation.error;
    }

    setErrors(newErrors);
  }, [config.url, config.dimensions]);

  const handleUrlChange = (url: string) => {
    setConfig(prev => ({
      ...prev,
      url: url ? sanitizeUrl(url) : ''
    }));
    setIsRenderMode(false);
  };

  const handleDimensionsChange = (dimensions: IframeDimensions) => {
    setConfig(prev => ({ ...prev, dimensions }));
    setSelectedPreset(undefined);
    setIsRenderMode(false);
  };

  const handleAttributesChange = (attributes: IframeAttributes) => {
    setConfig(prev => ({ ...prev, attributes }));
    setSelectedAttributePreset(undefined);
    setIsRenderMode(false);
  };

  const handleAttributePresetSelect = (attributes: IframeAttributes) => {
    setConfig(prev => ({ ...prev, attributes }));
    setIsRenderMode(false);
  };

  const handleCustomAttributesChange = (customAttributes: CustomAttribute[]) => {
    setConfig(prev => ({ ...prev, customAttributes }));
    setIsRenderMode(false);
  };

  const handlePresetSelect = (preset: PresetDimension) => {
    setSelectedPreset(preset.name);
    if (preset.name === 'Full Width') {
      setConfig(prev => ({
        ...prev,
        dimensions: {
          width: 100,
          height: preset.height,
          widthUnit: '%',
          heightUnit: 'px'
        }
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        dimensions: {
          width: preset.width,
          height: preset.height,
          widthUnit: preset.unit,
          heightUnit: preset.unit
        }
      }));
    }
    setIsRenderMode(false);
  };

  const handleRenderIframe = () => {
    if (isValid) {
      const renderUrl = buildRenderUrl(config);
      window.location.href = renderUrl;
    }
  };

  const handleClearRender = () => {
    window.location.href = window.location.origin + window.location.pathname;
  };

  const isValid = Object.keys(errors).length === 0 && config.url.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
            onClick={() => {
              setConfig(prev => ({
                ...prev,
                url: 'https://httpbin.org/html'
              }));
              setIsRenderMode(false);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Quick Test with Working Example
          </button>
        </div>

        {/* Render Mode Notice */}
        {isRenderMode && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-medium">
                  Iframe is currently being rendered with your settings
                </span>
              </div>
              <button
                onClick={handleClearRender}
                className="text-green-700 hover:text-green-800 text-sm underline"
              >
                Edit Settings
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* URL Input */}
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
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
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
                    onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
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

            {/* Dimensions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">Dimensions</h2>
              </div>
              
              <div className="space-y-6">
                <PresetDimensions 
                  onSelectPreset={handlePresetSelect}
                  selectedPreset={selectedPreset}
                />
                <DimensionControls
                  dimensions={config.dimensions}
                  onDimensionsChange={handleDimensionsChange}
                  errors={errors}
                />
              </div>
            </div>

            {/* Attributes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Security & Permissions</h2>
              <div className="space-y-6">
                <AttributePresets
                  onSelectPreset={handleAttributePresetSelect}
                  selectedPreset={selectedAttributePreset}
                />
                <AttributeControls
                  attributes={config.attributes}
                  customAttributes={config.customAttributes}
                  onAttributesChange={handleAttributesChange}
                  onCustomAttributesChange={handleCustomAttributesChange}
                />
              </div>
            </div>

            {/* Troubleshooting Tips */}
            <TroubleshootingTips />
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit space-y-4">
            <IframePreview config={config} isValid={isValid} isRenderMode={isRenderMode} />
            <DebugPanel config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;