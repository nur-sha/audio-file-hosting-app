import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserServiceUpdate } from '../types/user.types';
const ALLOWED_FIELDS_UPDATE = ['role', 'displayName'];

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, role, displayName, fullName } = req.body;

      if (!email || !password || !displayName || !fullName) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      const result = await UserService.register({
        email,
        password,
        role,
        displayName,
        fullName,
      });

      return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e,
      });
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req?.body || {};

      if (page < 1 || limit < 1 || limit > 100) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid pagination body' });
      }

      const result = await UserService.getAllUsers(page, limit);

      return res.status(200).json({
        success: true,
        message: 'SUCCESS',
        data: result,
      });
    } catch (e) {
      console.error('Get users error:', e);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { userId, ...data } = req.body;

      const updatedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (ALLOWED_FIELDS_UPDATE.includes(key)) {
          return { ...acc, [key]: value };
        }

        return acc;
      }, {} as UserServiceUpdate);

      const user = await UserService.updateUser(userId, updatedData);
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: { user },
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      await UserService.deleteUser(userId);
      return res.status(200).json({
        success: true,
        message: 'User deactivated successfully',
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}
