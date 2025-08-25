import { SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;

// Get all provinces
export async function getAllProvinces() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/site-info/provinces`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch provinces');
  }

  return response.json();
}

// Get all cities
export async function getAllCities() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/site-info/cities`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  return response.json();
}

// Get cities of a specific province by ID
export async function getCitiesByProvinceId(provinceId: string | number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/site-info/provinces/${provinceId}/cities`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch cities for province ${provinceId}`);
  }

  return response.json();
}
