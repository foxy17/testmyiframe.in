import React from 'react';
import { useIframeContext } from '../../contexts/IframeContext';
import { useIframeActions } from '../../hooks';
import { AttributePresets } from '../AttributePresets';
import { AttributeControls } from '../AttributeControls';

export function AttributesSection() {
  const { config, selectedAttributePreset, expandAllSections } = useIframeContext();
  const { 
    handleAttributesChange, 
    handleAttributePresetSelect, 
    handleCustomAttributesChange 
  } = useIframeActions();

  return (
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
          expandAllSections={expandAllSections}
        />
      </div>
    </div>
  );
} 