import { EndpointSection } from "../shared/EndpointSection";
import { makeRequest } from "../../utils/api";

export const NewsFeedTab = () => {
  const baseUrl = "http://localhost:5000";

  const endpoints = [
    // Article Endpoints
    {
      title: "Health Check",
      method: "GET",
      path: "/news/",
      description: "Check if the News Feed Service is running",
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/news/`);
      },
    },
    {
      title: "Get Article Stats",
      method: "GET",
      path: "/news/stats",
      description: "Get total article count and counts by source",
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/news/stats`);
      },
    },
    {
      title: "Get Sources List",
      method: "GET",
      path: "/news/sources",
      description: "Get list of all available news sources",
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/news/sources`);
      },
    },
    {
      title: "Get All Articles",
      method: "GET",
      path: "/news/articles",
      description: "Get paginated list of all articles",
      inputs: [
        {
          name: "limit",
          label: "Limit",
          type: "number",
          placeholder: "50",
          required: false,
          hint: "Number of articles to return (default: 50)",
        },
        {
          name: "offset",
          label: "Offset",
          type: "number",
          placeholder: "0",
          required: false,
          hint: "Number of articles to skip (default: 0)",
        },
      ],
      onTest: async (data) => {
        const params = new URLSearchParams();
        if (data.limit) params.append("limit", data.limit);
        if (data.offset) params.append("offset", data.offset);
        const query = params.toString() ? `?${params.toString()}` : "";
        return await makeRequest(`${baseUrl}/news/articles${query}`);
      },
    },
    {
      title: "Get Article by ID",
      method: "GET",
      path: "/news/articles/:id",
      description: "Get a single article with full details and categories",
      inputs: [
        {
          name: "id",
          label: "Article ID",
          type: "number",
          placeholder: "1",
          required: true,
          hint: "ID of the article to retrieve",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/news/articles/${data.id}`);
      },
    },
    {
      title: "Get Articles by Source",
      method: "GET",
      path: "/news/articles/source/:source",
      description: "Get articles filtered by news source",
      inputs: [
        {
          name: "source",
          label: "Source Name",
          type: "text",
          placeholder: "PC Gamer",
          required: true,
          hint: "Try: PC Gamer, GameSpot, Polygon, Rock Paper Shotgun",
        },
        {
          name: "limit",
          label: "Limit",
          type: "number",
          placeholder: "50",
          required: false,
          hint: "Number of articles to return",
        },
        {
          name: "offset",
          label: "Offset",
          type: "number",
          placeholder: "0",
          required: false,
          hint: "Number of articles to skip",
        },
      ],
      onTest: async (data) => {
        const params = new URLSearchParams();
        if (data.limit) params.append("limit", data.limit);
        if (data.offset) params.append("offset", data.offset);
        const query = params.toString() ? `?${params.toString()}` : "";
        return await makeRequest(
          `${baseUrl}/news/articles/source/${encodeURIComponent(data.source)}${query}`
        );
      },
    },
    {
      title: "Search Articles",
      method: "GET",
      path: "/news/search",
      description: "Search articles by title or summary",
      inputs: [
        {
          name: "q",
          label: "Search Query",
          type: "text",
          placeholder: "game review",
          required: true,
          hint: "Search term to find in article titles and summaries",
        },
        {
          name: "limit",
          label: "Limit",
          type: "number",
          placeholder: "50",
          required: false,
          hint: "Number of results to return",
        },
      ],
      onTest: async (data) => {
        const params = new URLSearchParams();
        params.append("q", data.q);
        if (data.limit) params.append("limit", data.limit);
        return await makeRequest(`${baseUrl}/news/search?${params.toString()}`);
      },
    },
    // Scraper Endpoints
    {
      title: "Trigger Full Scrape",
      method: "POST",
      path: "/scraper/trigger",
      description: "Trigger a scrape of all configured news sources (takes ~15-20 seconds)",
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/scraper/trigger`, {
          method: "POST",
        });
      },
    },
    {
      title: "Trigger Source Scrape",
      method: "POST",
      path: "/scraper/trigger/:source",
      description: "Trigger a scrape for a specific news source",
      inputs: [
        {
          name: "source",
          label: "Source Name",
          type: "text",
          placeholder: "PC Gamer",
          required: true,
          hint: "Try: PC Gamer, GameSpot, Polygon, Rock Paper Shotgun",
        },
      ],
      onTest: async (data) => {
        return await makeRequest(
          `${baseUrl}/scraper/trigger/${encodeURIComponent(data.source)}`,
          {
            method: "POST",
          }
        );
      },
    },
    {
      title: "Get Scraper Status",
      method: "GET",
      path: "/scraper/status",
      description: "Get scheduler status and available sources",
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/scraper/status`);
      },
    },
    {
      title: "Get Scrape Logs",
      method: "GET",
      path: "/scraper/logs",
      description: "Get recent scrape history and statistics",
      inputs: [
        {
          name: "limit",
          label: "Limit",
          type: "number",
          placeholder: "50",
          required: false,
          hint: "Number of log entries to return",
        },
      ],
      onTest: async (data) => {
        const params = new URLSearchParams();
        if (data.limit) params.append("limit", data.limit);
        const query = params.toString() ? `?${params.toString()}` : "";
        return await makeRequest(`${baseUrl}/scraper/logs${query}`);
      },
    },
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">News Feed Service</h2>
        <p className="text-gray-600">Base URL: {baseUrl}</p>
        <p className="text-sm text-gray-500">Port: 5000 | Framework: Express/Node.js</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <EndpointSection key={index} {...endpoint} />
        ))}
      </div>
    </div>
  );
};
