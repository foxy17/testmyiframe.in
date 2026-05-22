import React from 'react';
import { Settings } from 'lucide-react';
import { useIframeContext } from '../../contexts/IframeContext';
import { useIframeActions } from '../../hooks';
import { PresetDimensions } from '../PresetDimensions';
import { DimensionControls } from '../DimensionControls';

export function DimensionsSection() {
  const { config, errors, selectedPreset } = useIframeContext();
  const { handleDimensionsChange, handlePresetSelect } = useIframeActions();

  return (
    <div className="bg-clay-peach text-clay-ink rounded-clay-xl border border-clay-ink/10 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-clay-ink/80" />
        <h2 className="text-lg font-semibold text-clay-ink">Dimensions</h2>
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
  );
} 