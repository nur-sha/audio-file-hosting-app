export class LocalStorageService {
  static async upload(
    file: Express.Multer.File,
    userId: string
  ): Promise<{ key: string }> {
    const timestamp = Date.now();
    const safeFileName = `${timestamp}-${file.originalname}`;
    const key = `users/${userId}/audio/${safeFileName}`;

    return { key };
  }
}
