import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import Layout from './layout/Layout';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from './loading/Loading';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  console.error('Caught error:', error);
  return (
    <div role="alert">
      <p>Oops..something went wrong</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

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
