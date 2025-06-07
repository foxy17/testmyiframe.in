import { IframeConfig } from '../types/iframe';

export interface UrlParams {
  url?: string;
  width?: string;
  height?: string;
  widthUnit?: 'px' | '%';
  heightUnit?: 'px' | '%';
  title?: string;
  name?: string;
  allowFullscreen?: string;
  allowPaymentRequest?: string;
  allowAutoplay?: string;
  allowCamera?: string;
  allowMicrophone?: string;
  allowGeolocation?: string;
  allowClipboard?: string;
  allowPopups?: string;
  allowScripts?: string;
  allowForms?: string;
  allowModals?: string;
  allowPointerLock?: string;
  allowPresentation?: string;
  allowTopNavigation?: string;
  customAttrs?: string;
}

export const encodeConfigToUrl = (config: IframeConfig): string => {
  const params = new URLSearchParams();

  if (config.url) params.set('url', config.url);
  if (config.dimensions.width) params.set('width', config.dimensions.width.toString());
  if (config.dimensions.height) params.set('height', config.dimensions.height.toString());
  if (config.dimensions.widthUnit) params.set('widthUnit', config.dimensions.widthUnit);
  if (config.dimensions.heightUnit) params.set('heightUnit', config.dimensions.heightUnit);
  if (config.title) params.set('title', config.title);
  if (config.name) params.set('name', config.name);

  // Encode boolean attributes
  Object.entries(config.attributes).forEach(([key, value]) => {
    if (value) params.set(key, 'true');
  });

  // Encode custom attributes
  if (config.customAttributes.length > 0) {
    const customAttrsJson = JSON.stringify(config.customAttributes);
    params.set('customAttrs', customAttrsJson);
  }

  return params.toString();
};

export const decodeConfigFromUrl = (): Partial<IframeConfig> | null => {
  const params = new URLSearchParams(window.location.search);
  
  if (!params.has('url')) {
    return null;
  }

  const config: Partial<IframeConfig> = {
    url: params.get('url') || '',
    dimensions: {
      width: params.get('width') ? parseInt(params.get('width')!) : 800,
      height: params.get('height') ? parseInt(params.get('height')!) : 600,
      widthUnit: (params.get('widthUnit') as 'px' | '%') || 'px',
      heightUnit: (params.get('heightUnit') as 'px' | '%') || 'px'
    },
    attributes: {
      allowFullscreen: params.get('allowFullscreen') === 'true',
      allowPaymentRequest: params.get('allowPaymentRequest') === 'true',
      allowAutoplay: params.get('allowAutoplay') === 'true',
      allowCamera: params.get('allowCamera') === 'true',
      allowMicrophone: params.get('allowMicrophone') === 'true',
      allowGeolocation: params.get('allowGeolocation') === 'true',
      allowClipboard: params.get('allowClipboard') === 'true',
      allowPopups: params.get('allowPopups') === 'true',
      allowScripts: params.get('allowScripts') === 'true',
      allowForms: params.get('allowForms') === 'true',
      allowModals: params.get('allowModals') === 'true',
      allowPointerLock: params.get('allowPointerLock') === 'true',
      allowPresentation: params.get('allowPresentation') === 'true',
      allowTopNavigation: params.get('allowTopNavigation') === 'true'
    },
    customAttributes: [],
    title: params.get('title') || '',
    name: params.get('name') || ''
  };

  // Decode custom attributes
  const customAttrsParam = params.get('customAttrs');
  if (customAttrsParam) {
    try {
      config.customAttributes = JSON.parse(customAttrsParam);
    } catch (e) {
      console.error('Failed to parse custom attributes:', e);
    }
  }

  return config;
};

export const buildRenderUrl = (config: IframeConfig): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = encodeConfigToUrl(config);
  return `${baseUrl}?${params}`;
};