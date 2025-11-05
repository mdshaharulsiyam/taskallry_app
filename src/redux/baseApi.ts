import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const url = "http://10.10.20.9:9000/api/v1";
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      // Add auth token or other headers here
      // const token = getState().auth.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Task", "Profile", "Service"],
  endpoints: () => ({}),
});
