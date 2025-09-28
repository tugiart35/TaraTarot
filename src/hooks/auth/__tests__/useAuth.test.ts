/*
 * useAuth Hook Tests
 *
 * Bu dosya useAuth hook'u için unit testleri içerir.
 * Jest ve React Testing Library kullanır.
 */

import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { AuthService } from '@/lib/auth/auth-service';

// Mock AuthService
jest.mock('@/lib/auth/auth-service');
const mockAuthService = AuthService as jest.Mocked<typeof AuthService>;

// Mock Supabase auth
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
    },
  },
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with null user and loading true', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
    });
  });

  describe('signIn', () => {
    it('should call AuthService.signIn and update user state', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockAuthData = { user: mockUser, session: null };

      mockAuthService.signIn.mockResolvedValue(mockAuthData);
      mockAuthService.getCurrentUser.mockResolvedValue(mockUser);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signIn('test@example.com', 'password123');
      });

      expect(mockAuthService.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBeNull();
    });

    it('should handle signIn error', async () => {
      const mockError = new Error('Invalid credentials');
      mockAuthService.signIn.mockRejectedValue(mockError);
      mockAuthService.getCurrentUser.mockResolvedValue(null);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        try {
          await result.current.signIn('test@example.com', 'wrongpassword');
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Invalid credentials');
    });
  });

  describe('signUp', () => {
    it('should call AuthService.signUp', async () => {
      const mockSignUpData = { user: { id: '1', email: 'test@example.com' } };
      mockAuthService.signUp.mockResolvedValue(mockSignUpData);

      const { result } = renderHook(() => useAuth());

      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'John',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male',
      };

      await act(async () => {
        await result.current.signUp(userData);
      });

      expect(mockAuthService.signUp).toHaveBeenCalledWith(userData);
      expect(result.current.error).toBeNull();
    });

    it('should handle signUp error', async () => {
      const mockError = new Error('User already exists');
      mockAuthService.signUp.mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuth());

      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'John',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male',
      };

      await act(async () => {
        try {
          await result.current.signUp(userData);
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('User already exists');
    });
  });

  describe('signOut', () => {
    it('should call AuthService.signOut and clear user state', async () => {
      mockAuthService.signOut.mockResolvedValue(true);
      mockAuthService.getCurrentUser.mockResolvedValue(null);

      const { result } = renderHook(() => useAuth());

      // Set initial user state
      act(() => {
        result.current.user = { id: '1', email: 'test@example.com' } as any;
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(mockAuthService.signOut).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe('resetPassword', () => {
    it('should call AuthService.resetPassword', async () => {
      mockAuthService.resetPassword.mockResolvedValue(true);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.resetPassword('test@example.com', 'tr');
      });

      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(
        'test@example.com',
        'tr'
      );
      expect(result.current.error).toBeNull();
    });

    it('should handle resetPassword error', async () => {
      const mockError = new Error('Email not found');
      mockAuthService.resetPassword.mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        try {
          await result.current.resetPassword('test@example.com', 'tr');
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Email not found');
    });
  });

  describe('signInWithGoogle', () => {
    it('should call AuthService.signInWithGoogle', async () => {
      mockAuthService.signInWithGoogle.mockResolvedValue(true);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signInWithGoogle('tr');
      });

      expect(mockAuthService.signInWithGoogle).toHaveBeenCalledWith('tr');
      expect(result.current.error).toBeNull();
    });

    it('should handle signInWithGoogle error', async () => {
      const mockError = new Error('Google auth failed');
      mockAuthService.signInWithGoogle.mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        try {
          await result.current.signInWithGoogle('tr');
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Google auth failed');
    });
  });

  describe('refreshSession', () => {
    it('should call AuthService.refreshSession and update user state', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockRefreshData = { user: mockUser, session: null };

      mockAuthService.refreshSession.mockResolvedValue(mockRefreshData);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.refreshSession();
      });

      expect(mockAuthService.refreshSession).toHaveBeenCalled();
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      const { result } = renderHook(() => useAuth());

      // Set initial error
      act(() => {
        result.current.error = 'Some error';
      });

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('Loading State', () => {
    it('should set loading to true during operations', async () => {
      mockAuthService.signIn.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ user: null, session: null }), 100)
          )
      );

      const { result } = renderHook(() => useAuth());

      expect(result.current.loading).toBe(true);

      await act(async () => {
        const promise = result.current.signIn(
          'test@example.com',
          'password123'
        );
        expect(result.current.loading).toBe(true);
        await promise;
      });

      expect(result.current.loading).toBe(false);
    });
  });
});
