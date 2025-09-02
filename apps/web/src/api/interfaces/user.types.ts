import { ApiResponse, PaginationResponse } from './api';

export interface UserModel {
  id: string;
  email: string;
  password: string;
  displayName: string;
  fullName: string;
  role?: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface UserDataModel {
  token: string;
  user: UserModel;
}

export type UserModelResponse = ApiResponse<UserDataModel>;

export type UsersModelResponse = ApiResponse<
  { users: UserModel[] } & PaginationResponse
>;
