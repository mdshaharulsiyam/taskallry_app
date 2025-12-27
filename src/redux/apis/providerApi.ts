import { baseApi } from "../baseApi";

interface ProviderMetaDataResponse {
  success: boolean;
  message: string;
  data: {
    completedCount: number;
    inProgressCount: number;
    pendingCount: number;
    bidOpenForBidCount: number;
  };
}

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    completeIdentityVerification: builder.mutation<any, any>({
      query: (body) => ({
        url: "/provider/complete-identity-verification",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),
    verifyBvn: builder.mutation<any, any>({
      query: (body) => ({
        url: "/provider/verify-bvn",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getProviderMetaData: builder.query<ProviderMetaDataResponse, void>({
      query: () => ({
        url: "/provider/metaData",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useCompleteIdentityVerificationMutation,
  useVerifyBvnMutation,
  useGetProviderMetaDataQuery,
} = providerApi;
