import React from 'react';
import { Link } from '../Link';
import { Settings, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const currentPath = window.location.pathname;
  
  const isTesterActive = currentPath === '/' || currentPath === '' || currentPath === '/index.html';
  const isGuideActive = currentPath.startsWith('/guide') || currentPath === '/guide.html';

  return (
    <nav className="sticky top-0 z-50 bg-clay-canvas/80 backdrop-blur-md border-b border-clay-hairline py-4 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Brand Logo and Title */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img src="/logo.png" alt="Iframe Tester Logo" className="w-8 h-8 object-contain" />
          <span className="font-clayDisplay font-semibold text-lg text-clay-ink tracking-tight">
            Iframe Tester
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className={`
              flex items-center space-x-1.5 px-4 py-2 rounded-clay-pill font-clayDisplay text-sm font-semibold transition-all duration-200
              ${isTesterActive
                ? 'bg-clay-surface-card text-clay-ink shadow-sm'
                : 'text-clay-muted hover:text-clay-ink hover:bg-clay-surface-soft/60'
              }
            `}
          >
            <Settings className="w-4 h-4" />
            <span>Tester</span>
          </Link>
          
          <Link
            to="/guide"
            className={`
              flex items-center space-x-1.5 px-4 py-2 rounded-clay-pill font-clayDisplay text-sm font-semibold transition-all duration-200
              ${isGuideActive
                ? 'bg-clay-surface-card text-clay-ink shadow-sm'
                : 'text-clay-muted hover:text-clay-ink hover:bg-clay-surface-soft/60'
              }
            `}
          >
            <BookOpen className="w-4 h-4" />
            <span>Guide & FAQ</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
