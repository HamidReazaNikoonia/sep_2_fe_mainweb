import { getAuthToken, SERVER_API_TOKEN, SERVER_API_URL } from '../config';

const API_BASE_URL = SERVER_API_URL;
const API_TOKEN = SERVER_API_TOKEN;

// interface ProductsResponse {
//   data: {
//     count: number;
//     products: IProduct[];
//   }
// }

async function getUserProfile({ userId }: { userId: string }) {
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  };

  const response = fetch(
    `${API_BASE_URL}/profile/${userId}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function loginByOTP({ mobile, role }: { mobile: string; role: string }) {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mobile }),
  };

  const response = fetch(
    `${API_BASE_URL}/auth/login-otp${role === 'coach' ? '/coach' : ''}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function validateOTP({ userId, otpCode, role }: { userId: string; otpCode: string; role: string }) {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, otpCode }),
  };

  const response = fetch(
    `${API_BASE_URL}/auth/validate-otp${role === 'coach' ? '/coach' : ''}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function completeProfile({ userId, data }: { userId: string; data: { name: string; family: string; gender: string; nationalId: string; avatar: string; national_card_images: string[]; city?: number | null; postalCode?: string | null; job_title?: string | null; field_of_study?: string | null; educational_qualification?: string | null; address?: string | null } }) {
  console.log({data: data.postalCode})
  
  const options = {
    method: 'PATCH',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      name: data.name,
      family: data.family,
      gender: data.gender,
      nationalId: data.nationalId,
      avatar: data.avatar,
      national_card_images: data.national_card_images,
      ...(data.city && { city: data.city }),
      ...(data.postalCode && { postalCode: data.postalCode }),
      ...(data.job_title && { job_title: data.job_title }),
      ...(data.field_of_study && { field_of_study: data.field_of_study }),
      ...(data.educational_qualification && { educational_qualification: data.educational_qualification }),
      ...(data.address && { address: data.address }),
    }),
  };

  const response = fetch(
    `${API_BASE_URL}/profile/${userId}/complete-profile`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// EXPORT API REQUEST

export async function loginByOTPRequest(body: { mobile: string; role: string }) {
  const data = await loginByOTP(body);
  return data;
}

export async function validateOTPRequest(body: { userId: string; otpCode: string; role: string }) {
  const data = await validateOTP(body);
  return data;
}

export async function getUserProfileRequest(body: { userId: string }) {
  const data = await getUserProfile(body);
  return data;
}

export async function completeProfileRequest(body: { userId: string; data: { name: string; family: string; gender: string; nationalId: string; avatar: string; national_card_images: string[]; city?: number | null; postalCode?: string | null; job_title?: string | null; field_of_study?: string | null; educational_qualification?: string | null; address?: string | null } }) {
  const data = await completeProfile(body);
  return data;
}
