import { getAuthToken, SERVER_API_URL } from '../../config';

const API_BASE_URL = SERVER_API_URL;
// const API_TOKEN = SERVER_API_TOKEN;

async function calculateOrderSummary({ classProgramId, couponCodes, packages }: { classProgramId: string; couponCodes?: string[]; packages?: string[] }) {
  // console.log({ classProgramId, couponCodes, packages });
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':
        `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ classProgramId, couponCodes, packages }),
  };

  const response = fetch(
    `${API_BASE_URL}/course-session/calculate-order-summary`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function createOrder({ classProgramId, couponCodes, packages }: { classProgramId: string; couponCodes?: string[]; packages?: string[] }) {
  const requestBody: {
    classProgramId: string;
    couponCodes?: string[];
    packages?: string[];
  } = {
    classProgramId,
  };

  if (couponCodes?.length) {
    requestBody.couponCodes = couponCodes;
  }

  if (packages?.length) {
    requestBody.packages = packages;
  }

  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(requestBody),
  };

  const response = fetch(
    `${API_BASE_URL}/course-session/order`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// Get Order By Id
async function getOrderById(orderId: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = fetch(
    `${API_BASE_URL}/course-session/order/${orderId}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

// Retry Checkout Processs
async function retryCheckoutOrder(orderId: string) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = fetch(
    `${API_BASE_URL}/course-session/order/${orderId}/retry`,
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

export async function calculateOrderSummaryRequest(body: { classProgramId: string; couponCodes?: string[]; packages?: string[] }) {
  const data = await calculateOrderSummary(body);
  return data;
}

export async function createOrderRequest(body: { classProgramId: string; couponCodes?: string[]; packages?: string[] }) {
  const data = await createOrder(body);
  return data;
}

export async function getOrderByIdRequest(orderId: string) {
  const data = await getOrderById(orderId);
  return data;
}

export async function retryCheckoutOrderRequest(orderId: string) {
  const data = await retryCheckoutOrder(orderId);
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
