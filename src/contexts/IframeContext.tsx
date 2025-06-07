import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { IframeConfig, IframeDimensions, IframeAttributes, CustomAttribute } from '../types/iframe';

const initialDimensions: IframeDimensions = {
  width: 800,
  height: 600,
  widthUnit: 'px',
  heightUnit: 'px'
};

const initialAttributes: IframeAttributes = {
  allowFullscreen: true,
  allowPaymentRequest: false,
  allowAutoplay: false,
  allowCamera: false,
  allowMicrophone: false,
  allowGeolocation: false,
  allowClipboard: false,
  allowPopups: true,
  allowScripts: true,
  allowForms: true,
  allowModals: true,
  allowPointerLock: false,
  allowPresentation: false,
  allowTopNavigation: false
};

const initialConfig: IframeConfig = {
  url: '',
  dimensions: initialDimensions,
  attributes: initialAttributes,
  customAttributes: [],
  title: '',
  name: ''
};

interface IframeState {
  config: IframeConfig;
  errors: {
    url?: string;
    width?: string;
    height?: string;
  };
  selectedPreset?: string;
  selectedAttributePreset?: string;
  isRenderMode: boolean;
  showEditSettings: boolean;
}

type IframeAction =
  | { type: 'SET_CONFIG'; payload: Partial<IframeConfig> }
  | { type: 'SET_URL'; payload: string }
  | { type: 'SET_DIMENSIONS'; payload: IframeDimensions }
  | { type: 'SET_ATTRIBUTES'; payload: IframeAttributes }
  | { type: 'SET_CUSTOM_ATTRIBUTES'; payload: CustomAttribute[] }
  | { type: 'SET_ERRORS'; payload: IframeState['errors'] }
  | { type: 'SET_SELECTED_PRESET'; payload: string | undefined }
  | { type: 'SET_SELECTED_ATTRIBUTE_PRESET'; payload: string | undefined }
  | { type: 'SET_RENDER_MODE'; payload: boolean }
  | { type: 'SET_SHOW_EDIT_SETTINGS'; payload: boolean };

const initialState: IframeState = {
  config: initialConfig,
  errors: {},
  selectedPreset: undefined,
  selectedAttributePreset: undefined,
  isRenderMode: false,
  showEditSettings: false
};

function iframeReducer(state: IframeState, action: IframeAction): IframeState {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload }
      };
    case 'SET_URL':
      return {
        ...state,
        config: { ...state.config, url: action.payload },
        isRenderMode: false
      };
    case 'SET_DIMENSIONS':
      return {
        ...state,
        config: { ...state.config, dimensions: action.payload },
        selectedPreset: undefined,
        isRenderMode: false
      };
    case 'SET_ATTRIBUTES':
      return {
        ...state,
        config: { ...state.config, attributes: action.payload },
        selectedAttributePreset: undefined,
        isRenderMode: false
      };
    case 'SET_CUSTOM_ATTRIBUTES':
      return {
        ...state,
        config: { ...state.config, customAttributes: action.payload },
        isRenderMode: false
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'SET_SELECTED_PRESET':
      return {
        ...state,
        selectedPreset: action.payload
      };
    case 'SET_SELECTED_ATTRIBUTE_PRESET':
      return {
        ...state,
        selectedAttributePreset: action.payload
      };
    case 'SET_RENDER_MODE':
      return {
        ...state,
        isRenderMode: action.payload
      };
    case 'SET_SHOW_EDIT_SETTINGS':
      return {
        ...state,
        showEditSettings: action.payload
      };
    default:
      return state;
  }
}

interface IframeContextType extends IframeState {
  dispatch: React.Dispatch<IframeAction>;
}

const IframeContext = createContext<IframeContextType | undefined>(undefined);

export function IframeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(iframeReducer, initialState);

  return (
    <IframeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </IframeContext.Provider>
  );
}

export function useIframeContext() {
  const context = useContext(IframeContext);
  if (context === undefined) {
    throw new Error('useIframeContext must be used within an IframeProvider');
  }
  return context;
} 