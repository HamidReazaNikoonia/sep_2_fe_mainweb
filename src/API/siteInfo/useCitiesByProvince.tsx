"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCitiesByProvinceId } from '@/API/siteInfo';

// Define the type for the city based on the expected API response
interface City {
  id: number;
  name: string;
  // Add other properties as needed
}

export function useCitiesByProvince() {
  // State to manage the selected province ID
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  // React Query hook to fetch cities
  const { 
    data: cities, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery<City[]>({
    // Only enable the query when a province ID is selected
    enabled: selectedProvinceId !== null,
    
    // Query key includes the province ID to enable automatic refetching when ID changes
    queryKey: ['cities', selectedProvinceId],
    
    // Query function to fetch cities for the selected province
    queryFn: () => {
      if (selectedProvinceId === null) {
        throw new Error('Province ID is required');
      }
      return getCitiesByProvinceId(selectedProvinceId);
    },
  });

  // Handler to change the province and trigger a new fetch
  const handleProvinceChange = (provinceId: number) => {
    // Update the selected province ID
    setSelectedProvinceId(provinceId);
    
    // Optional: Manually refetch if needed (though useQuery will auto-refetch with new key)
    refetch();
  };

  // Reset the selected province
  const resetProvince = () => {
    setSelectedProvinceId(null);
  };

  return {
    cities,
    selectedProvinceId,
    isLoading,
    isError,
    error,
    handleProvinceChange,
    resetProvince
  };
}