import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import prisma from '../utils/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;

const verifyUser = async (token: string) => {
  const decoded = verify(token, JWT_SECRET) as {
    userId: string;
    role: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, email: true, role: true },
  });

  return user;
};

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.substring(7);

    const user = await verifyUser(token);

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }

    (req as any).user = user;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

export const authenticateAssets = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.query.token;

    const user = await verifyUser(token as string);

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }

    (req as any).user = user;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
    return;
  }
  next();
};
