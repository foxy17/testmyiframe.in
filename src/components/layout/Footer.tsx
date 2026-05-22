import React from 'react';
import { Link } from '../Link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-clay-surface-soft border-t border-clay-hairline mt-20 py-12 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand and short description */}
        <div className="text-center md:text-left space-y-1">
          <div className="font-clayDisplay font-semibold text-clay-ink text-base">
            Iframe Tester
          </div>
          <p className="text-xs text-clay-muted">
            Advanced developer tool for real-time iframe sandboxing and debugging.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-clay-muted">
          <Link to="/" className="hover:text-clay-ink transition-colors">
            Iframe Tester
          </Link>
          <Link to="/guide" className="hover:text-clay-ink transition-colors">
            Guide & FAQ
          </Link>
        </div>

        {/* Right Side: Creator Credits */}
        <div className="text-center md:text-right text-xs text-clay-muted">
          <p>© {new Date().getFullYear()} Iframe Tester. All Rights Reserved.</p>
          <p className="mt-1">
            Made with ❤️ in India by{' '}
            <a
              href="https://carnav.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay-ink hover:underline font-semibold"
            >
              Arnav
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
