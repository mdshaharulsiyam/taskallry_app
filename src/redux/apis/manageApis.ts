import { baseApi } from "../baseApi";

interface ManageContent {
  description: string;
  _id: string;
}
interface ManageRequest {
  data: {
    question: string;
    answer: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }[];
}
interface ManageResponse {
  success: boolean;
  data: ManageContent[] | ManageContent | string;
}

interface ManageResponse {
  success: boolean;
  data: ManageContent[] | ManageContent | string;
}

export const manageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query<ManageRequest, void>({
      query: () => ({
        url: "/manage/get-faq",
        method: "GET",
      }),
      providesTags: ["Manage"],
    }),
    getTermsConditions: builder.query<ManageResponse, void>({
      query: () => ({
        url: "/manage/get-terms-conditions",
        method: "GET",
      }),
      providesTags: ["Manage"],
    }),
    getPrivacyPolicy: builder.query<ManageResponse, void>({
      query: () => ({
        url: "/manage/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["Manage"],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useGetTermsConditionsQuery,
  useGetPrivacyPolicyQuery,
} = manageApi;
