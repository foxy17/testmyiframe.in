import { useEffect } from 'react';
import { decodeConfigFromUrl } from '../utils/urlParams';
import { useIframeContext } from '../contexts/IframeContext';

export function useUrlParams() {
  const { dispatch } = useIframeContext();

  useEffect(() => {
    const urlConfig = decodeConfigFromUrl();
    if (urlConfig && urlConfig.url) {
      dispatch({
        type: 'SET_CONFIG',
        payload: {
          ...urlConfig,
          dimensions: urlConfig.dimensions,
          attributes: urlConfig.attributes,
          customAttributes: urlConfig.customAttributes || []
        }
      });
      dispatch({ type: 'SET_RENDER_MODE', payload: true });
    }
  }, [dispatch]);
} 