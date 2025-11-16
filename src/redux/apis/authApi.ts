import { baseApi } from "../baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "user" | "service";
}

interface VerifyCodeRequest {
  email: string;
  verifyCode: number;
}

interface VerifyCodeResponse {
  message: string;
  success: boolean;
}

interface UserProfile {
  "_id": string,
  "user": string,
  "name": string,
  "email": string,
  "phone": string,
  "address_document": string,
  "isAddressProvided": true,
  "createdAt": string,
  "updatedAt": string,
  "city": string,
  "street": string,
  "profile_image": string
}

interface UpdateProfileRequest {
  name?: string;
  email?: string;
  city?: string;
  street?: string;
  profile_image?: string;
}

interface UpdateProfileResponse {
  message: string;
  success: boolean;
  data: UserProfile;
}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

interface ForgetPasswordRequest {
  email: string;
}

interface ForgetPasswordResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

interface VerifyResetOtpRequest {
  email: string;
  resetCode: number;
}

interface VerifyResetOtpResponse {
  message: string;
  success: boolean;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/user/sign-up",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (data) => ({
        url: "/user/verify-code",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMyProfile: builder.query<UpdateProfileResponse, void>({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetPassword: builder.mutation<
      ForgetPasswordResponse,
      ForgetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyResetOtp: builder.mutation<
      VerifyResetOtpResponse,
      VerifyResetOtpRequest
    >({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyCodeMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyResetOtpMutation,
  useUpdateProfileMutation,
} = authApi;
