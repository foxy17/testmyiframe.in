import React from 'react';
import { Shield, ShieldCheck, ShieldX, Zap } from 'lucide-react';
import { IframeAttributes } from '../types/iframe';

interface AttributePresetsProps {
  onSelectPreset: (attributes: IframeAttributes, presetName: string) => void;
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
      <label className="block text-xs font-semibold text-clay-ink/75 uppercase tracking-wider">
        Security Presets
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {presets.map((preset) => {
          const IconComponent = preset.icon;
          const isSelected = selectedPreset === preset.name;
          
          return (
            <button
              key={preset.name}
              onClick={() => onSelectPreset(preset.attributes, preset.name)}
              className={`
                flex items-start p-3 rounded-clay-md border transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-clay-primary bg-clay-surface-card border-2 shadow-sm' 
                  : 'border-clay-hairline bg-white hover:border-clay-primary/40 hover:bg-clay-canvas/50'
                }
              `}
            >
              <IconComponent className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-clay-ink/75" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-clay-ink">
                  {preset.name}
                </h4>
                <p className="text-xs mt-1 text-clay-ink/65">
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
