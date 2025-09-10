import axios, { AxiosRequestHeaders } from 'axios';

export type ApiOptions<Payload> = {
  data?: Payload | null;
  headers?: AxiosRequestHeaders;
  requireToken?: boolean;
};

export const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;

const api = axios.create({
  baseURL: `${API_GATEWAY}`,
});

export const makeApiRequest = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  {
    data = null,
    headers = {} as AxiosRequestHeaders,
    requireToken = true,
  }: ApiOptions<T> = {}
) => {
  try {
    const response = await api({
      method: method,
      url,
      data,
      headers: {
        ...headers,
        ...(requireToken && {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem('user') || '{}')?.token as string
          }`,
        }),
      },
    });

    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
