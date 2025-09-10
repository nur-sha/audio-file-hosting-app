import { Request, Response } from 'express';
import { AudioService } from '../services/audio.service';
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class AudioController {
  static async uploadAudio(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { title, description, categoryId } = req.body;

      //@ts-ignore
      if (!req?.file) {
        return res.status(400).json({
          success: false,
          message: 'Audio file required',
        });
      }

      if (!title || !categoryId) {
        // Clean up the uploaded file if validation fails
        // fs.unlinkSync(file.path);
        return res.status(400).json({
          success: false,
          message: 'Title and category are required',
        });
      }

      const audio = await AudioService.createAudio(
        (req as any)?.user?.id,
        //@ts-ignore
        req?.file,
        {
          title,
          description,
          categoryId,
        }
      );
      return res.status(201).json({
        success: true,
        message: 'Audio file uploaded successfully',
        data: { audio },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload audio file',
      });
    }
  }

  static async getAudioFiles(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const audioFiles = await AudioService.getUserAudioFiles(userId);

      // await sleep(1000);

      return res.status(200).json({
        success: true,
        message: 'Audio files retrieved successfully',
        data: { audioFiles },
      });
    } catch (e) {
      console.error('Get audio files error:', e);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve audio files',
      });
    }
  }

  static async getAudioFilesByCategory(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { categoryId } = req.body;
      const audioFiles = await AudioService.getUserAudioFiles(
        userId,
        categoryId
      );

      // await sleep(1000);

      return res.status(200).json({
        success: true,
        message: 'Audio files retrieved successfully',
        data: { audioFiles },
      });
    } catch (e) {
      console.error('Get audio files error:', e);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve audio files',
      });
    }
  }
}
