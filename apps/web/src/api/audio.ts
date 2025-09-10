import { makeApiRequest } from './api';
import { API_ROUTES } from './routes';

export const getAudioByCategory = (categoryId: string) => {
  return makeApiRequest(API_ROUTES.audioByCategory, 'POST', {
    data: { categoryId },
  });
};

export const uploadAudio = (data: FormData) => {
  return makeApiRequest<FormData>(API_ROUTES.uploadAudio, 'POST', {
    data,
  });
};
