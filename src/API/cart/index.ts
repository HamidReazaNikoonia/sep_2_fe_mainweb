import { IProduct } from '@/types/Product';
import {SERVER_API_URL, SERVER_API_TOKEN, getAuthToken} from '../config';

const API_BASE_URL = SERVER_API_URL;
const API_TOKEN = SERVER_API_TOKEN;



interface ProductsResponse {
  data: {
    count: number;
    products: IProduct[];
  }
}





async function getUserCart() {
  console.log('API_TOKEN', API_TOKEN);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${getAuthToken()}`,
    },
  };

  const response = fetch(
    `${API_BASE_URL}/cart`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

async function updateUserCart({productId, quantity}: {productId: string, quantity: number}) {
  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({quantity: quantity})
  };

  const response = fetch(
    `${API_BASE_URL}/cart/${productId}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}



async function addProductToCart({productId, quantity, courseId}: {productId?: string, courseId?: string, quantity: number}) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      quantity,
      ...(productId && {productId}),
      ...(courseId && {courseId})
    })
  };

  const response = fetch(
    `${API_BASE_URL}/cart`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}


async function deleteProductInCart({cartItemId}: {cartItemId: string}) {
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${getAuthToken()}`,
    }
  };

  const response = fetch(
    `${API_BASE_URL}/cart/${cartItemId}`,
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

export async function getUserCartRequest() {
  const data = await getUserCart();
  return data;
}

export async function updateUserCartRequest(body: {productId: string, quantity: number}) {
  const data = await updateUserCart(body);
  return data;
}


export async function addProductToCartRequest(body: {productId?: string, courseId?: string, quantity: number}) {
  const data = await addProductToCart(body);
  return data;
}


export async function deleteProductInCartRequest(body: {cartItemId: string}) {
  const data = await deleteProductInCart(body);
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
