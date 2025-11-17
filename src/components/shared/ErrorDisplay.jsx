export const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-4 p-4 neo-border border-red-600 bg-red-50">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-red-600">Error</span>
        {error.status && (
          <span className="status-badge status-error">
            {error.status} {error.statusText}
          </span>
        )}
      </div>
      <p className="text-red-600 font-mono text-sm">
        {error.data?.error || error.data?.message || 'An error occurred'}
      </p>
    </div>
  );
};
