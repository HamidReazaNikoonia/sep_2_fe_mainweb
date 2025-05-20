
import {SERVER_API_URL} from '../config';

const API_BASE_URL = SERVER_API_URL;




async function getGeneralSearch(params: { [s: string]: unknown; } | ArrayLike<unknown>) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  // Only include non-empty parameters in the request
  const filteredParams: any = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
  );

  console.log({ filteredParams })

  const response = fetch(
    `${API_BASE_URL}/search?${new URLSearchParams(filteredParams)}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}





export async function getGeneralSearchRequest(params: { [s: string]: unknown; } | ArrayLike<unknown>) {
  const data = await getGeneralSearch(params);
  return data;
}