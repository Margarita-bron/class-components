export type ErrorElementProps = {
  errorContext?: string;
};

export const ErrorElement = ({ errorContext }: ErrorElementProps) => (
  <h1 className="text-base font-semibold text-indigo-600">
    {errorContext == 'details' ? 'error loading details' : 'error'}
  </h1>
);
