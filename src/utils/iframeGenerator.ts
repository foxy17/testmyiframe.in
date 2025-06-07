import { IframeConfig } from '../types/iframe';
import { formatDimension } from './validation';

export const generateIframeCode = (config: IframeConfig): string => {
  const { url, dimensions, attributes, customAttributes, title, name } = config;
  
  const width = formatDimension(dimensions.width, dimensions.widthUnit);
  const height = formatDimension(dimensions.height, dimensions.heightUnit);
  
  // Build sandbox attribute
  const sandboxValues: string[] = [];
  if (attributes.allowScripts) sandboxValues.push('allow-scripts');
  if (attributes.allowForms) sandboxValues.push('allow-forms');
  if (attributes.allowPopups) sandboxValues.push('allow-popups');
  if (attributes.allowModals) sandboxValues.push('allow-modals');
  if (attributes.allowPointerLock) sandboxValues.push('allow-pointer-lock');
  if (attributes.allowPresentation) sandboxValues.push('allow-presentation');
  if (attributes.allowTopNavigation) sandboxValues.push('allow-top-navigation');

  // Only add allow-same-origin if we have other permissions to prevent conflicts
  if (sandboxValues.length > 0) {
    sandboxValues.push('allow-same-origin');
  }
  
  // Build allow attribute for Permissions Policy
  const allowValues: string[] = [];
  if (attributes.allowAutoplay) allowValues.push('autoplay');
  if (attributes.allowCamera) allowValues.push('camera');
  if (attributes.allowMicrophone) allowValues.push('microphone');
  if (attributes.allowGeolocation) allowValues.push('geolocation');
  if (attributes.allowClipboard) allowValues.push('clipboard-write');
  if (attributes.allowPaymentRequest) allowValues.push('payment');
  
  const iframeAttributes = [
    `src="${url}"`,
    `width="${width}"`,
    `height="${height}"`
  ];
  
  if (title) iframeAttributes.push(`title="${title}"`);
  if (name) iframeAttributes.push(`name="${name}"`);
  if (attributes.allowFullscreen) iframeAttributes.push('allowfullscreen');
  
  if (sandboxValues.length > 0) {
    iframeAttributes.push(`sandbox="${sandboxValues.join(' ')}"`);
  }
  
  if (allowValues.length > 0) {
    iframeAttributes.push(`allow="${allowValues.join('; ')}"`);
  }
  
  // Add custom attributes
  customAttributes.forEach(attr => {
    if (attr.name && attr.value) {
      iframeAttributes.push(`${attr.name}="${attr.value}"`);
    }
  });
  
  return `<iframe\n  ${iframeAttributes.join('\n  ')}\n></iframe>`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};