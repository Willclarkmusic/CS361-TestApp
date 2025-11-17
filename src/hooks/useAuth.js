import { useState, useEffect } from "react";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState("");
  const [mfaToken, setMfaToken] = useState("");

  // Auto-refresh token before expiration
  useEffect(() => {
    if (!accessToken) return;

    // Set expiry time to 15 minutes from now
    const expiryTime = Date.now() + 15 * 60 * 1000;
    setTokenExpiry(expiryTime);

    // Refresh token 1 minute before expiry
    const refreshTime = 14 * 60 * 1000; // 14 minutes
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/auth/refresh-token",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
          console.log("Token auto-refreshed");
        } else {
          // Refresh failed, clear auth
          handleLogout();
        }
      } catch (error) {
        console.error("Auto-refresh failed:", error);
      }
    }, refreshTime);

    return () => clearTimeout(timer);
  }, [accessToken]);

  const handleLogin = (token, userData) => {
    setAccessToken(token);
    setUser(userData);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    setTokenExpiry(null);
    setMfaToken(null);
  };

  const getTimeRemaining = () => {
    if (!tokenExpiry) return null;
    const remaining = Math.max(0, tokenExpiry - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return { minutes, seconds, total: remaining };
  };

  return {
    accessToken,
    user,
    mfaToken,
    setAccessToken,
    setMfaToken,
    handleLogin,
    handleLogout,
    getTimeRemaining,
  };
};
