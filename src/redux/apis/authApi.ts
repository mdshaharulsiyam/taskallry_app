import { baseApi } from "../baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: true;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    isBankNumberVerified: boolean;
    isIdentificationDocumentVerified: boolean;
    isAddressProvided: boolean;
    role: "provider" | "customer";
  }
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: "provider" | "customer";
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
  _id: string;
  user: {
    isMultiRole: boolean;
    _id: string;
  };
  name: string;
  email: string;
  phone: string;
  address_document: string;
  isAddressProvided: boolean;
  createdAt: string;
  updatedAt: string;
  city: string;
  street: string;
  profile_image: string;
  bankName?: string;
  bankAccountNumber?: string;
  referralCode?: string;
  address: string;
}

type UpdateProfileRequest =
  | {
    name?: string;
    email?: string;
    city?: string;
    street?: string;
    profile_image?: string;
  }
  | FormData;

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
  data: {
    accessToken: string;
    refreshToken: string;
    isBankNumberVerified: boolean;
    isIdentificationDocumentVerified: boolean;
    isAddressProvided: boolean;
    role: "provider" | "customer";
  }
}

interface ApplyReferralCodeRequest {
  code: string;
}

interface ApplyReferralCodeResponse {
  message: string;
  success: boolean;
  data?: {
    discountAmount?: number;
    referralCredit?: number;
  };
}

interface UpgradeAccountResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    isBankNumberVerified: boolean;
    isIdentificationDocumentVerified: boolean;
    isAddressProvided: boolean;
    role: "provider" | "customer";
  };
}
export interface ReferralItem {
  _id: string;
  referrer: string;
  referrerFromModel: string;
  referred: string;
  referredFromModel: string;
  status: string;
  referral: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isMeReferrer: boolean;
}

export interface ReferralResponse {
  success: boolean;
  message: string;
  data: {
    result: ReferralItem[];
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyReferralCode: builder.mutation<ApplyReferralCodeResponse, ApplyReferralCodeRequest>({
      query: (body) => ({
        url: '/referral/apply-referral-code',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    applyReferralCodeUse: builder.mutation<ApplyReferralCodeResponse, ApplyReferralCodeRequest>({
      query: (body) => ({
        url: '/referralUse/apply-referral-code',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
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
    upgradeAccount: builder.mutation<UpgradeAccountResponse, void>({
      query: () => ({
        url: "/user/upgrade-account",
        method: "POST",
        body: {}
      }),
      invalidatesTags: ["Profile", "Auth"],
    }),
    // {{local_url}}/referralUse/my-referral
    getReferral: builder.query<ReferralResponse, void>({
      query: () => ({
        url: "/referralUse/my-referral",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useApplyReferralCodeMutation,
  useApplyReferralCodeUseMutation,
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
  useGetReferralQuery,
  useUpgradeAccountMutation,
} = authApi;
