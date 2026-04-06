import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import { PageLoader } from './components/LoadingSkeleton';
import { validateEnv } from './lib/validateEnv';

// Validate environment variables at startup
validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
