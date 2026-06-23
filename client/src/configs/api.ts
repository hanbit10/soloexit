import axios from "axios";

// Axios instance for API requests
export const api = axios.create({
  // Base URL from Vite environment
  baseURL: import.meta.env.VITE_STRAPI_API_URL,
});

export default api;
