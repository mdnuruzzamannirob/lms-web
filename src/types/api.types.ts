export interface ApiResponse<T = unknown> {
  success: boolean
  statusCode: number
  message: string
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  data: T
}

export interface ApiErrorPayload {
  success: false
  statusCode: number
  message: string
  errors?: Array<{
    path: string
    message: string
  }>
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}
