import { useState, useEffect } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { copyToClipboard } from "../../utils/api";

export const Header = ({ auth }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const sampleGameIds = [730, 578080];
  const sampleUserIds = [1, 2, 3];

  useEffect(() => {
    if (!auth.accessToken) return;

    const timer = setInterval(() => {
      const remaining = auth.getTimeRemaining();
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [auth.accessToken]);

  const handleCopy = async (id, type) => {
    const success = await copyToClipboard(String(id));
    if (success) {
      setCopiedId(`${type}-${id}`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <header className="neo-border border-b-2 bg-white pb-4 px-4 mb-6">
      <div className="container">
        <div className="flex items-center mb-4">
          <img src="/controller.png" className="mx-2 h-16 w-16" />
          <h1 className="text-3xl font-bold">Microservices Test App</h1>
        </div>

        {/* Quick Copy IDs */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Game IDs */}
          <div className="neo-card p-3">
            <h3 className="text-sm font-bold mb-2">Quick Copy - Game IDs:</h3>
            <div className="flex flex-wrap gap-2">
              {sampleGameIds.map((id) => (
                <button
                  key={id}
                  onClick={() => handleCopy(id, "game")}
                  className="text-sm py-1 px-3 my-2 flex items-center gap-2"
                >
                  {id}
                  {copiedId === `game-${id}` ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Token Display */}

          <div className="neo-card p-3">
            <div className="flex items-start justify-between gap-4 ">
              <div className="flex-1 space-y-3">
                {/* Access Token */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold">Access Token:</h3>
                    {timeRemaining && (
                      <span className="text-xs bg-yellow-200 px-2 py-1 border border-black">
                        Expires in: {timeRemaining.minutes}m{" "}
                        {timeRemaining.seconds}s
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="text"
                      value={auth.accessToken}
                      readOnly
                      className="text-xs font-mono bg-white"
                    />
                    <button
                      onClick={() => handleCopy(auth.accessToken, "token")}
                      className="btn-outline text-sm py-2 px-3"
                    >
                      {copiedId === "token-" + auth.accessToken ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                  </div>
                </div>

                {/* MFA Token */}
                {auth.mfaToken && (
                  <div className="border-t border-black pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-bold">MFA Token:</h3>
                      <span className="text-xs bg-cyan-200 px-2 py-1 border border-black">
                        Verify to complete registration
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={auth.mfaToken}
                        readOnly
                        className="text-xs font-mono bg-white"
                      />
                      <button
                        onClick={() => handleCopy(auth.mfaToken, "mfa")}
                        className="btn-outline text-sm py-2 px-3"
                      >
                        {copiedId === "mfa-" + auth.mfaToken ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {auth.user && (
                <div className="text-sm">
                  <p className="font-bold">Logged in as:</p>
                  <p>{auth.user.username || `User #${auth.user.userId}`}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
