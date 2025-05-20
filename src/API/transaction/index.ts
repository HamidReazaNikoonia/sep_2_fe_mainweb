import { getAuthToken, SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;

// Type definition for Transaction (adjust according to your API response)
type Transaction = {
  _id: string;
  status: 'paid' | 'pending' | 'failed';
  amount: number;
  reference?: string;
  createdAt: string;
  // Add other fields you expect from the API
};

async function getTransactionById(transactionId: string): Promise<{ data: Transaction }> {
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/transaction/user/${transactionId}`,
    options,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || 'Failed to fetch transaction details',
    );
  }

  return response.json();
}

export async function getTransactionByIdRequest(transactionId: string) {
  try {
    const data = await getTransactionById(transactionId);
    return data;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}
