import React from 'react';
import { Link } from '../Link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-clay-surface-soft border-t border-clay-hairline mt-20 py-12 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand and short description */}
        <div className="text-center md:text-left space-y-2 max-w-sm">
          <div className="font-clayDisplay font-semibold text-clay-ink text-base">
            Iframe Tester
          </div>
          <p className="text-xs text-clay-muted leading-relaxed">
            Advanced developer tool for real-time iframe sandboxing and debugging.
          </p>
          <p className="text-[11px] text-clay-muted/80 leading-relaxed font-clayBody">
            <strong>🔒 Privacy Guarantee:</strong> All testing is done entirely client-side. We never send, log, or store your test URLs or header configurations.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-col items-center gap-2 text-sm font-semibold text-clay-muted">
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="hover:text-clay-ink transition-colors">
              Iframe Tester
            </Link>
            <Link to="/guide" className="hover:text-clay-ink transition-colors">
              Guide & FAQ
            </Link>
          </div>
          <a
            href="https://github.com/foxy17/testmyiframe.in/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-clay-muted hover:text-clay-ink transition-colors hover:underline"
          >
            💬 Report Bug / Feedback
          </a>
        </div>

        {/* Right Side: Creator Credits */}
        <div className="text-center md:text-right text-xs text-clay-muted space-y-1">
          <p>© {new Date().getFullYear()} Iframe Tester. All Rights Reserved.</p>
          <p>
            Created by{' '}
            <a
              href="https://carnav.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay-ink hover:underline font-bold"
            >
              Arnav
            </a>{' '}
            — web security developer.
          </p>
        </div>

      </div>
    </footer>
  );
};
