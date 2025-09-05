import axios from 'axios';

export const commonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAxiosInstance = (url?: string) => {
  const axiosInstance = axios.create({
    baseURL: url || baseUrl,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      throw err;
    }
  );

  axiosInstance.interceptors.request.use((request) => {
    return request;
  });

  return axiosInstance;
};
