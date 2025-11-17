import { useState } from "react";
import { makeRequest, getMethodClass } from "../../utils/api";
import { ResponseDisplay } from "./ResponseDisplay";
import { ErrorDisplay } from "./ErrorDisplay";

export const EndpointSection = ({
  title,
  method,
  path,
  description,
  inputs = [],
  onTest,
  disabled = false,
  placeholder = false,
}) => {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      console.log("Testing endpoint with data: ", path);
      const result = await onTest(formData);
      if (result.ok) {
        setResponse(result);
      } else {
        setError(result);
      }
    } catch (err) {
      setError({
        ok: false,
        status: 0,
        statusText: "Error",
        data: { error: err.message },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`neo-card p-6 ${placeholder ? "opacity-50" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-bold">{title}</h4>
            {placeholder && (
              <span className="status-badge status-warning">
                Not Implemented
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`method-badge ${getMethodClass(method)}`}>
              {method}
            </span>
            <code className="text-sm font-mono">{path}</code>
          </div>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>

      {!placeholder && inputs.length > 0 && (
        <div className="space-y-3 mb-4">
          {inputs.map((input) => (
            <div key={input.name}>
              <label className="block text-sm font-semibold mb-1">
                {input.label}
                {input.required && <span className="text-red-500"> *</span>}
              </label>
              {input.type === "textarea" ? (
                <textarea
                  value={formData[input.name] || ""}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  placeholder={input.placeholder}
                  rows={3}
                  disabled={disabled}
                />
              ) : (
                <input
                  type={input.type || "text"}
                  value={formData[input.name] || ""}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  placeholder={input.placeholder}
                  disabled={disabled}
                />
              )}
              {input.hint && (
                <p className="text-xs text-gray-500 mt-1">{input.hint}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!placeholder && (
        <button
          onClick={handleTest}
          disabled={disabled || loading}
          className="btn-primary"
        >
          {loading ? "Testing..." : "Test Endpoint"}
        </button>
      )}

      <ResponseDisplay response={response} />
      <ErrorDisplay error={error} />
    </div>
  );
};
