import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import categoryRoutes from './routes/category';
import audioRoutes from './routes/audio';
import path from 'path';
import { authenticateAssets } from './middleware/auth';

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use(
  '/uploads',
  authenticateAssets,
  express.static(path.join(__dirname, '../uploads'))
);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/audio', audioRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Global error handler:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
    });
  }
);
export default app;
