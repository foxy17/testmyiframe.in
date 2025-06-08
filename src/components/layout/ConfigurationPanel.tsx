import { UrlInputSection, DimensionsSection, AttributesSection } from '../forms';
import { TroubleshootingTips } from '../TroubleshootingTips';

export function ConfigurationPanel() {
  return (
    <div className="space-y-6">
      <UrlInputSection />
      <DimensionsSection />
      <AttributesSection />
      <TroubleshootingTips />
    </div>
  );
} 