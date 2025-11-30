import { EndpointSection } from "../shared/EndpointSection";
import { makeRequest } from "../../utils/api";

export const NotificationsTab = () => {
  const baseUrl = "http://localhost:8030/notify";

  const endpoints = [
    {
      title: "Get User Notifications",
      method: "GET",
      path: "/notify/notifications/:userId",
      description: "Get all notifications for a specific user",
      inputs: [
        {
          name: "userId",
          label: "User ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the user to get notifications for",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/notifications/${data.userId}`);
      },
    },
    {
      title: "Mark Notification as Read",
      method: "PUT",
      path: "/notify/read/:notificationId",
      description: "Mark a notification as read",
      inputs: [
        {
          name: "notificationId",
          label: "Notification ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the notification to mark as read",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/read/${data.notificationId}`, {
          method: "PUT",
        });
      },
    },
    {
      title: "Delete Notification",
      method: "DELETE",
      path: "/notify/delete/:notificationId",
      description: "Delete a notification",
      inputs: [
        {
          name: "notificationId",
          label: "Notification ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the notification to delete",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/delete/${data.notificationId}`, {
          method: "DELETE",
        });
      },
    },
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Notification Service</h2>
        <p className="text-gray-600">Base URL: {baseUrl}</p>
        <p className="text-sm text-gray-500">Port: 8030 | Framework: Express/Node.js</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <EndpointSection key={index} {...endpoint} />
        ))}
      </div>
    </div>
  );
};
