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

// Fake user data for demo purposes
const FAKE_USERS: Record<string, { password: string; user: User }> = {
  "john@example.com": {
    password: "password123",
    user: {
      id: "user_001",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      isActive: true,
      isEmailVerified: true,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
  },
  "admin@example.com": {
    password: "admin123",
    user: {
      id: "admin_001",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      isActive: true,
      isEmailVerified: true,
      createdAt: "2024-01-01T08:00:00Z",
      updatedAt: "2024-01-01T08:00:00Z",
    },
  },
};

const generateFakeToken = (email: string): string => {
  return `fake_token_${email}_${Date.now()}`;
};

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
      queryFn: async (credentials) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const fakeUserData = FAKE_USERS[credentials.email];

        if (!fakeUserData) {
          return {
            error: {
              status: 401,
              data: {
                success: false,
                statusCode: 401,
                message: "Invalid email or password",
                data: null,
              },
            },
          };
        }

        if (fakeUserData.password !== credentials.password) {
          return {
            error: {
              status: 401,
              data: {
                success: false,
                statusCode: 401,
                message: "Invalid email or password",
                data: null,
              },
            },
          };
        }

        const token = generateFakeToken(credentials.email);

        // Set cookie for middleware to check
        if (typeof document !== "undefined") {
          document.cookie = `accessToken=${token}; path=/; max-age=86400`;
        }

        return {
          data: {
            success: true,
            statusCode: 200,
            message: "Login successful",
            data: {
              accessToken: token,
              user: fakeUserData.user,
            },
          },
        };
      },
    }),

    logout: build.mutation<ApiResponse<null>, void>({
      queryFn: async () => {
        // Clear cookie
        if (typeof document !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
        }
        return {
          data: {
            success: true,
            statusCode: 200,
            message: "Logout successful",
            data: null,
          },
        };
      },
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
  overrideExisting: true,
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
