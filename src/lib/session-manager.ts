/**
 * Session Management Utility
 * Handles automatic session refresh and expiration
 */

import React from 'react';
import { supabase } from './supabase/client';
import { logError, logDebug } from './logger';
import { logSecurityEvent } from './audit-logger';

export interface SessionState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  } | null;
  expiresAt: number | null;
  refreshToken: string | null;
  lastRefresh: number;
}

class SessionManager {
  private sessionState: SessionState = {
    isAuthenticated: false,
    user: null,
    expiresAt: null,
    refreshToken: null,
    lastRefresh: 0
  };

  private refreshTimer: NodeJS.Timeout | null = null;
  private readonly REFRESH_MARGIN = 5 * 60 * 1000; // 5 minutes before expiry
  private readonly MIN_REFRESH_INTERVAL = 60 * 1000; // Minimum 1 minute between refreshes
  private listeners: Array<(state: SessionState) => void> = [];

  constructor() {
    this.initializeSession();
    this.setupAuthListener();
  }

  /**
   * Initialize session from Supabase
   */
  private async initializeSession(): Promise<void> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        logError('Failed to get initial session', error);
        return;
      }

      if (session) {
        this.updateSessionState(session);
        logDebug('Session initialized', { 
          expiresAt: new Date(session.expires_at! * 1000).toISOString() 
        });
      }
    } catch (error) {
      logError('Session initialization failed', error);
    }
  }

  /**
   * Set up Supabase auth state listener
   */
  private setupAuthListener(): void {
    supabase.auth.onAuthStateChange((event, session) => {
      logDebug('Auth state changed', { event, hasSession: !!session });

      switch (event) {
        case 'SIGNED_IN':
          if (session) {
            this.updateSessionState(session);
            logSecurityEvent('user_signed_in', {
              userId: session.user.id,
              severity: 'low',
              metadata: { email: session.user.email }
            });
          }
          break;

        case 'SIGNED_OUT':
          this.clearSession();
          logSecurityEvent('user_signed_out', {
            severity: 'low',
            metadata: { signOutTime: new Date().toISOString() }
          });
          break;

        case 'TOKEN_REFRESHED':
          if (session) {
            this.updateSessionState(session);
            logDebug('Token refreshed successfully');
          }
          break;

        case 'USER_UPDATED':
          if (session) {
            this.sessionState.user = session.user;
            this.notifyListeners();
          }
          break;
      }
    });
  }

  /**
   * Update session state and schedule refresh
   */
  private updateSessionState(session: {
    user: { id: string; email?: string };
    expires_at?: number;
    refresh_token?: string;
  }): void {
    this.sessionState = {
      isAuthenticated: true,
      user: session.user,
      expiresAt: session.expires_at ? session.expires_at * 1000 : null,
      refreshToken: session.refresh_token,
      lastRefresh: Date.now()
    };

    this.scheduleRefresh();
    this.notifyListeners();
  }

  /**
   * Clear session state
   */
  private clearSession(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    this.sessionState = {
      isAuthenticated: false,
      user: null,
      expiresAt: null,
      refreshToken: null,
      lastRefresh: 0
    };

    this.notifyListeners();
  }

  /**
   * Schedule automatic token refresh
   */
  private scheduleRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!this.sessionState.expiresAt) {
      return;
    }

    const now = Date.now();
    const expiresAt = this.sessionState.expiresAt;
    const refreshAt = expiresAt - this.REFRESH_MARGIN;
    const timeUntilRefresh = refreshAt - now;

    // Don't schedule if already expired or too soon
    if (timeUntilRefresh <= 0) {
      this.refreshSession();
      return;
    }

    logDebug('Scheduling token refresh', {
      refreshIn: Math.round(timeUntilRefresh / 1000),
      refreshAt: new Date(refreshAt).toISOString()
    });

    this.refreshTimer = setTimeout(() => {
      this.refreshSession();
    }, timeUntilRefresh);
  }

  /**
   * Manually refresh the session
   */
  public async refreshSession(): Promise<boolean> {
    const now = Date.now();
    
    // Prevent too frequent refresh attempts
    if (now - this.sessionState.lastRefresh < this.MIN_REFRESH_INTERVAL) {
      logDebug('Refresh throttled');
      return false;
    }

    try {
      logDebug('Refreshing session token');
      
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        logError('Session refresh failed', error);
        
        // If refresh fails, the session might be invalid
        if (error.message?.includes('refresh_token_not_found') || 
            error.message?.includes('invalid_grant')) {
          await this.handleSessionExpiry();
        }
        
        return false;
      }

      if (session) {
        this.updateSessionState(session);
        logDebug('Session refreshed successfully');
        return true;
      }

      return false;
    } catch (error) {
      logError('Session refresh error', error);
      return false;
    }
  }

  /**
   * Handle session expiry
   */
  private async handleSessionExpiry(): Promise<void> {
    logSecurityEvent('session_expired', {
      userId: this.sessionState.user?.id,
      severity: 'medium',
      metadata: {
        lastRefresh: new Date(this.sessionState.lastRefresh).toISOString(),
        expiresAt: this.sessionState.expiresAt ? 
          new Date(this.sessionState.expiresAt).toISOString() : null
      }
    });

    this.clearSession();
    
    // Redirect to auth page if we're in admin area
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/pakize')) {
      window.location.href = '/auth?expired=true';
    }
  }

  /**
   * Get current session state
   */
  public getSessionState(): SessionState {
    return { ...this.sessionState };
  }

  /**
   * Check if session is valid and not expired
   */
  public isSessionValid(): boolean {
    if (!this.sessionState.isAuthenticated || !this.sessionState.expiresAt) {
      return false;
    }

    return Date.now() < this.sessionState.expiresAt;
  }

  /**
   * Get time until session expires
   */
  public getTimeUntilExpiry(): number {
    if (!this.sessionState.expiresAt) {
      return 0;
    }

    return Math.max(0, this.sessionState.expiresAt - Date.now());
  }

  /**
   * Check if session needs refresh soon
   */
  public needsRefreshSoon(): boolean {
    if (!this.sessionState.expiresAt) {
      return false;
    }

    const timeUntilExpiry = this.getTimeUntilExpiry();
    return timeUntilExpiry <= this.REFRESH_MARGIN;
  }

  /**
   * Subscribe to session state changes
   */
  public onSessionChange(listener: (state: SessionState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getSessionState());
      } catch (error) {
        logError('Session listener error', error);
      }
    });
  }

  /**
   * Sign out user
   */
  public async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
      this.clearSession();
    } catch (error) {
      logError('Sign out error', error);
      // Clear session anyway on error
      this.clearSession();
    }
  }

  /**
   * Force session validation check
   */
  public async validateSession(): Promise<boolean> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        logError('Session validation failed', error);
        return false;
      }

      if (!user) {
        this.clearSession();
        return false;
      }

      // Session is valid if we get a user
      return true;
    } catch (error) {
      logError('Session validation error', error);
      return false;
    }
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    this.listeners = [];
  }
}

// Global session manager instance
export const sessionManager = new SessionManager();

// React hook for session state
export function useSession() {
  const [sessionState, setSessionState] = React.useState(sessionManager.getSessionState());

  React.useEffect(() => {
    const unsubscribe = sessionManager.onSessionChange(setSessionState);
    return unsubscribe;
  }, []);

  return {
    ...sessionState,
    isValid: sessionManager.isSessionValid(),
    timeUntilExpiry: sessionManager.getTimeUntilExpiry(),
    needsRefreshSoon: sessionManager.needsRefreshSoon(),
    refreshSession: () => sessionManager.refreshSession(),
    signOut: () => sessionManager.signOut(),
    validateSession: () => sessionManager.validateSession()
  };
}

// For non-React usage
export const getSessionState = () => sessionManager.getSessionState();
export const refreshSession = () => sessionManager.refreshSession();
export const signOut = () => sessionManager.signOut();
export const validateSession = () => sessionManager.validateSession();
