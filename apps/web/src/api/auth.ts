import { makeApiRequest } from './api';
import { API_ROUTES } from './routes';

export type RegisterUserPayload = {
  email: string;
  password: string;
};

export const loginUser = (data: RegisterUserPayload) => {
  return makeApiRequest<RegisterUserPayload>(API_ROUTES.login, 'POST', {
    data,
  });
};
