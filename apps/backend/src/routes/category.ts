import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
router.use(authenticate);

router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);

export default router;
