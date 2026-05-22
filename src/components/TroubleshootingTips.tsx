import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const TroubleshootingTips: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    {
      icon: CheckCircle,
      type: 'success',
      title: 'Use iframe-friendly sites',
      description: 'Try the suggested URLs above or sites that explicitly allow embedding like YouTube embeds, OpenStreetMap, or httpbin.org'
    },
    {
      icon: AlertTriangle,
      type: 'warning',
      title: 'Try the "Permissive" security preset',
      description: 'Many sites require specific sandbox permissions. The Permissive preset enables most features that sites commonly need.'
    },
    {
      icon: XCircle,
      type: 'error',
      title: 'Common blocking reasons',
      description: 'Sites may block iframes using X-Frame-Options headers, Content Security Policy, or JavaScript frame-busting scripts.'
    },
    {
      icon: HelpCircle,
      type: 'info',
      title: 'Check browser console',
      description: 'Open browser developer tools (F12) and check the Console tab for specific error messages about why the iframe failed to load.'
    },
    {
      icon: AlertTriangle,
      type: 'warning',
      title: 'HTTPS vs HTTP issues',
      description: 'If your site uses HTTPS, you cannot embed HTTP content due to mixed content security policies.'
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-clay-success';
      case 'warning': return 'text-clay-ochre';
      case 'error': return 'text-clay-coral';
      case 'info': return 'text-clay-lavender';
      default: return 'text-clay-muted';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-clay-mint/10 border-clay-mint/30';
      case 'warning': return 'bg-clay-peach/10 border-clay-peach/30';
      case 'error': return 'bg-clay-coral/10 border-clay-coral/30';
      case 'info': return 'bg-clay-lavender/10 border-clay-lavender/30';
      default: return 'bg-white border-clay-hairline';
    }
  };

  return (
    <div className="bg-clay-surface-card text-clay-ink rounded-clay-lg border border-clay-ink/10 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left focus:outline-none"
      >
        <h2 className="text-lg font-semibold text-clay-ink">Troubleshooting Tips</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-clay-ink/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-clay-ink/60" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <div
                key={index}
                className={`p-3.5 rounded-clay-md border ${getBgColor(tip.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getIconColor(tip.type)}`} />
                  <div>
                    <h3 className="text-sm font-semibold text-clay-ink mb-0.5">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-clay-body">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
