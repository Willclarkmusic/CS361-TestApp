import { EndpointSection } from "../shared/EndpointSection";
import { makeRequest } from "../../utils/api";

export const UserServiceTab = ({ auth }) => {
  const baseUrl = "http://localhost:3000";

  const endpoints = [
    {
      title: "Create User (Register)",
      method: "POST",
      path: "/auth/createUser",
      description: "Register a new user account with MFA token generation",
      inputs: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "securePassword123",
          required: true,
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "text",
          placeholder: "555-123-4567",
          required: true,
        },
      ],
      onTest: async (data) => {
        const result = await makeRequest(`${baseUrl}/auth/createUser`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data),
        });

        // Auto-login if successful and store MFA token
        if (result.ok && result.data.accessToken) {
          auth.handleLogin(result.data.accessToken, result.data.user);
          if (result.data.user?.mfaToken) {
            auth.setMfaToken(result.data.user.mfaToken);
          }
        }

        return result;
      },
    },
    {
      title: "MFA Verification",
      method: "POST",
      path: "/auth/MFA-check",
      description: "Verify MFA token sent to phone (account deleted if fails)",
      inputs: [
        {
          name: "mfaInput",
          label: "MFA Token",
          type: "text",
          placeholder: "123456",
          required: true,
          hint: "The code the user received",
        },
        {
          name: "mfaToken",
          label: "Access Token",
          type: "text",
          placeholder: "123456",
          required: true,
          hint: "The token from createUser response",
        },
      ],
      onTest: async (data) => {
        const result = await makeRequest(`${baseUrl}/auth/MFA-check`, {
          method: "POST",
          body: JSON.stringify(data),
        });

        // Clear MFA token if verification successful
        if (result.ok) {
          auth.setMfaToken(null);
        }

        return result;
      },
    },
    {
      title: "Login",
      method: "POST",
      path: "/auth/login",
      description: "Authenticate user and receive JWT tokens",
      inputs: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "password123",
          required: true,
        },
      ],
      onTest: async (data) => {
        const result = await makeRequest(`${baseUrl}/auth/login`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data),
        });

        // Update auth state if successful
        if (result.ok && result.data.accessToken) {
          auth.handleLogin(result.data.accessToken, result.data.user);
        }

        return result;
      },
    },
    {
      title: "Logout",
      method: "POST",
      path: "/auth/logout",
      description: "Log out current user and clear tokens",
      inputs: [],
      onTest: async () => {
        const result = await makeRequest(`${baseUrl}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });

        // Clear auth state
        if (result.ok) {
          auth.handleLogout();
        }

        return result;
      },
    },
    {
      title: "Refresh Token",
      method: "POST",
      path: "/auth/refresh-token",
      description: "Get new access token using refresh token cookie",
      inputs: [],
      onTest: async () => {
        const result = await makeRequest(`${baseUrl}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

        // Update access token if successful
        if (result.ok && result.data.accessToken) {
          auth.setAccessToken(result.data.accessToken);
        }

        return result;
      },
    },
    {
      title: "Get User",
      method: "GET",
      path: "/auth/user/:userId",
      description: "Get user profile information by user ID",
      inputs: [
        {
          name: "userId",
          label: "User ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "Try: 1, 2, 3",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/auth/user/${data.userId}`);
      },
    },
    {
      title: "Update User",
      method: "PUT",
      path: "/auth/updateUser/:userId",
      description: "Update user profile information",
      inputs: [
        {
          name: "userId",
          label: "User ID",
          type: "number",
          placeholder: "1",
          required: true,
        },
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe_updated",
          required: false,
        },
        {
          name: "avatarURL",
          label: "Avatar URL",
          type: "text",
          placeholder: "https://example.com/avatar.jpg",
          required: false,
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "text",
          placeholder: "555-987-6543",
          required: false,
        },
        {
          name: "userBio",
          label: "User Bio",
          type: "textarea",
          placeholder: "Updated bio text",
          required: false,
        },
      ],
      onTest: async (data) => {
        const { userId, ...updateData } = data;
        return await makeRequest(`${baseUrl}/auth/updateUser/${userId}`, {
          method: "PUT",
          body: JSON.stringify(updateData),
        });
      },
    },
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">User Service</h2>
        <p className="text-gray-600">Base URL: {baseUrl}</p>
        <p className="text-sm text-gray-500">
          Port: 3000 | Framework: Express/Node.js
        </p>

        {auth.user && (
          <div className="mt-4 neo-card p-4 bg-green-50">
            <h3 className="font-bold mb-2">Current Session:</h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>User ID:</strong> {auth.user.userId}
              </p>
              <p>
                <strong>Username:</strong> {auth.user.username}
              </p>
              {auth.user.phoneNumber && (
                <p>
                  <strong>Phone:</strong> {auth.user.phoneNumber}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <EndpointSection key={index} {...endpoint} />
        ))}
      </div>
    </div>
  );
};
