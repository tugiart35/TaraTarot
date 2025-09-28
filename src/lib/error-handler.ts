/**
 * Centralized Error Handling Utility
 * Provides consistent error handling and user feedback
 */

import { logError, logSupabaseError } from './logger';

export interface ErrorContext {
  operation?: string;
  component?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly statusCode: number;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = 'AppError';
  }
}

export class SupabaseError extends AppError {
  constructor(message: string, originalError?: unknown) {
    const code = (originalError as { code?: string })?.code || 'SUPABASE_ERROR';
    const statusCode = (originalError as { status?: number })?.status || 500;
    super(message, code, statusCode);
    this.name = 'SupabaseError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    if (field) {
      (this as any).metadata = { field };
    }
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Central error handler
 */
export class ErrorHandler {
  /**
   * Handle any error with proper logging and user feedback
   */
  static handle(
    error: unknown,
    context: ErrorContext
  ): {
    userMessage: string;
    shouldRetry: boolean;
    shouldRedirect?: string;
  } {
    const errorInfo = this.parseError(error);

    // Log the error
    if (errorInfo.type === 'supabase') {
      logSupabaseError(context.operation || 'unknown', error, context);
    } else {
      logError(errorInfo.message, error, context);
    }

    // Return user-friendly response
    return this.getUserResponse(errorInfo, context);
  }

  /**
   * Handle Supabase errors specifically
   */
  static handleSupabase(
    error: unknown,
    operation: string,
    context?: ErrorContext
  ): {
    userMessage: string;
    shouldRetry: boolean;
  } {
    const fullContext = { ...context, operation };
    logSupabaseError(operation, error, fullContext);

    if ((error as any)?.code === 'PGRST116') {
      return {
        userMessage: 'Kayıt bulunamadı.',
        shouldRetry: false,
      };
    }

    if ((error as any)?.code === 'PGRST301') {
      return {
        userMessage: 'Bu işlem için yetkiniz bulunmuyor.',
        shouldRetry: false,
      };
    }

    if ((error as any)?.message?.includes('JWT')) {
      return {
        userMessage: 'Oturum süresi dolmuş. Lütfen tekrar giriş yapın.',
        shouldRetry: false,
      };
    }

    return {
      userMessage: 'Veritabanı hatası oluştu. Lütfen tekrar deneyin.',
      shouldRetry: true,
    };
  }

  /**
   * Handle authentication errors
   */
  static handleAuth(error: unknown): {
    userMessage: string;
    shouldRedirect: string;
  } {
    logError('Authentication error', error, { action: 'auth' });

    if ((error as any)?.message?.includes('Invalid login credentials')) {
      return {
        userMessage: 'E-posta veya şifre hatalı.',
        shouldRedirect: '/auth',
      };
    }

    if ((error as any)?.message?.includes('Email not confirmed')) {
      return {
        userMessage: 'E-posta adresinizi onaylayın.',
        shouldRedirect: '/auth',
      };
    }

    return {
      userMessage: 'Giriş yapılamadı. Lütfen tekrar deneyin.',
      shouldRedirect: '/auth',
    };
  }

  /**
   * Parse error to determine type and extract info
   */
  private static parseError(error: unknown): {
    type: 'supabase' | 'network' | 'validation' | 'unknown';
    message: string;
    code?: string;
  } {
    if (!error) {
      return { type: 'unknown', message: 'Unknown error occurred' };
    }

    if (typeof error === 'object' && error !== null && 'code' in error) {
      const errorObj = error as { message?: string; code?: string };
      const result: { type: 'supabase'; message: string; code?: string } = {
        type: 'supabase',
        message: errorObj.message || 'Database error',
      };
      if (errorObj.code !== undefined) {
        result.code = errorObj.code;
      }
      return result;
    }

    if (error instanceof Error) {
      if (error.name === 'NetworkError' || error.message.includes('fetch')) {
        return {
          type: 'network',
          message: error.message,
        };
      }

      return {
        type: 'unknown',
        message: error.message,
      };
    }

    return {
      type: 'unknown',
      message: String(error),
    };
  }

  /**
   * Get user-friendly response based on error type
   */
  private static getUserResponse(
    errorInfo: { type: string; message: string; code?: string },
    _context: ErrorContext
  ): {
    userMessage: string;
    shouldRetry: boolean;
    shouldRedirect?: string;
  } {
    switch (errorInfo.type) {
      case 'supabase':
        return this.getSupabaseUserMessage(errorInfo.code);

      case 'network':
        return {
          userMessage: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
          shouldRetry: true,
        };

      case 'validation':
        return {
          userMessage: errorInfo.message || 'Girilen bilgiler geçersiz.',
          shouldRetry: false,
        };

      default:
        return {
          userMessage: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
          shouldRetry: true,
        };
    }
  }

  /**
   * Get user message for Supabase errors
   */
  private static getSupabaseUserMessage(code?: string): {
    userMessage: string;
    shouldRetry: boolean;
    shouldRedirect?: string;
  } {
    switch (code) {
      case 'PGRST116':
        return {
          userMessage: 'Kayıt bulunamadı.',
          shouldRetry: false,
        };

      case 'PGRST301':
        return {
          userMessage: 'Bu işlem için yetkiniz bulunmuyor.',
          shouldRetry: false,
          shouldRedirect: '/dashboard',
        };

      case '23505':
        return {
          userMessage: 'Bu kayıt zaten mevcut.',
          shouldRetry: false,
        };

      default:
        return {
          userMessage: 'Veritabanı hatası oluştu. Lütfen tekrar deneyin.',
          shouldRetry: true,
        };
    }
  }
}

/**
 * Utility functions for common error scenarios
 */
export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>,
  context: ErrorContext
): Promise<{ data?: T; error?: unknown }> => {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    const handled = ErrorHandler.handle(error, context);
    return { error: handled };
  }
};

export const withErrorBoundary = <T extends unknown[], R>(
  fn: (...args: T) => R,
  context: ErrorContext
) => {
  return (...args: T): R | { error: unknown } => {
    try {
      return fn(...args);
    } catch (error) {
      return { error: ErrorHandler.handle(error, context) };
    }
  };
};
