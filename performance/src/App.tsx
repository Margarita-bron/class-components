import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import Layout from './layout/Layout';
import { queryClient } from './queryClient';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
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
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => queryClient.resetQueries()}
    >
      <Layout />
    </ErrorBoundary>
  );
}

export default App;
