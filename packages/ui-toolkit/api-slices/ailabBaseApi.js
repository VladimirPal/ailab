import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ailabApi from "@ailab/api-client/ailabApi";

let rawBaseQuery = null;

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const baseUrl = ailabApi.getBaseUrl();

  if (!baseUrl) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No baseUrl',
      },
    };
  }

  if (!rawBaseQuery) {
    rawBaseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        const token = ailabApi.getJWT();

        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
      },
    });
  }

  return rawBaseQuery(args, api, extraOptions);
};

export const aiLabBaseApi = createApi({
  reducerPath: 'aiLabApi',
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});
