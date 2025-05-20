import type { CoachCourseProgram, CoachProfile, CompleteCoachInfoPayload } from '@/types/Coach';

import { getAuthToken, SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;
// const API_TOKEN = SERVER_API_TOKEN;

// Get coach profile
async function getCoachUserProfile(coachId: string): Promise<CoachProfile> {
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/coach/profile/${coachId}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coach profile');
  }

  return response.json();
}

// Complete coach information
async function completeCoachInfo(coachId: string, data: CompleteCoachInfoPayload): Promise<CoachProfile> {
  const options = {
    method: 'PATCH',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${API_BASE_URL}/coach/complete_account/${coachId}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to complete coach information');
  }

  return response.json();
}

// Complete coach information
async function getCoachCourseProgram(): Promise<CoachCourseProgram> {
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/coach/coach-course-program`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to complete coach information');
  }

  return response.json();
}

async function checkoutCoachCourseProgram({ coachCourseProgramId }: { coachCourseProgramId: string }): Promise<CoachCourseProgram> {
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/coach/coach-course-program/checkout/${coachCourseProgramId}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to complete coach information');
  }

  return response.json();
}

// Export request functions
export async function getCoachUserProfileRequest(coachId: string) {
  const data = await getCoachUserProfile(coachId);
  return data;
}

export async function completeCoachInfoRequest(coachId: string, coachData: CompleteCoachInfoPayload) {
  const data = await completeCoachInfo(coachId, coachData);
  return data;
}

export async function getCoachCourseProgramRequest() {
  const data = await getCoachCourseProgram();
  return data;
}

export async function checkoutCoachCourseProgramRequest(body: { coachCourseProgramId: string }) {
  const data = await checkoutCoachCourseProgram(body);
  return data;
}
