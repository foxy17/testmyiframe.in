import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronDown, ChevronUp, Minimize2 } from 'lucide-react';
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
  // State to track if user has manually overridden the expandAllSections behavior
  const [manualOverride, setManualOverride] = useState(false);

  // Effect to expand all sections when expandAllSections prop is true
  useEffect(() => {
    if (expandAllSections && !manualOverride) {
      const allSections = new Set([
        ...attributeGroups.map(group => group.title),
        'Custom Attributes'
      ]);
      setExpandedSections(allSections);
    }
  }, [expandAllSections, manualOverride]);

  // Effect to reset manual override when expandAllSections becomes true (new preset selected)
  useEffect(() => {
    if (expandAllSections) {
      setManualOverride(false);
    }
  }, [expandAllSections]);

  const toggleSection = (sectionTitle: string) => {
    setManualOverride(true);
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const collapseAllSections = () => {
    setManualOverride(true);
    setExpandedSections(new Set());
  };

  const isSectionExpanded = (sectionTitle: string) => expandedSections.has(sectionTitle);

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
      {expandedSections.size > 0 && (
        <div className="flex justify-end">
          <button
            onClick={collapseAllSections}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-clay-ink/10 text-clay-ink rounded-clay-md hover:bg-clay-ink/20 transition-colors font-semibold"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Collapse All</span>
          </button>
        </div>
      )}
      
      {attributeGroups.map((group) => {
        const IconComponent = group.icon;
        const isExpanded = isSectionExpanded(group.title);
        
        return (
          <div key={group.title} className="space-y-3">
            <button
              onClick={() => toggleSection(group.title)}
              className="flex items-center justify-between w-full text-left p-3.5 rounded-clay-md border border-clay-ink/10 bg-white hover:border-clay-ink/20 hover:bg-clay-canvas/50 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <IconComponent className="w-4 h-4 text-clay-ink/75" />
                <h3 className="text-sm font-semibold text-clay-ink">{group.title}</h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-clay-ink/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-clay-ink/60" />
              )}
            </button>
            
            {isExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                {group.attributes.map((attr) => (
                  <label key={attr.key} className="flex items-start space-x-3 p-3.5 rounded-clay-md border border-clay-hairline bg-white hover:border-clay-primary/40 transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attributes[attr.key]}
                      onChange={(e) => handleAttributeChange(attr.key, e.target.checked)}
                      className="mt-0.5 rounded-clay-xs border-clay-hairline text-clay-primary focus:ring-0 focus:outline-none h-4.5 w-4.5 bg-white checked:bg-clay-primary cursor-pointer transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-clay-ink">{attr.label}</div>
                      <div className="text-xs text-clay-ink/65 mt-0.5">{attr.description}</div>
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
          className="flex items-center justify-between w-full text-left p-3.5 rounded-clay-md border border-clay-ink/10 bg-white hover:border-clay-ink/20 hover:bg-clay-canvas/50 transition-colors"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-semibold text-clay-ink">Custom Attributes</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Expand the section if it's collapsed
                  if (!isSectionExpanded('Custom Attributes')) {
                    toggleSection('Custom Attributes');
                  }
                  addCustomAttribute();
                }}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-clay-primary text-white rounded-clay-md hover:bg-clay-primary-active active:scale-[0.98] transition-all font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
              {isSectionExpanded('Custom Attributes') ? (
                <ChevronUp className="w-4 h-4 text-clay-ink/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-clay-ink/60" />
              )}
            </div>
          </div>
        </button>
        
        {isSectionExpanded('Custom Attributes') && customAttributes.length > 0 && (
          <div className="space-y-2.5 pl-1">
            {customAttributes.map((attr) => (
              <div key={attr.id} className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder="Attribute name"
                  value={attr.name}
                  onChange={(e) => updateCustomAttribute(attr.id, 'name', e.target.value)}
                  className="flex-1 rounded-clay-md border border-clay-hairline bg-white px-3 py-2 text-sm text-clay-ink focus:border-clay-primary focus:outline-none focus:ring-0 transition-colors h-10"
                />
                <input
                  type="text"
                  placeholder="Attribute value"
                  value={attr.value}
                  onChange={(e) => updateCustomAttribute(attr.id, 'value', e.target.value)}
                  className="flex-1 rounded-clay-md border border-clay-hairline bg-white px-3 py-2 text-sm text-clay-ink focus:border-clay-primary focus:outline-none focus:ring-0 transition-colors h-10"
                />
                <button
                  onClick={() => removeCustomAttribute(attr.id)}
                  className="px-3 py-2.5 text-clay-coral hover:bg-clay-coral/10 hover:text-clay-coral rounded-clay-md transition-colors"
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