import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './error-boundary/ErrorBoundary.tsx';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
