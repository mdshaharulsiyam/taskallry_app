import { baseApi } from "../baseApi";
interface UserProfile {
  _id: string;
  bankAccountNumber: string;
  bankName: string;
}
interface UpdateProfileResponse {
  message: string;
  success: boolean;
  data: UserProfile;
}

interface UpdateProfileRequest {
  bankAccountNumber?: string;
  bankName?: string;
}

export const profileItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBank: builder.query<UpdateProfileResponse, void>({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateBank: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetBankQuery, useUpdateBankMutation } = profileItemApi;
