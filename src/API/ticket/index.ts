import type {
  CreateTicketRequest,
  ReplyTicketRequest,
  SingleTicketResponse,
  TicketFilterParams,
  TicketResponse,
} from '@/API/ticket/types';
import { getAuthToken, SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;

// 1. Get all user tickets
async function getUserTickets(params: TicketFilterParams = {}): Promise<TicketResponse> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  // Only include non-empty parameters in the request
  const filteredParams: any = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== ''),
  );

  // eslint-disable-next-line no-console
  console.log({ filteredParams });

  const response = await fetch(
    `${API_BASE_URL}/ticket?${new URLSearchParams(filteredParams)}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// 2. Create a new ticket
async function createTicket(body: CreateTicketRequest): Promise<SingleTicketResponse> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${API_BASE_URL}/ticket`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// 3. Get specific ticket by ID
async function getTicketById(ticketId: string): Promise<SingleTicketResponse> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/ticket/${ticketId}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// 4. Reply to a ticket
async function replyToTicket(ticketId: string, body: ReplyTicketRequest): Promise<SingleTicketResponse> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${API_BASE_URL}/ticket/${ticketId}/reply`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// 5. Mark ticket as read
async function markTicketAsRead(ticketId: string): Promise<SingleTicketResponse> {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/ticket/${ticketId}/mark-read`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// Export functions for React Query
export async function getUserTicketsRequest(params: TicketFilterParams) {
  const data = await getUserTickets(params);
  return data;
}

export async function createTicketRequest(body: CreateTicketRequest) {
  const data = await createTicket(body);
  return data;
}

export async function getTicketByIdRequest(ticketId: string) {
  const data = await getTicketById(ticketId);
  return data;
}

export async function replyToTicketRequest(ticketId: string, body: ReplyTicketRequest) {
  const data = await replyToTicket(ticketId, body);
  return data;
}

export async function markTicketAsReadRequest(ticketId: string) {
  const data = await markTicketAsRead(ticketId);
  return data;
}
