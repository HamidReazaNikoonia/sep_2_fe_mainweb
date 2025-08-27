import { getAuthToken, SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;

// Get All User Notification
async function getUserNotification(params: { [s: string]: unknown } | ArrayLike<unknown>) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  // Only include non-empty parameters in the request

  // params ['status', 'read_status', 'priority', 'type', 'created_at', 'updated_at', sender_type]
  const filteredParams: any = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== ''),
  );

  console.log({ filteredParams });

  const response = fetch(
    `${API_BASE_URL}/notification?${new URLSearchParams(filteredParams)}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// mark read All Notification
// PATCH `/notification/bulk/mark-read`
async function markReadAllNotification() {
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = fetch(`${API_BASE_URL}/notification/bulk/mark-read`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// Get Unread Notification count
// GET `/notification/unread-count`
async function getUnreadNotificationCount() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = fetch(`${API_BASE_URL}/notification/unread-count`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// Request Handler

export async function getUserNotificationRequest(params: { [s: string]: unknown } | ArrayLike<unknown>) {
  const data = await getUserNotification(params);
  return data;
}

export async function markReadAllNotificationRequest() {
  const data = await markReadAllNotification();
  return data;
}

export async function getUnreadNotificationCountRequest() {
  const data = await getUnreadNotificationCount();
  return data;
}