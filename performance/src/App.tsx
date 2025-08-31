import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import Layout from './layout/Layout';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from './loading/Loading';
import { ErrorFallback } from './components/error-boundary/ErrorFallback';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
