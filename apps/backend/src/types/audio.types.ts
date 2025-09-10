import { AudioModel } from '../models/audio.model';

export type AudioCreateDBPayload = Pick<
  AudioModel,
  'title' | 'description' | 'categoryId'
>;
