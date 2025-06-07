import React from 'react';
import { IframeDimensions } from '../types/iframe';
import { validateDimension } from '../utils/validation';

interface DimensionControlsProps {
  dimensions: IframeDimensions;
  onDimensionsChange: (dimensions: IframeDimensions) => void;
  errors: { width?: string; height?: string };
}

export const DimensionControls: React.FC<DimensionControlsProps> = ({
  dimensions,
  onDimensionsChange,
  errors
}) => {
  const handleDimensionChange = (
    type: 'width' | 'height',
    value: string | 'px' | '%'
  ) => {
    if (type === 'width') {
      if (value === 'px' || value === '%') {
        onDimensionsChange({
          ...dimensions,
          widthUnit: value
        });
      } else {
        onDimensionsChange({
          ...dimensions,
          width: value
        });
      }
    } else {
      if (value === 'px' || value === '%') {
        onDimensionsChange({
          ...dimensions,
          heightUnit: value
        });
      } else {
        onDimensionsChange({
          ...dimensions,
          height: value
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Width
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange('width', e.target.value)}
            className={`
              flex-1 rounded-lg border px-3 py-2 text-sm transition-colors
              ${errors.width 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }
              focus:outline-none focus:ring-2
            `}
            placeholder="Enter width"
            min="1"
          />
          <select
            value={dimensions.widthUnit}
            onChange={(e) => handleDimensionChange('width', e.target.value as 'px' | '%')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
        {errors.width && (
          <p className="text-xs text-red-600">{errors.width}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Height
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) => handleDimensionChange('height', e.target.value)}
            className={`
              flex-1 rounded-lg border px-3 py-2 text-sm transition-colors
              ${errors.height 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }
              focus:outline-none focus:ring-2
            `}
            placeholder="Enter height"
            min="1"
          />
          <select
            value={dimensions.heightUnit}
            onChange={(e) => handleDimensionChange('height', e.target.value as 'px' | '%')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
        {errors.height && (
          <p className="text-xs text-red-600">{errors.height}</p>
        )}
      </div>
    </div>
  );
};