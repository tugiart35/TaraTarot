/*
 * Auth Service Tests
 *
 * Bu dosya AuthService için unit testleri içerir.
 * Jest ve React Testing Library kullanır.
 */

import { AuthService } from '../auth-service';
import { supabase } from '@/lib/supabase/client';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      signInWithOAuth: jest.fn(),
      onAuthStateChange: jest.fn(),
      refreshSession: jest.fn(),
    },
  },
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should sign in user with valid credentials', async () => {
      const mockData = {
        user: { id: '1', email: 'test@example.com' },
        session: { access_token: 'token' },
      };

      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await AuthService.signIn(
        'test@example.com',
        'password123'
      );

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockData);
    });

    it('should throw error for invalid credentials', async () => {
      const mockError = { message: 'Invalid login credentials' };

      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(
        AuthService.signIn('test@example.com', 'wrongpassword')
      ).rejects.toThrow();
    });
  });

  describe('signUp', () => {
    it('should register new user with valid data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const mockData = {
        user: { id: '1', email: userData.email },
        session: null,
      };

      mockSupabase.auth.signUp.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await AuthService.signUp(userData);

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        },
      });
      expect(result).toEqual(mockData);
    });

    it('should throw error for existing user', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const mockError = { message: 'User already registered' };

      mockSupabase.auth.signUp.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(AuthService.signUp(userData)).rejects.toThrow();
    });
  });

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
        data: {},
        error: null,
      });

      await AuthService.resetPassword('test@example.com', 'tr');

      expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        'test@example.com',
        {
          redirectTo: expect.stringContaining('/auth/reset-password'),
        }
      );
    });

    it('should throw error for invalid email', async () => {
      const mockError = { message: 'Invalid email' };

      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(
        AuthService.resetPassword('invalid-email', 'tr')
      ).rejects.toThrow();
    });
  });

  describe('signInWithGoogle', () => {
    it('should initiate Google OAuth', async () => {
      mockSupabase.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'google', url: 'https://google.com/oauth' },
        error: null,
      });

      const result = await AuthService.signInWithGoogle('tr');

      expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.stringContaining('/auth/callback'),
        },
      });
      expect(result).toBe(true);
    });

    it('should throw error for OAuth failure', async () => {
      const mockError = { message: 'OAuth error' };

      mockSupabase.auth.signInWithOAuth.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(AuthService.signInWithGoogle('tr')).rejects.toThrow();
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({
        error: null,
      });

      await AuthService.signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    });

    it('should throw error for sign out failure', async () => {
      const mockError = { message: 'Sign out error' };

      mockSupabase.auth.signOut.mockResolvedValue({
        error: mockError,
      });

      await expect(AuthService.signOut()).rejects.toThrow();
    });
  });

  describe('onAuthStateChange', () => {
    it('should register auth state change listener', () => {
      const mockCallback = jest.fn();
      const mockUnsubscribe = jest.fn();

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      const result = AuthService.onAuthStateChange(mockCallback);

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledWith(
        mockCallback
      );
      expect(result).toBeDefined();
    });
  });

  describe('refreshSession', () => {
    it('should refresh session successfully', async () => {
      const mockData = {
        user: { id: '1', email: 'test@example.com' },
        session: { access_token: 'new-token' },
      };

      mockSupabase.auth.refreshSession.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await AuthService.refreshSession();

      expect(mockSupabase.auth.refreshSession).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it('should throw error for refresh failure', async () => {
      const mockError = { message: 'Refresh error' };

      mockSupabase.auth.refreshSession.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(AuthService.refreshSession()).rejects.toThrow();
    });
  });
});
