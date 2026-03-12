import { baseApi } from "./baseApi";
import type { ApiResponse } from "@/types/api.types";
import type {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  ResendOtpRequest,
  ForgotPasswordRequest,
  VerifyResetOtpRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  User,
} from "@/types/auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<ApiResponse<null>, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    verifyEmail: build.mutation<
      ApiResponse<{ accessToken: string; user: User }>,
      VerifyEmailRequest
    >({
      query: (body) => ({ url: "/auth/verify-email", method: "POST", body }),
    }),

    resendOtp: build.mutation<ApiResponse<null>, ResendOtpRequest>({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),

    login: build.mutation<
      ApiResponse<{ accessToken: string; user: User }>,
      LoginRequest
    >({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),

    logout: build.mutation<ApiResponse<null>, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),

    changePassword: build.mutation<ApiResponse<null>, ChangePasswordRequest>({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),

    forgotPassword: build.mutation<ApiResponse<null>, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    verifyResetOtp: build.mutation<
      ApiResponse<{ resetToken: string }>,
      VerifyResetOtpRequest
    >({
      query: (body) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: build.mutation<ApiResponse<null>, ResetPasswordRequest>({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
