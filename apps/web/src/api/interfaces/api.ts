export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiCommonResponse {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
}
