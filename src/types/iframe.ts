export interface IframeDimensions {
  width: number | string;
  height: number | string;
  widthUnit: 'px' | '%';
  heightUnit: 'px' | '%';
}

export interface IframeAttributes {
  allowFullscreen: boolean;
  allowPaymentRequest: boolean;
  allowAutoplay: boolean;
  allowCamera: boolean;
  allowMicrophone: boolean;
  allowGeolocation: boolean;
  allowClipboard: boolean;
  allowPopups: boolean;
  allowScripts: boolean;
  allowForms: boolean;
  allowModals: boolean;
  allowPointerLock: boolean;
  allowPresentation: boolean;
  allowTopNavigation: boolean;
}

export interface CustomAttribute {
  id: string;
  name: string;
  value: string;
}

export interface IframeConfig {
  url: string;
  dimensions: IframeDimensions;
  attributes: IframeAttributes;
  customAttributes: CustomAttribute[];
  title?: string;
  name?: string;
}

export interface PresetDimension {
  name: string;
  width: number;
  height: number;
  unit: 'px';
  icon: string;
}