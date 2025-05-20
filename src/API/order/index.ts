import { IProduct } from '@/types/Product';

import {SERVER_API_URL, SERVER_API_TOKEN} from '../config';

const API_BASE_URL = SERVER_API_URL;
const API_TOKEN = SERVER_API_TOKEN;

interface OrderResponse {
  data: {
    count: number;
    products: IProduct[];
  }
}


interface Order {
  id: string
  product: string
  date: string
  total: string
  status: string
}

async function getSpecificOrderById({ orderId }: {orderId: string}) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${API_TOKEN}`,
    },
  };

  const response = fetch(
    `${API_BASE_URL}/order/${orderId}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

// Fetch all orders
async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/order`, {
    method: "GET",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }

  return response.json()
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


export async function getSpecificOrderByIdRequest(body: {orderId: string}) {
  const data = await getSpecificOrderById(body);
  return data;
}

export async function getOrdersRequest() {
  const data = await getOrders();
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
