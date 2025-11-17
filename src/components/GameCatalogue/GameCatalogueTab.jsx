import { EndpointSection } from '../shared/EndpointSection';
import { makeRequest } from '../../utils/api';

export const GameCatalogueTab = () => {
  const baseUrl = 'http://localhost:8000';

  const endpoints = [
    {
      title: 'Get Game by ID',
      method: 'GET',
      path: '/games/id/{game_id}',
      description: 'Retrieve detailed information about a specific game',
      inputs: [
        {
          name: 'gameId',
          label: 'Game ID',
          type: 'number',
          placeholder: '730',
          required: true,
          hint: 'Try: 730, 578080, 1245620',
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/games/id/${data.gameId}`);
      },
    },
    {
      title: 'Search Games by Title',
      method: 'GET',
      path: '/games/search/{title}',
      description: 'Search for games by title (returns up to 8 results)',
      inputs: [
        {
          name: 'title',
          label: 'Game Title',
          type: 'text',
          placeholder: 'zelda',
          required: true,
          hint: 'Search term (case insensitive)',
        },
      ],
      onTest: async (data) => {
        return await makeRequest(`${baseUrl}/games/search/${encodeURIComponent(data.title)}`);
      },
    },
    {
      title: 'Get Available Lists',
      method: 'GET',
      path: '/games/lists',
      description: 'Retrieve all available curated game lists',
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/games/lists`);
      },
    },
    {
      title: 'Get Trending Games',
      method: 'GET',
      path: '/games/lists/trending',
      description: 'Get top 10 trending games based on composite scoring',
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/games/lists/trending`);
      },
    },
    {
      title: 'Get Featured Games',
      method: 'GET',
      path: '/games/lists/featured',
      description: 'Get curated list of featured games',
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/games/lists/featured`);
      },
    },
    {
      title: 'Get Top Games',
      method: 'GET',
      path: '/games/lists/top',
      description: 'Get top 10 games ranked by Metacritic score',
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/games/lists/top`);
      },
    },
    {
      title: 'Get Staff Picks',
      method: 'GET',
      path: '/games/lists/staff-picks',
      description: 'Get games recommended by staff',
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/games/lists/staff-picks`);
      },
    },
    {
      title: 'Get All Genres',
      method: 'GET',
      path: '/games/genres',
      description: 'Get list of all available game genres',
      inputs: [],
      onTest: async () => {
        return await makeRequest(`${baseUrl}/games/genres`);
      },
    },
    {
      title: 'Get Games by Genre',
      method: 'GET',
      path: '/games/genres/{genre}?skip={skip}&limit={limit}',
      description: 'Get games filtered by genre with pagination',
      inputs: [
        {
          name: 'genre',
          label: 'Genre',
          type: 'text',
          placeholder: 'RPG',
          required: true,
          hint: 'Try: Action, RPG, FPS, Horror, etc.',
        },
        {
          name: 'skip',
          label: 'Skip',
          type: 'number',
          placeholder: '0',
          required: false,
          hint: 'Number of items to skip (default: 0)',
        },
        {
          name: 'limit',
          label: 'Limit',
          type: 'number',
          placeholder: '10',
          required: false,
          hint: 'Number of items to return (default: 10, max: 100)',
        },
      ],
      onTest: async (data) => {
        const skip = data.skip || '0';
        const limit = data.limit || '10';
        return await makeRequest(
          `${baseUrl}/games/genres/${encodeURIComponent(data.genre)}?skip=${skip}&limit=${limit}`
        );
      },
    },
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Game Catalogue Service</h2>
        <p className="text-gray-600">Base URL: {baseUrl}</p>
        <p className="text-sm text-gray-500">Port: 8000 | Framework: FastAPI/Python</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <EndpointSection key={index} {...endpoint} />
        ))}
      </div>
    </div>
  );
};
