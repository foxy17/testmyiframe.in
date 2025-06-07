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
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-lg font-semibold text-gray-800">Troubleshooting Tips</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getBgColor(tip.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getIconColor(tip.type)}`} />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-gray-700">
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
