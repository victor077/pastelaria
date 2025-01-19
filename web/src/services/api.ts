import axios from "axios";

const BASE_URLS = {
  api: import.meta.env.VITE_API_URL
};


function getAxiosInstance(base:  keyof typeof BASE_URLS) {
  const instance = axios.create({
    baseURL: BASE_URLS[base],
  });

  return instance;
}

export const api = getAxiosInstance("api");
