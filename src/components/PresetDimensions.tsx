import React from 'react';
import { Smartphone, Tablet, Monitor, Maximize } from 'lucide-react';
import { PresetDimension } from '../types/iframe';

interface PresetDimensionsProps {
  onSelectPreset: (preset: PresetDimension) => void;
  selectedPreset?: string;
}

const presets: PresetDimension[] = [
  { name: 'Mobile', width: 375, height: 667, unit: 'px', icon: 'smartphone' },
  { name: 'Tablet', width: 768, height: 1024, unit: 'px', icon: 'tablet' },
  { name: 'Desktop', width: 1440, height: 900, unit: 'px', icon: 'monitor' },
  { name: 'Full Width', width: 100, height: 600, unit: 'px', icon: 'maximize' },
];

const iconMap = {
  smartphone: Smartphone,
  tablet: Tablet,
  monitor: Monitor,
  maximize: Maximize,
};

export const PresetDimensions: React.FC<PresetDimensionsProps> = ({
  onSelectPreset,
  selectedPreset
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Quick Presets
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {presets.map((preset) => {
          const IconComponent = iconMap[preset.icon as keyof typeof iconMap];
          const isSelected = selectedPreset === preset.name;
          
          return (
            <button
              key={preset.name}
              onClick={() => onSelectPreset(preset)}
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{preset.name}</span>
              <span className="text-xs text-gray-500">
                {preset.width} × {preset.height}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};