import { useEffect } from 'react';
import { validateUrl, validateDimension } from '../utils/validation';
import { useIframeContext } from '../contexts/IframeContext';

export function useValidation() {
  const { config, dispatch } = useIframeContext();

  useEffect(() => {
    const newErrors: { url?: string; width?: string; height?: string } = {};

    if (config.url) {
      const urlValidation = validateUrl(config.url);
      if (!urlValidation.isValid) {
        newErrors.url = urlValidation.error;
      }
    }

    const widthValidation = validateDimension(config.dimensions.width, config.dimensions.widthUnit);
    if (!widthValidation.isValid) {
      newErrors.width = widthValidation.error;
    }

    const heightValidation = validateDimension(config.dimensions.height, config.dimensions.heightUnit);
    if (!heightValidation.isValid) {
      newErrors.height = heightValidation.error;
    }

    dispatch({ type: 'SET_ERRORS', payload: newErrors });
  }, [config.url, config.dimensions, dispatch]);
} 