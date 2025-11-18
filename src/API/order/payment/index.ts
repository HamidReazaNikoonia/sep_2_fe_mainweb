import type { IProduct } from '@/types/Product';

import { getAuthToken, SERVER_API_TOKEN, SERVER_API_URL } from '../../config';

const API_BASE_URL = SERVER_API_URL;
const API_TOKEN = SERVER_API_TOKEN;

type OrderResponse = {
  data: {
    count: number;
    products: IProduct[];
  };
};

async function submitCartToCreateOrder({ cartId, shippingAddress, couponCodes, useUserWallet }: { cartId: string; shippingAddress?: string; couponCodes?: string[]; useUserWallet?: boolean }) {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':
        `Bearer ${getAuthToken() || ''}`,
    },
    body: JSON.stringify({ cartId, shippingAddress, couponCodes, useUserWallet }),
  };

  const response = fetch(
    `${API_BASE_URL}/order`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function calculateOrderSummary({ cartId, couponCodes, useUserWallet }: { cartId: string; couponCodes?: string[]; useUserWallet?: boolean }) {
  const requestBody: {
    cartId: string;
    couponCodes?: string[];
    useUserWallet?: boolean;
  } = {
    cartId,
    useUserWallet,
  };

  if (couponCodes?.length) {
    requestBody.couponCodes = couponCodes;
  }

  if (useUserWallet !== undefined) {
    requestBody.useUserWallet = useUserWallet;
  }

  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':
        `Bearer ${getAuthToken() || ''}`,
    },
    body: JSON.stringify(requestBody),
  };

  const response = fetch(
    `${API_BASE_URL}/order/calculate-order-summary`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// async function getProducts(params: FilterParams = {}): Promise<ProductsResponse> {
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer ....",
//     },
//   };

//   // Only include non-empty parameters in the request
//   const filteredParams = Object.fromEntries(
//     Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
//   );

//   console.log({ filteredParams })

//   const response = fetch(
//     `http://localhost:9000/v1/product?${new URLSearchParams(filteredParams)}`,
//     options
//   )
//     .then((response) => response.json())
//     .catch((err) => console.error(err));

//   return response;
// }

// export async function getComments(page: number, productId: string, type: string) {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//   };

//   const response = await fetch(
//     `${API_BASE_URL}/${type || 'product'}/${productId}/hamid/review?page=${page}`,
//     options
//   );

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   return response.json();
// }

// export async function submitComment(commentData: { text: string, productId: string, rating: number, name?: string }) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//     body: JSON.stringify(commentData),
//   };

//   const response = await fetch(
//     `${API_BASE_URL}/product/${commentData.productId}/hamid/review?page`,
//     options
//   );

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   return response.json();
// }

// export async function getProductsRequest(params: FilterParams) {
//   const data = await getProducts(params);
//   return data;
// }

export async function submitCartToCreateOrderRequest(body: { cartId: string; shippingAddress?: string; couponCodes?: string[]; useUserWallet?: boolean }) {
  const data = await submitCartToCreateOrder(body);
  return data;
}

export async function calculateOrderSummaryRequest({ cartId, couponCodes, useUserWallet }: { cartId: string; couponCodes?: string[]; useUserWallet?: boolean }) {
  const data = await calculateOrderSummary({ cartId, couponCodes, useUserWallet });
  return data;
}

// export async function getCommentsRequest({page, productId}) {
//   const data = await getComments(page, productId);
//   return data;
// }

// export async function submitCommentRequest(commentData) {
//   const data = await submitComment(commentData);
//   return data;
// }
