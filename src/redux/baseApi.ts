import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const url = "http://10.10.20.9:9000";
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/v1`,
    prepareHeaders: async (headers) => {
      // Add auth token or other headers here
      const token = await AsyncStorage.getItem("token");
      if (!headers.has("authorization")) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Task", "Profile", "Service", "Category", "Bid", "Question", "Extension", "Cancel", "Feedback", "Manage"],
  endpoints: () => ({}),
});

export const ImgUrl = (uri: string) => {
  if (!url || uri == "" || uri == null || uri == undefined) {
    return uri;
  }
  else if (uri.startsWith("http")) {
    return uri;
  } else if (uri.startsWith("/")) {
    return `${url}${uri}`;
  } else {
    return `${url}/${uri}`;
  }
};
