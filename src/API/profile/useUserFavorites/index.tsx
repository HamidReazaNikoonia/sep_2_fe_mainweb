import { useQuery } from '@tanstack/react-query';
import { getAuthToken, SERVER_API_URL } from '../../config';

const API_BASE_URL = SERVER_API_URL;
const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah';

async function fetchUserFavorites(userId: string, type: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/profile/${userId}/fav?type=${type}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user favorites');
  }

  return response.json();
}

export const useUserFavorites = (type: string) => {
  // Get user from localStorage
  const userId = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem(`${PROJECT_NAME}-user`) || '{}')?.id 
    : null;

  return useQuery({
    queryKey: ['user', 'favorites', type],
    queryFn: () => fetchUserFavorites(userId, type).then((res: any) => res?.favorites || []),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId && !!type, // Only run query if we have userId and type
  });
};