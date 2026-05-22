import React from 'react';
import { Zap } from 'lucide-react';
import { useIframeActions } from '../../hooks';

export function Header() {
  const { handleQuickTest } = useIframeActions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
      {/* Left Column: Logo, Title, Intro, CTA */}
      <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0 justify-center lg:justify-start">
          <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Iframe Tester Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-clayDisplay font-medium tracking-[-0.04em] text-clay-ink">
              Iframe Tester
            </h1>
            <p className="text-xs font-semibold text-clay-pink tracking-[1.5px] uppercase mt-1">
              Advanced Embedded Web Testing
            </p>
          </div>
        </div>
        
        <p className="text-clay-body text-base sm:text-lg max-w-2xl lg:max-w-xl mx-auto lg:mx-0 leading-relaxed font-clayBody">
          Test and configure iframe elements with granular security controls, sandbox policies, 
          responsive dimension presets, and clean production-ready code generation.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button
            onClick={handleQuickTest}
            className="inline-flex items-center px-5 py-3 bg-clay-primary text-white rounded-clay-md hover:bg-clay-primary-active active:scale-[0.98] transition-all font-semibold text-sm shadow-md hover:shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2 text-clay-peach fill-clay-peach" />
            Quick Test with Working Example
          </button>
        </div>
      </div>

      {/* Right Column: 3D Mascot Illustration Card */}
      <div className="hidden lg:block lg:col-span-5">
        <div className="bg-clay-surface-soft border border-clay-hairline rounded-clay-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm aspect-[4/3] max-w-md mx-auto lg:max-w-none">
          <div className="absolute top-3 left-3 flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-clay-pink/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-clay-peach/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-clay-ochre/30"></div>
          </div>
          <img 
            src="/mascot.png" 
            alt="3D Claymation Helper Mascot" 
            className="w-4/5 max-h-[85%] object-contain drop-shadow-md hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
} 