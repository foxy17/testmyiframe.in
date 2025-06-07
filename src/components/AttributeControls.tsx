import React from 'react';
import { Shield, Settings, Plus, X } from 'lucide-react';
import { IframeAttributes, CustomAttribute } from '../types/iframe';

interface AttributeControlsProps {
  attributes: IframeAttributes;
  customAttributes: CustomAttribute[];
  onAttributesChange: (attributes: IframeAttributes) => void;
  onCustomAttributesChange: (customAttributes: CustomAttribute[]) => void;
}

export const AttributeControls: React.FC<AttributeControlsProps> = ({
  attributes,
  customAttributes,
  onAttributesChange,
  onCustomAttributesChange
}) => {
  const handleAttributeChange = (key: keyof IframeAttributes, value: boolean) => {
    onAttributesChange({
      ...attributes,
      [key]: value
    });
  };

  const addCustomAttribute = () => {
    const newAttribute: CustomAttribute = {
      id: Date.now().toString(),
      name: '',
      value: ''
    };
    onCustomAttributesChange([...customAttributes, newAttribute]);
  };

  const updateCustomAttribute = (id: string, field: 'name' | 'value', value: string) => {
    onCustomAttributesChange(
      customAttributes.map(attr =>
        attr.id === id ? { ...attr, [field]: value } : attr
      )
    );
  };

  const removeCustomAttribute = (id: string) => {
    onCustomAttributesChange(customAttributes.filter(attr => attr.id !== id));
  };

  const attributeGroups = [
    {
      title: 'General Permissions',
      icon: Settings,
      attributes: [
        { key: 'allowFullscreen' as keyof IframeAttributes, label: 'Allow Fullscreen', description: 'Enable fullscreen API' },
        { key: 'allowPaymentRequest' as keyof IframeAttributes, label: 'Allow Payment Request', description: 'Enable payment request API' },
        { key: 'allowAutoplay' as keyof IframeAttributes, label: 'Allow Autoplay', description: 'Allow media autoplay' },
      ]
    },
    {
      title: 'Device Access',
      icon: Shield,
      attributes: [
        { key: 'allowCamera' as keyof IframeAttributes, label: 'Allow Camera', description: 'Access to camera' },
        { key: 'allowMicrophone' as keyof IframeAttributes, label: 'Allow Microphone', description: 'Access to microphone' },
        { key: 'allowGeolocation' as keyof IframeAttributes, label: 'Allow Geolocation', description: 'Access to location data' },
        { key: 'allowClipboard' as keyof IframeAttributes, label: 'Allow Clipboard', description: 'Access to clipboard' },
      ]
    },
    {
      title: 'Sandbox Permissions',
      icon: Shield,
      attributes: [
        { key: 'allowPopups' as keyof IframeAttributes, label: 'Allow Popups', description: 'Allow popup windows' },
        { key: 'allowScripts' as keyof IframeAttributes, label: 'Allow Scripts', description: 'Enable JavaScript execution' },
        { key: 'allowForms' as keyof IframeAttributes, label: 'Allow Forms', description: 'Enable form submission' },
        { key: 'allowModals' as keyof IframeAttributes, label: 'Allow Modals', description: 'Allow modal dialogs' },
        { key: 'allowPointerLock' as keyof IframeAttributes, label: 'Allow Pointer Lock', description: 'Enable pointer lock API' },
        { key: 'allowPresentation' as keyof IframeAttributes, label: 'Allow Presentation', description: 'Enable presentation API' },
        { key: 'allowTopNavigation' as keyof IframeAttributes, label: 'Allow Top Navigation', description: 'Allow navigation of top-level context' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {attributeGroups.map((group) => {
        const IconComponent = group.icon;
        return (
          <div key={group.title} className="space-y-3">
            <div className="flex items-center space-x-2">
              <IconComponent className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">{group.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.attributes.map((attr) => (
                <label key={attr.key} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={attributes[attr.key]}
                    onChange={(e) => handleAttributeChange(attr.key, e.target.checked)}
                    className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700">{attr.label}</div>
                    <div className="text-xs text-gray-500">{attr.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Custom Attributes</label>
          <button
            onClick={addCustomAttribute}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
        
        {customAttributes.length > 0 && (
          <div className="space-y-2">
            {customAttributes.map((attr) => (
              <div key={attr.id} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Attribute name"
                  value={attr.name}
                  onChange={(e) => updateCustomAttribute(attr.id, 'name', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Attribute value"
                  value={attr.value}
                  onChange={(e) => updateCustomAttribute(attr.id, 'value', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                  onClick={() => removeCustomAttribute(attr.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};