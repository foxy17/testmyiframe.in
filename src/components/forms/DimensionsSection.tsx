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
  );
} 