import { ApiResponse } from './api';
import { Category } from './category.types';

export interface Audio {
  id: string;
  title: string;
  description: string;
  filename: string;
  originalName: string;
  filePath: string;
  mimeType: string;
  size: number;
  duration?: number;
  isProcessing: boolean;
  userId: string;
  category: Category;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface AudioListDataModel {
  audioFiles: Audio[];
}

export interface AudioUploadPayload {
  categoryId: string;
  title: string;
  audio: File;
  description?: string;
}

export type AudioListResponse = ApiResponse<AudioListDataModel>;
