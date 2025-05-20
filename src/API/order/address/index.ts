import { Address, IProduct, AddressResponse } from '@/types/Product';

import {SERVER_API_URL, SERVER_API_TOKEN} from '../../config';

const API_BASE_URL = SERVER_API_URL;
const API_TOKEN = SERVER_API_TOKEN;



async function getUserAddress() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${API_TOKEN}`,
    },
  };

  const response = fetch(
    `${API_BASE_URL}/order/shipping_address`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

async function submitAddres(address: Address) {
  console.log({findTitle: address})
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(address)
  };

  const response = fetch(
    `${API_BASE_URL}/order/shipping_address`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}


// async function deleteProductInCart({cartItemId}: {cartItemId: string}) {
//   const options = {
//     method: "DELETE",
//     headers: {
//       accept: "application/json",
//       'Content-Type': 'application/json',
//       Authorization:
//         `Bearer ${API_TOKEN}`,
//     }
//   };

//   const response = fetch(
//     `${API_BASE_URL}/cart/${cartItemId}`,
//     options
//   )
//     .then((response) => response.json())
//     .catch((err) => console.error(err));

//   return response;
// }



export async function getUserAddressRequest() {
  const data = await getUserAddress();
  return data;
}

export async function submitAddresRequest(body: Address): Promise<AddressResponse> {
  const data = await submitAddres(body);
  return data;
}

// export async function deleteProductInCartRequest(body: {cartItemId: string}) {
//   const data = await deleteProductInCart(body);
//   return data;
// }

