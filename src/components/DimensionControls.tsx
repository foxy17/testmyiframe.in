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
        <label className="block text-xs font-semibold text-clay-ink/75 uppercase tracking-wider">
          Width
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange('width', e.target.value)}
            className={`
              flex-1 min-w-0 rounded-clay-md border px-3 py-2 text-sm transition-all duration-200 bg-white text-clay-ink h-11
              ${errors.width 
                ? 'border-clay-error focus:border-clay-error bg-red-50' 
                : 'border-clay-hairline focus:border-clay-primary'
              }
              focus:outline-none focus:ring-0
            `}
            placeholder="Enter width"
            min="1"
          />
          <select
            value={dimensions.widthUnit}
            onChange={(e) => handleDimensionChange('width', e.target.value as 'px' | '%')}
            className="w-16 flex-shrink-0 rounded-clay-md border border-clay-hairline bg-white px-2 py-2 text-sm text-clay-ink focus:border-clay-primary focus:outline-none focus:ring-0 h-11 transition-all cursor-pointer"
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
        {errors.width && (
          <p className="text-xs font-semibold text-clay-error mt-1">{errors.width}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-clay-ink/75 uppercase tracking-wider">
          Height
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) => handleDimensionChange('height', e.target.value)}
            className={`
              flex-1 min-w-0 rounded-clay-md border px-3 py-2 text-sm transition-all duration-200 bg-white text-clay-ink h-11
              ${errors.height 
                ? 'border-clay-error focus:border-clay-error bg-red-50' 
                : 'border-clay-hairline focus:border-clay-primary'
              }
              focus:outline-none focus:ring-0
            `}
            placeholder="Enter height"
            min="1"
          />
          <select
            value={dimensions.heightUnit}
            onChange={(e) => handleDimensionChange('height', e.target.value as 'px' | '%')}
            className="w-16 flex-shrink-0 rounded-clay-md border border-clay-hairline bg-white px-2 py-2 text-sm text-clay-ink focus:border-clay-primary focus:outline-none focus:ring-0 h-11 transition-all cursor-pointer"
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
        {errors.height && (
          <p className="text-xs font-semibold text-clay-error mt-1">{errors.height}</p>
        )}
      </div>
    </div>
  );
};