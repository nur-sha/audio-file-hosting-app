export const USER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export interface UserModel {
  email: string;
  password: string;
  displayName: string;
  fullname: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  createdAt: string;
  updatedAt: string;
}
