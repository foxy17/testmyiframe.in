import { useCallback } from 'react';
import { IframeDimensions, IframeAttributes, CustomAttribute, PresetDimension } from '../types/iframe';
import { sanitizeUrl } from '../utils/validation';
import { buildRenderUrl } from '../utils/urlParams';
import { useIframeContext } from '../contexts/IframeContext';

export function useIframeActions() {
  const { config, errors, dispatch } = useIframeContext();

  const handleUrlChange = useCallback((url: string) => {
    const sanitizedUrl = url ? sanitizeUrl(url) : '';
    dispatch({ type: 'SET_URL', payload: sanitizedUrl });
  }, [dispatch]);

  const handleDimensionsChange = useCallback((dimensions: IframeDimensions) => {
    dispatch({ type: 'SET_DIMENSIONS', payload: dimensions });
  }, [dispatch]);

  const handleAttributesChange = useCallback((attributes: IframeAttributes) => {
    dispatch({ type: 'SET_ATTRIBUTES', payload: attributes });
  }, [dispatch]);

  const handleAttributePresetSelect = useCallback((attributes: IframeAttributes) => {
    dispatch({ type: 'SET_ATTRIBUTES', payload: attributes });
  }, [dispatch]);

  const handleCustomAttributesChange = useCallback((customAttributes: CustomAttribute[]) => {
    dispatch({ type: 'SET_CUSTOM_ATTRIBUTES', payload: customAttributes });
  }, [dispatch]);

  const handlePresetSelect = useCallback((preset: PresetDimension) => {
    dispatch({ type: 'SET_SELECTED_PRESET', payload: preset.name });
    
    if (preset.name === 'Full Width') {
      dispatch({
        type: 'SET_DIMENSIONS',
        payload: {
          width: 100,
          height: preset.height,
          widthUnit: '%',
          heightUnit: 'px'
        }
      });
    } else {
      dispatch({
        type: 'SET_DIMENSIONS',
        payload: {
          width: preset.width,
          height: preset.height,
          widthUnit: preset.unit,
          heightUnit: preset.unit
        }
      });
    }
  }, [dispatch]);

  const handleRenderIframe = useCallback(() => {
    const isValid = Object.keys(errors).length === 0 && config.url.length > 0;
    if (isValid) {
      const renderUrl = buildRenderUrl(config);
      window.location.href = renderUrl;
    }
  }, [config, errors]);

  const handleClearRender = useCallback(() => {
    window.location.href = window.location.origin + window.location.pathname;
  }, []);

  const handleEditSettings = useCallback(() => {
    dispatch({ type: 'SET_SHOW_EDIT_SETTINGS', payload: true });
  }, [dispatch]);

  const handleQuickTest = useCallback(() => {
    dispatch({
      type: 'SET_CONFIG',
      payload: { url: 'https://httpbin.org/html' }
    });
    dispatch({ type: 'SET_RENDER_MODE', payload: false });
  }, [dispatch]);

  return {
    handleUrlChange,
    handleDimensionsChange,
    handleAttributesChange,
    handleAttributePresetSelect,
    handleCustomAttributesChange,
    handlePresetSelect,
    handleRenderIframe,
    handleClearRender,
    handleEditSettings,
    handleQuickTest
  };
} 