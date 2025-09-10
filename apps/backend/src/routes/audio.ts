import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { AudioController } from '../controllers/audio.controller';
import { audioUpload } from '../middleware/audio-multer';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/audio - Get user's audio files

router.get('/', AudioController.getAudioFiles);
router.post('/category/lists', AudioController.getAudioFilesByCategory);

router.post(
  '/create',
  //@ts-ignore
  audioUpload.single('audio'),
  AudioController.uploadAudio
);

export default router;
