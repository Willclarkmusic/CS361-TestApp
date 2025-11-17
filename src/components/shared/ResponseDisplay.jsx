import { getStatusClass, formatJSON } from '../../utils/api';

export const ResponseDisplay = ({ response }) => {
  if (!response) return null;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-bold">Response:</span>
        <span className={`status-badge ${getStatusClass(response.status)}`}>
          {response.status} {response.statusText}
        </span>
      </div>
      <pre className="neo-card p-4 overflow-x-auto text-sm bg-gray-50">
        <code>{formatJSON(response.data)}</code>
      </pre>
    </div>
  );
};
