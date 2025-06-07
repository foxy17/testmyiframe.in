import { useIframeContext } from '../../contexts/IframeContext';
import { IframePreview } from '../IframePreview';
import { DebugPanel } from '../DebugPanel';

export function PreviewPanel() {
  const { config, errors, isRenderMode } = useIframeContext();
  const isValid = Object.keys(errors).length === 0 && config.url.length > 0;

  return (
    <div className="lg:sticky lg:top-8 lg:h-fit space-y-4">
      <IframePreview config={config} isValid={isValid} isRenderMode={isRenderMode} />
      <DebugPanel config={config} />
    </div>
  );
} 