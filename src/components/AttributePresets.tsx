import React from 'react';
import { Shield, ShieldCheck, ShieldX, Zap } from 'lucide-react';
import { IframeAttributes } from '../types/iframe';

interface AttributePresetsProps {
  onSelectPreset: (attributes: IframeAttributes) => void;
  selectedPreset?: string;
}

interface AttributePreset {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  attributes: IframeAttributes;
}

const presets: AttributePreset[] = [
  {
    name: 'Permissive',
    description: 'Maximum compatibility - allows most features',
    icon: ShieldCheck,
    attributes: {
      allowFullscreen: true,
      allowPaymentRequest: false,
      allowAutoplay: true,
      allowCamera: false,
      allowMicrophone: false,
      allowGeolocation: false,
      allowClipboard: true,
      allowPopups: true,
      allowScripts: true,
      allowForms: true,
      allowModals: true,
      allowPointerLock: false,
      allowPresentation: true,
      allowTopNavigation: false
    }
  },
  {
    name: 'Secure',
    description: 'Restricted permissions for untrusted content',
    icon: Shield,
    attributes: {
      allowFullscreen: false,
      allowPaymentRequest: false,
      allowAutoplay: false,
      allowCamera: false,
      allowMicrophone: false,
      allowGeolocation: false,
      allowClipboard: false,
      allowPopups: false,
      allowScripts: false,
      allowForms: false,
      allowModals: false,
      allowPointerLock: false,
      allowPresentation: false,
      allowTopNavigation: false
    }
  },
  {
    name: 'Media',
    description: 'Optimized for video and media content',
    icon: Zap,
    attributes: {
      allowFullscreen: true,
      allowPaymentRequest: false,
      allowAutoplay: true,
      allowCamera: false,
      allowMicrophone: false,
      allowGeolocation: false,
      allowClipboard: false,
      allowPopups: false,
      allowScripts: true,
      allowForms: false,
      allowModals: false,
      allowPointerLock: false,
      allowPresentation: true,
      allowTopNavigation: false
    }
  },
  {
    name: 'Interactive',
    description: 'For forms and interactive applications',
    icon: ShieldX,
    attributes: {
      allowFullscreen: false,
      allowPaymentRequest: false,
      allowAutoplay: false,
      allowCamera: false,
      allowMicrophone: false,
      allowGeolocation: false,
      allowClipboard: true,
      allowPopups: true,
      allowScripts: true,
      allowForms: true,
      allowModals: true,
      allowPointerLock: false,
      allowPresentation: false,
      allowTopNavigation: false
    }
  }
];

export const AttributePresets: React.FC<AttributePresetsProps> = ({
  onSelectPreset,
  selectedPreset
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Security Presets
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {presets.map((preset) => {
          const IconComponent = preset.icon;
          const isSelected = selectedPreset === preset.name;
          
          return (
            <button
              key={preset.name}
              onClick={() => onSelectPreset(preset.attributes)}
              className={`
                flex items-start p-3 rounded-lg border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <IconComponent className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                isSelected ? 'text-blue-600' : 'text-gray-500'
              }`} />
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${
                  isSelected ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {preset.name}
                </h4>
                <p className={`text-xs mt-1 ${
                  isSelected ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
