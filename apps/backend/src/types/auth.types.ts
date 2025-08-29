import { UserModel } from '../models/user.model';

export const USER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type UserService = Omit<UserModel, 'createdAt' | 'updatedAt'>;
