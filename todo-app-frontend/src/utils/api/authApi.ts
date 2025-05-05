import { toast } from 'react-toastify';

/**
 * API configuration for authentication endpoints
 */
const AUTH_CONFIG = {
  BASE_URL: 'http://localhost:9090',
  ENDPOINTS: {
    TOKEN: '/token'
  }
} as const;

/**
 * Fetches authentication token from localStorage or API
 * @returns Promise<string | null> - The authentication token or null if retrieval fails
 */
export const fetchToken = async (): Promise<string | null> => {

  let token = localStorage.getItem('token');

  if (!token) {
    try {
      const response = await fetch(`${AUTH_CONFIG.BASE_URL}${AUTH_CONFIG.ENDPOINTS.TOKEN}`);
      
      if (!response.ok) {
        throw new Error(`Failed to retrieve token: ${response.status}`);
      }

      token = await response.text();
      localStorage.setItem('token', token);
      
    } catch (error) {
      console.error('Error retrieving token:', error);
      toast.error('Failed to retrieve authentication token');
      return null;
    }
  }

  return token;
};

/**
 * Adds authentication headers to a fetch request
 * @param headers - Existing headers object
 * @param token - Authentication token
 * @returns Headers object with authentication
 */
export const addAuthHeaders = (headers: HeadersInit = {}, token: string): HeadersInit => {
  return {
    ...headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};