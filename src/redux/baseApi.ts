import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// export const url = "https://rnj64vmh-9000.inc1.devtunnels.ms";
export const url = "http://10.10.20.9:9050";
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/v1`,
    prepareHeaders: async (headers, { getState }) => {
      const state: any = getState();
      const tokenFromState: string | null | undefined = state?.auth?.token;
      const token = tokenFromState ?? (await AsyncStorage.getItem("token"));

      if (token && !headers.has("authorization")) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Task",
    "Profile",
    "Service",
    "Category",
    "Bid",
    "Question",
    "Extension",
    "Cancel",
    "Feedback",
    "Manage",
    "Payment",
    "Conversation",
    "Message",
  ],
  endpoints: () => ({}),
});

export const ImgUrl = (uri: string) => {
  if (!url || uri == "" || uri == null || uri == undefined) {
    return uri;
  } else if (uri.startsWith("http")) {
    return uri;
  } else if (uri.startsWith("/")) {
    return `${url}${uri}`;
  } else {
    return `${url}/${uri}`;
  }
};
