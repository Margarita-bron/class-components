export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        role="status"
        aria-label="loading"
        className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"
      ></div>
    </div>
  );
};
