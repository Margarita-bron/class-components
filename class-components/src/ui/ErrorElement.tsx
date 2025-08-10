import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';

function parseErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined | null
) {
  if (!error) return null;

  let statusText = '';
  let errorMessage = '';
  let errorError = '';
  let errorData = '';

  if ('status' in error) {
    if (typeof error.status === 'number') {
      statusText = `Status: ${error.status}`;
    } else if (typeof error.status === 'string') {
      statusText = `Error Type: ${error.status}`;
    }
  }

  if ('message' in error && typeof error.message === 'string') {
    errorMessage = error.message;
  }

  if ('error' in error && typeof error.error === 'string') {
    errorError = error.error;
  }

  if ('data' in error) {
    if (typeof error.data === 'string') {
      errorData = error.data;
    } else if (typeof error.data === 'object' && error.data !== null) {
      try {
        errorData = String(
          Object.entries(error.data)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')
        );
      } catch {
        errorData = 'Unable to serialize error data]';
      }
    }
  }

  if (!statusText && !errorMessage && !errorData) {
    return {
      statusText: 'Unknown Error',
      errorMessage: String(error),
      errorError: '',
      errorData: '',
    };
  }

  return {
    status,
    statusText,
    errorMessage,
    errorData,
  };
}

export type ErrorElementProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
  errorContext: string;
};

export const ErrorElement = ({ error, errorContext }: ErrorElementProps) => {
  const errorContainer = parseErrorMessage(error);
  if (!error) return null;

  return (
    <div className="error-element">
      <p>Oops... Problem with {errorContext}</p>
      {errorContainer !== null && (
        <h1 className="text-base font-semibold text-indigo-600">
          <strong>{errorContainer.statusText}</strong>
        </h1>
      )}
      {errorContainer !== null && errorContainer.errorMessage && (
        <p>{errorContainer.errorMessage}</p>
      )}
      {errorContainer !== null && errorContainer.errorError && (
        <pre>{errorContainer.errorError}</pre>
      )}
      {errorContainer !== null && errorContainer.errorData && (
        <pre>{errorContainer.errorData}</pre>
      )}
    </div>
  );
};
