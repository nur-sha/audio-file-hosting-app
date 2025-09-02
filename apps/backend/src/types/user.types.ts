import { UserModel } from '../models/user.model';

export type UserServiceRequest = Omit<UserModel, 'createdAt' | 'updatedAt'>;
export type UserServiceUpdate = Pick<UserModel, 'role' | 'displayName'>;
