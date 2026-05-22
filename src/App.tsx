import { useState, useEffect } from 'react';
import { IframeProvider } from './contexts/IframeContext';
import { useValidation, useUrlParams } from './hooks';
import { Header, RenderModeNotice, AppLayout, Navbar, Footer } from './components/layout';
import { IframeGuide } from './components/IframeGuide';

function GuidePage() {
  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Informative banner for the guide page */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-clay-pill bg-clay-lavender/30 text-clay-ink font-semibold text-xs tracking-wider uppercase">
          📚 Complete Developer Guide
        </div>
        <h1 className="text-4xl sm:text-5xl font-clayDisplay font-medium tracking-[-0.04em] text-clay-ink">
          How to Test and Debug Iframes
        </h1>
        <p className="text-clay-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Check webpage embed capabilities, configure security sandbox policies, troubleshoot blank frames, and resolve cross-origin issues.
        </p>
      </div>

      <IframeGuide />
    </div>
  );
}

function AppContent() {
  useValidation();
  useUrlParams();

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isGuidePage = path.startsWith('/guide') || path === '/guide.html';

  return (
    <div className="min-h-screen bg-clay-canvas text-clay-body selection:bg-clay-peach/30 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6">
          {isGuidePage ? (
            <GuidePage />
          ) : (
            <>
              <Header />
              <RenderModeNotice />
              <AppLayout />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <IframeProvider>
      <AppContent />
    </IframeProvider>
  );
}

export default App;