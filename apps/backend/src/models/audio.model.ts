export interface AudioModel {
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
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
