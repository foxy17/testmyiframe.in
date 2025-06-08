import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { IframeAttributes, CustomAttribute } from '../types/iframe';
import { attributeGroups } from '../utils/constants';

interface AttributeControlsProps {
  attributes: IframeAttributes;
  customAttributes: CustomAttribute[];
  onAttributesChange: (attributes: IframeAttributes) => void;
  onCustomAttributesChange: (customAttributes: CustomAttribute[]) => void;
  expandAllSections?: boolean;
}

export const AttributeControls: React.FC<AttributeControlsProps> = ({
  attributes,
  customAttributes,
  onAttributesChange,
  onCustomAttributesChange,
  expandAllSections = false
}) => {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Effect to expand all sections when expandAllSections prop is true
  useEffect(() => {
    if (expandAllSections) {
      const allSections = new Set([
        ...attributeGroups.map(group => group.title),
        'Custom Attributes'
      ]);
      setExpandedSections(allSections);
    }
  }, [expandAllSections]);

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const isSectionExpanded = (sectionTitle: string) => expandedSections.has(sectionTitle) || expandAllSections;

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



  return (
    <div className="space-y-6">
      {attributeGroups.map((group) => {
        const IconComponent = group.icon;
        const isExpanded = isSectionExpanded(group.title);
        
        return (
          <div key={group.title} className="space-y-3">
            <button
              onClick={() => toggleSection(group.title)}
              className="flex items-center justify-between w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <IconComponent className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-700">{group.title}</h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {isExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
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
            )}
          </div>
        );
      })}

      <div className="space-y-3">
        <button
          onClick={() => toggleSection('Custom Attributes')}
          className="flex items-center justify-between w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between w-full">
            <label className="text-sm font-medium text-gray-700">Custom Attributes</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addCustomAttribute();
                }}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
              {isSectionExpanded('Custom Attributes') ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        </button>
        
        {isSectionExpanded('Custom Attributes') && customAttributes.length > 0 && (
          <div className="space-y-2 pl-2">
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