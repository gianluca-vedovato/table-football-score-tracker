import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache object to store API responses with timestamps
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

export async function apiFetch<T> (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: Record<string, any>
): Promise<T> {
  const cacheKey = `${method}:${endpoint}`

  // Check if data is cached and still valid
  const cached = cache[cacheKey];
  const now = Date.now();
  if (method === 'GET' && cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Invalidate cache after a non-GET request
  if (method !== 'GET') {
    invalidateCache();
  }

  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    ...(data && { data }),
  };

  try {
    const response: AxiosResponse<T> = await apiClient(config);

    // Store the result in cache for GET requests with the current timestamp
    if (method === 'GET') {
      cache[cacheKey] = { data: response.data, timestamp: now };
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.data}`);
      throw new Error(`Error: ${error.response.status}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Function to manually invalidate the cache
export const invalidateCache = (endpoint?: string): void => {
  if (endpoint) {
    const cacheKey = `GET:${endpoint}`;
    delete cache[cacheKey];
  } else {
    Object.keys(cache).forEach(key => {
      if (key.startsWith('GET')) {
        delete cache[key];
      }
    });
  }
};