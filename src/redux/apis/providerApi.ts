import { baseApi } from "../baseApi";

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
  }),
});

export const {
  useCompleteIdentityVerificationMutation,
  useVerifyBvnMutation,
} = providerApi;
