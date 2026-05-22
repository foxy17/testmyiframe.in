import { UrlInputSection, DimensionsSection, AttributesSection } from '../forms';
import { TroubleshootingTips } from '../TroubleshootingTips';

interface ConfigurationPanelProps {
  layoutMode?: 'stacked' | 'grid';
}

export function ConfigurationPanel({ layoutMode = 'stacked' }: ConfigurationPanelProps) {
  if (layoutMode === 'grid') {
    return (
      <div className="space-y-6">
        <UrlInputSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <DimensionsSection />
          <AttributesSection />
        </div>
        <TroubleshootingTips />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UrlInputSection />
      <DimensionsSection />
      <AttributesSection />
      <TroubleshootingTips />
    </div>
  );
} 