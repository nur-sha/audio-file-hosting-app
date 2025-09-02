import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';

const router = Router();
router.post('/register', UserController.register);

router.use(authenticate);
// router.post('/profile', authenticate, AuthController.getProfile);

// router.post('/users', AuthController.register);

router.use(requireAdmin);
router.post('/users', UserController.getAllUsers);
router.put('/user', UserController.updateUser);
router.delete('/user', authenticate, UserController.deleteUser);

export default router;
