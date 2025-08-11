type ApiError = {
  status?: number | string;
  statusText?: string;
  message?: string;
  description?: string;
};

export type ErrorElementProps = {
  error?: ApiError | null;
  errorContext: string;
};

export const ErrorElement = ({ error, errorContext }: ErrorElementProps) => {
  if (!error) return null;

  return (
    <div className="error-element">
      <p>Oops... Problem with {errorContext}</p>

      {error.status && (
        <h1 className="text-base font-bold text-indigo-600">
          {typeof error.status == 'string'
            ? `Error Type: ${error.status}`
            : `Status: ${error.status}`}
        </h1>
      )}
      {error.statusText && <p>{error.statusText}</p>}
      {error.message && (
        <p className="text-base font-semibold">{error.message}</p>
      )}
      {error.description && (
        <p>
          <em>{error.description}</em>
        </p>
      )}
    </div>
  );
};
