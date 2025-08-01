import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './error-boundary/ErrorBoundary.tsx';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
