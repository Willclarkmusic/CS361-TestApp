import { EndpointSection } from "../shared/EndpointSection";
import { makeRequest } from "../../utils/api";

export const LikesReviewTab = () => {
  const baseUrl = "http://localhost:7060/likes";

  const endpoints = [
    {
      title: "Get Review Likes/Dislikes",
      method: "GET",
      path: "/likes/review/:reviewId",
      description: "Get the total likes and dislikes count for a review",
      inputs: [
        {
          name: "reviewId",
          label: "Review ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the review to get likes for",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/review/${data.reviewId}`);
      },
    },
    {
      title: "Like a Review",
      method: "POST",
      path: "/likes/like/:userId/:reviewId",
      description: "Like a review (or remove like if already liked). Publishes a notification.",
      inputs: [
        {
          name: "userId",
          label: "User ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the user liking the review",
        },
        {
          name: "reviewId",
          label: "Review ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the review to like",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(
          `${baseUrl}/like/${data.userId}/${data.reviewId}`,
          {
            method: "POST",
          }
        );
      },
    },
    {
      title: "Dislike a Review",
      method: "POST",
      path: "/likes/dislike/:userId/:reviewId",
      description: "Dislike a review (or remove dislike if already disliked). Publishes a notification.",
      inputs: [
        {
          name: "userId",
          label: "User ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the user disliking the review",
        },
        {
          name: "reviewId",
          label: "Review ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the review to dislike",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(
          `${baseUrl}/dislike/${data.userId}/${data.reviewId}`,
          {
            method: "POST",
          }
        );
      },
    },
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Likes Review Service</h2>
        <p className="text-gray-600">Base URL: {baseUrl}</p>
        <p className="text-sm text-gray-500">Port: 7060 | Framework: Express/Node.js</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <EndpointSection key={index} {...endpoint} />
        ))}
      </div>
    </div>
  );
};
