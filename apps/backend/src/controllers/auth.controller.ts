/**
 * Purpose:
The controller handles the HTTP requests and responses. It:

Receives requests from clients (like web browsers or curl commands)

Calls the appropriate service to process the business logic

Sends back HTTP responses with proper status codes

Handles
 */
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const result = await AuthService.login({
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (e) {
      console.log('error::', e);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // static async getProfile(req: AuthRequest, res: Response) {
  //   try {
  //     const user = await AuthService.getUserById(req.user!.id);
  //     res.json({
  //       message: 'Profile retrieved successfully',
  //       data: { user },
  //     });
  //   } catch (error: any) {
  //     res.status(404).json({
  //       message: error.message || 'User not found',
  //     });
  //   }
  // }
}
