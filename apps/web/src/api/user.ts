import { makeApiRequest } from './api';
import { UserModel } from './interfaces/user.types';
import { API_ROUTES } from './routes';

export type RegisterUserPayload = Omit<
  UserModel,
  'createdAt' | 'updatedAt' | 'id'
>;
export type UpdateUserPayload = Pick<UserModel, 'role' | 'displayName'> & {
  userId: string;
};
export type DeleteUserPayload = {
  userId: string;
};

export const registerUser = (data: RegisterUserPayload) => {
  return makeApiRequest<RegisterUserPayload>(API_ROUTES.register, 'POST', {
    data,
  });
};

export const getAllUsers = () => {
  return makeApiRequest(API_ROUTES.users, 'POST', { requireToken: true });
};

export const updateUserById = (data: UpdateUserPayload) => {
  return makeApiRequest(API_ROUTES.user, 'PUT', {
    data,
    requireToken: true,
  });
};

export const deleteUserById = (data: DeleteUserPayload) => {
  return makeApiRequest(API_ROUTES.user, 'DELETE', {
    data,
    requireToken: true,
  });
};
