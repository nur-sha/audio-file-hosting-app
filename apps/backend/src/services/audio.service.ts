import { AudioCreateDBPayload } from '../types/audio.types';
import prisma from '../utils/prisma';

export class AudioService {
  static async createAudio(
    userId: string,
    //@ts-ignore
    file: Express.Multer.File,
    data: AudioCreateDBPayload
  ) {
    const { description, title, categoryId } = data;

    const audioFile = await prisma.audio.create({
      data: {
        title,
        description,
        filename: file.filename,
        originalName: file.originalname,
        filePath: `/uploads/audio/${file.filename}`,
        mimeType: file.mimetype,
        size: file.size,
        userId,
        categoryId,
        isProcessing: true,
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
          },
        },
        category: true,
      },
    });

    return audioFile;
  }
  static async getUserAudioFiles(userId: string, categoryId?: string) {
    return prisma.audio.findMany({
      where: {
        userId: userId,
        deletedAt: null,
        ...(categoryId && { categoryId }), // only added if categoryId is truthy
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
