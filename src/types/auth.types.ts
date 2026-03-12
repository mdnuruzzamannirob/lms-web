export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  isActive: boolean
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface VerifyEmailRequest {
  email: string
  otp: string
}

export interface ResendOtpRequest {
  email: string
  type: 'email_verification' | 'password_reset'
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyResetOtpRequest {
  email: string
  otp: string
}

export interface ResetPasswordRequest {
  resetToken: string
  newPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}
