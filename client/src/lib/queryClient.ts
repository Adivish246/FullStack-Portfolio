import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export async function apiRequest<TResponse = any, TBody = any>(
  method: string,
  endpoint: string,
  body?: TBody
): Promise<TResponse> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, options);
  
  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}
