import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SERVER_API_URL, getAuthToken } from '../../config';

const API_BASE_URL = SERVER_API_URL;
const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || "sepah";

interface ToggleFavoriteResponse {
  success: boolean;
  action: 'added' | 'removed';
  type: string;
  itemId: string;
  isFavorited: boolean;
}

async function toggleFavoriteAPI(
  userId: string, 
  favItemId: string, 
  type: string
): Promise<ToggleFavoriteResponse> {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/profile/${userId}/fav/${favItemId}?type=${type}`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to toggle favorite');
  }

  return response.json();
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  // Get user from localStorage
  const userId = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem(`${PROJECT_NAME}-user`) || '{}')?.id 
    : null;

  return useMutation({
    mutationFn: ({ favItemId, type }: { favItemId: string; type: string }) => 
      toggleFavoriteAPI(userId, favItemId, type),
    onSuccess: (data, variables) => {
      // Invalidate and refetch favorites query to ensure consistency
      queryClient.invalidateQueries({ 
        queryKey: ['user', 'favorites', variables.type] 
      });
    },
    onError: (_error: any) => {
      console.error('Failed to toggle favorite:', _error);
    },
  });
};