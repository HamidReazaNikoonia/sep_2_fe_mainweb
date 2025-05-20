const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || "sepah";

export const SERVER_API_TOKEN = typeof window !== "undefined" ? window.localStorage.getItem(`${PROJECT_NAME}-access`) : false ;
export const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`${PROJECT_NAME}-access`);
};