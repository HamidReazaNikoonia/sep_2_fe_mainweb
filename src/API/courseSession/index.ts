import { SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;

type CourseSessionFilterParams = {
  search?: string;
  sort?: string;
  category?: string;
  price_from?: number;
  price_to?: number;
  // Add any other filter parameters specific to course sessions
};

type CourseSessionResponse = {
  data: {
    count: number;
    courseSessions: any[]; // Replace 'any' with your CourseSession type if available
  };
};

async function getAllCourseSession(params: CourseSessionFilterParams = {}): Promise<CourseSessionResponse> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  // Only include non-empty parameters in the request
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== ''),
  );

  const response = fetch(
    `${API_BASE_URL}/course-session?${new URLSearchParams(filteredParams)}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function getCourseSessionCategories(): Promise<any> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = fetch(
    `${API_BASE_URL}/course-session/category/tree`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

export async function getAllCourseSessionRequest(params: CourseSessionFilterParams) {
  const data = await getAllCourseSession(params);
  return data;
}

export async function getCourseSessionCategoriesRequest() {
  const data = await getCourseSessionCategories();
  return data;
}

// Export other existing course session related functions
export { getAllCourseSession, getCourseSessionCategories };
