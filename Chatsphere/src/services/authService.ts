import { User, ApiResponse } from '@/types';
import { apiClient } from './apiClient';

export class AuthService {
  static async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  static async register(userData: any): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }

  static async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get current user');
    }
  }

  static async forgotPassword(email: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }
}