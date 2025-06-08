import { useCallback } from 'react';
import { IframeDimensions, IframeAttributes, CustomAttribute, PresetDimension } from '../types/iframe';
import { sanitizeUrl } from '../utils/validation';
import { buildRenderUrl } from '../utils/urlParams';
import { useIframeContext } from '../contexts/IframeContext';
import { ACTIONS } from '../types/actions';

export function useIframeActions() {
  const { config, errors, dispatch } = useIframeContext();

  const handleUrlChange = useCallback((url: string) => {
    const sanitizedUrl = url ? sanitizeUrl(url) : '';
    dispatch({ type: ACTIONS.SET_URL, payload: sanitizedUrl });
  }, [dispatch]);

  const handleDimensionsChange = useCallback((dimensions: IframeDimensions) => {
    dispatch({ type: ACTIONS.SET_DIMENSIONS, payload: dimensions });
  }, [dispatch]);

  const handleAttributesChange = useCallback((attributes: IframeAttributes) => {
    dispatch({ type: ACTIONS.SET_ATTRIBUTES, payload: attributes });
    dispatch({ type: ACTIONS.SET_SELECTED_ATTRIBUTE_PRESET, payload: undefined });
  }, [dispatch]);

  const handleAttributePresetSelect = useCallback((attributes: IframeAttributes, presetName: string) => {
    dispatch({ type: ACTIONS.SET_ATTRIBUTES, payload: attributes });
    dispatch({ type: ACTIONS.SET_SELECTED_ATTRIBUTE_PRESET, payload: presetName });
    dispatch({ type: ACTIONS.SET_EXPAND_ALL_SECTIONS, payload: true });
  }, [dispatch]);

  const handleCustomAttributesChange = useCallback((customAttributes: CustomAttribute[]) => {
    dispatch({ type: ACTIONS.SET_CUSTOM_ATTRIBUTES, payload: customAttributes });
  }, [dispatch]);

  const handlePresetSelect = useCallback((preset: PresetDimension) => {
    dispatch({ type: ACTIONS.SET_SELECTED_PRESET, payload: preset.name });
    
    if (preset.name === 'Full Width') {
      dispatch({
        type: ACTIONS.SET_DIMENSIONS,
        payload: {
          width: 100,
          height: preset.height,
          widthUnit: '%',
          heightUnit: 'px'
        }
      });
    } else {
      dispatch({
        type: ACTIONS.SET_DIMENSIONS,
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
    dispatch({ type: ACTIONS.SET_SHOW_EDIT_SETTINGS, payload: true });
  }, [dispatch]);

  const handleQuickTest = useCallback(() => {
    dispatch({
      type: ACTIONS.SET_CONFIG,
      payload: { url: 'https://httpbin.org/html' }
    });
    dispatch({ type: ACTIONS.SET_RENDER_MODE, payload: false });
  }, [dispatch]);

  const handleResetExpansion = useCallback(() => {
    dispatch({ type: ACTIONS.SET_EXPAND_ALL_SECTIONS, payload: false });
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
    handleQuickTest,
    handleResetExpansion
  };
} 