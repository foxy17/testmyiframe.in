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
      <label className="block text-xs font-semibold text-clay-ink/75 uppercase tracking-wider">
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
                flex flex-col items-center p-3 rounded-clay-md border transition-all duration-200
                ${isSelected 
                  ? 'border-clay-primary bg-clay-surface-card text-clay-ink border-2 shadow-sm scale-[0.98]' 
                  : 'border-clay-hairline bg-white text-clay-ink/80 hover:border-clay-primary/40 hover:bg-clay-canvas/50'
                }
              `}
            >
              <IconComponent className="w-4 h-4 mb-1 text-clay-ink/75" />
              <span className="text-xs font-semibold">{preset.name}</span>
              <span className="text-[10px] text-clay-ink/60">
                {preset.width} × {preset.height}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};