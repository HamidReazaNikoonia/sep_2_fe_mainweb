import { IProduct } from '@/types/Product';

import {SERVER_API_URL, SERVER_API_TOKEN} from '../../config';

const API_BASE_URL = SERVER_API_URL;
const API_TOKEN = SERVER_API_TOKEN;

interface OrderResponse {
  data: {
    count: number;
    products: IProduct[];
  }
}

async function submitCartToCreateOrder({cartId, shippingAddress}: {cartId: string, shippingAddress?: string}) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({shippingAddress, cartId})
  };

  const response = fetch(
    `${API_BASE_URL}/order`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

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


export async function submitCartToCreateOrderRequest(body: {cartId: string, shippingAddress?: string}) {
  const data = await submitCartToCreateOrder(body);
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
