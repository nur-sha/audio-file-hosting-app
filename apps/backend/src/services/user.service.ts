import { hash } from 'bcryptjs';
import { UserServiceRequest, UserServiceUpdate } from '../types/user.types';
import { sign } from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { USER_ROLE } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET!;

export class UserService {
  static async register({
    email,
    password,
    role,
    displayName,
    fullName,
  }: UserServiceRequest) {
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      throw new Error('User already exists with this email');
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 12),
        role: role || USER_ROLE.USER,
        displayName,
        fullName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      select: {
        id: true,
        email: true,
        role: true,
        displayName: true,
        createdAt: true,
      },
    });

    const token = sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { user, token };
  }

  static async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        displayName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async getAllUsers(page: number, limit: number) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { active: true },
        select: {
          id: true,
          email: true,
          role: true,
          displayName: true,
          fullName: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where: { active: true } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      users,
      total,
      page,
      limit,
      totalPages,
    };
  }

  static async updateUser(userId: string, data: UserServiceUpdate) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...data, updatedAt: new Date().toISOString() },
      select: {
        id: true,
        email: true,
        role: true,
        displayName: true,
        fullName: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }
  static async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { active: false }, // ← Soft delete
    });
  }
}
