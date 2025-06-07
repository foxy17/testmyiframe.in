import { IframeProvider } from './contexts/IframeContext';
import { useValidation, useUrlParams } from './hooks';
import { Header, RenderModeNotice, AppLayout } from './components/layout';

function AppContent() {
  useValidation();
  useUrlParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <RenderModeNotice />
        <AppLayout />
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