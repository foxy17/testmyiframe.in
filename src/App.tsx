import { IframeProvider } from './contexts/IframeContext';
import { useValidation, useUrlParams } from './hooks';
import { Header, RenderModeNotice, AppLayout } from './components/layout';
import { IframeGuide } from './components/IframeGuide';

function AppContent() {
  useValidation();
  useUrlParams();

  return (
    <div className="min-h-screen bg-clay-canvas text-clay-body selection:bg-clay-peach/30">
      <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6">
        <Header />
        <RenderModeNotice />
        <AppLayout />
        <IframeGuide />
      </div>
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