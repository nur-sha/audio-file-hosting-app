import { compare } from 'bcryptjs';
import prisma from '../utils/prisma';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  static async login({ email, password }: any) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new Error('Invalid email or password');
    }
    const token = sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName: user.displayName || undefined,
        fullName: user.fullName || undefined,
        createdAt: user.createdAt,
      },
      token,
    };
  }
}
