import { baseApi } from "../baseApi";
interface UserProfile {
  _id: string;
  bankAccountNumber: string;
  bankName: string;
  bankVerificationNumber: string;
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

interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: string;
}

interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    result: NotificationItem[];
  };
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

    // /notification/get-notifications

    getNotification: builder.query<NotificationResponse, void>({
      query: () => ({
        url: "/notification/get-notifications",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    // read all /notification/see-notifications
    readAll: builder.mutation<NotificationResponse, void>({
      query: () => ({
        url: "/notification/see-notifications",
        method: "PATCH",
      }),
      invalidatesTags: ["Profile"],
    }),

    // {{local_url}}/notification/delete-notification/6923058ae5facd1a334eee72 cannot done
    deleteNotification: builder.mutation<NotificationResponse, string>({
      query: (notificationId) => ({
        url: `/notification/delete-notification/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetBankQuery,
  useGetNotificationQuery,
  useUpdateBankMutation,
  useDeleteNotificationMutation,
  useReadAllMutation,
} = profileItemApi;
