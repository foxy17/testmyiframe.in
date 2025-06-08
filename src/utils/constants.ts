import { Settings, Shield } from 'lucide-react';
import { IframeAttributes } from '../types/iframe';

export interface AttributeGroup {
  title: string;
  icon: typeof Settings | typeof Shield;
  attributes: Array<{
    key: keyof IframeAttributes;
    label: string;
    description: string;
  }>;
}

export const attributeGroups: AttributeGroup[] = [
  {
    title: 'General Permissions',
    icon: Settings,
    attributes: [
      { key: 'allowFullscreen' as keyof IframeAttributes, label: 'Allow Fullscreen', description: 'Enable fullscreen API' },
      { key: 'allowPaymentRequest' as keyof IframeAttributes, label: 'Allow Payment Request', description: 'Enable payment request API' },
      { key: 'allowAutoplay' as keyof IframeAttributes, label: 'Allow Autoplay', description: 'Allow media autoplay' },
    ]
  },
  {
    title: 'Device Access',
    icon: Shield,
    attributes: [
      { key: 'allowCamera' as keyof IframeAttributes, label: 'Allow Camera', description: 'Access to camera' },
      { key: 'allowMicrophone' as keyof IframeAttributes, label: 'Allow Microphone', description: 'Access to microphone' },
      { key: 'allowGeolocation' as keyof IframeAttributes, label: 'Allow Geolocation', description: 'Access to location data' },
      { key: 'allowClipboard' as keyof IframeAttributes, label: 'Allow Clipboard', description: 'Access to clipboard' },
    ]
  },
  {
    title: 'Sandbox Permissions',
    icon: Shield,
    attributes: [
      { key: 'allowPopups' as keyof IframeAttributes, label: 'Allow Popups', description: 'Allow popup windows' },
      { key: 'allowScripts' as keyof IframeAttributes, label: 'Allow Scripts', description: 'Enable JavaScript execution' },
      { key: 'allowForms' as keyof IframeAttributes, label: 'Allow Forms', description: 'Enable form submission' },
      { key: 'allowModals' as keyof IframeAttributes, label: 'Allow Modals', description: 'Allow modal dialogs' },
      { key: 'allowPointerLock' as keyof IframeAttributes, label: 'Allow Pointer Lock', description: 'Enable pointer lock API' },
      { key: 'allowPresentation' as keyof IframeAttributes, label: 'Allow Presentation', description: 'Enable presentation API' },
      { key: 'allowTopNavigation' as keyof IframeAttributes, label: 'Allow Top Navigation', description: 'Allow navigation of top-level context' },
    ]
  }
]; 