import { EndpointSection } from "../shared/EndpointSection";
import { makeRequest } from "../../utils/api";

export const ReviewServiceTab = () => {
  const baseUrl = "http://localhost:4000/reviews";

  const endpoints = [
    {
      title: "Server Status Check",
      method: "GET",
      path: "/reviews/",
      description: "Check if the Review Service is running",
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/`);
      },
    },
    {
      title: "Get Reviews by Game",
      method: "GET",
      path: "/reviews/game/:gameId",
      description: "Retrieve all reviews for a specific game",
      inputs: [
        {
          name: "gameId",
          label: "Game ID",
          type: "number",
          placeholder: "730",
          required: true,
          hint: "Try: 730, 578080, 1245620",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/game/${data.gameId}`);
      },
    },
    {
      title: "Get Reviews by User",
      method: "GET",
      path: "/reviews/user/:userId",
      description: "Retrieve all reviews written by a specific user",
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
        return await makeRequest(`${baseUrl}/user/${data.userId}`);
      },
    },
    {
      title: "Create Review",
      method: "POST",
      path: "/reviews/create",
      description: "Create a new game review (score must be 1-10)",
      inputs: [
        {
          name: "userId",
          label: "User ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the user writing the review",
        },
        {
          name: "gameId",
          label: "Game ID",
          type: "number",
          placeholder: "730",
          required: true,
          hint: "ID of the game being reviewed",
        },
        {
          name: "reviewScore",
          label: "Review Score",
          type: "number",
          placeholder: "8",
          required: true,
          hint: "Must be between 1 and 10",
        },
        {
          name: "review",
          label: "Review Text",
          type: "textarea",
          placeholder: "This game was amazing! The graphics and gameplay are top-notch.",
          required: true,
          hint: "Your written review of the game",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/create`, {
          method: "POST",
          body: JSON.stringify({
            userId: parseInt(data.userId),
            gameId: parseInt(data.gameId),
            reviewScore: parseInt(data.reviewScore),
            review: data.review,
          }),
        });
      },
    },
    {
      title: "Delete Review",
      method: "DELETE",
      path: "/reviews/delete/:reviewId",
      description: "Delete a specific review by its ID",
      inputs: [
        {
          name: "reviewId",
          label: "Review ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the review to delete (get this from Create Review response)",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/delete/${data.reviewId}`, {
          method: "DELETE",
        });
      },
    },
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Review Service</h2>
        <p className="text-gray-600">Base URL: {baseUrl}</p>
        <p className="text-sm text-gray-500">Port: 4000 | Framework: Express/Node.js</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <EndpointSection key={index} {...endpoint} />
        ))}
      </div>
    </div>
  );
};
