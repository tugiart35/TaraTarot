/*
 * Auth Accessibility Utilities
 *
 * Bu dosya authentication işlemleri için accessibility özelliklerini içerir.
 * Screen reader desteği, keyboard navigation ve ARIA attributes sağlar.
 */

export interface AccessibilityConfig {
  announceErrors: boolean;
  announceSuccess: boolean;
  provideKeyboardShortcuts: boolean;
  highContrast: boolean;
}

export class AuthAccessibility {
  private static readonly DEFAULT_CONFIG: AccessibilityConfig = {
    announceErrors: true,
    announceSuccess: true,
    provideKeyboardShortcuts: true,
    highContrast: false,
  };

  /**
   * Error'ı screen reader'a duyur
   */
  static announceError(error: string, context: string = 'auth'): void {
    if (typeof window === 'undefined') {
      return;
    }

    const announcement = `Error: ${error}`;
    this.createAriaLiveRegion(announcement, 'assertive');
  }

  /**
   * Success mesajını screen reader'a duyur
   */
  static announceSuccess(message: string, context: string = 'auth'): void {
    if (typeof window === 'undefined') {
      return;
    }

    const announcement = `Success: ${message}`;
    this.createAriaLiveRegion(announcement, 'polite');
  }

  /**
   * ARIA live region oluştur
   */
  private static createAriaLiveRegion(
    message: string,
    politeness: 'polite' | 'assertive'
  ): void {
    const existingRegion = document.getElementById('auth-aria-live');
    if (existingRegion) {
      existingRegion.remove();
    }

    const liveRegion = document.createElement('div');
    liveRegion.id = 'auth-aria-live';
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    liveRegion.textContent = message;

    document.body.appendChild(liveRegion);

    // Clean up after announcement
    setTimeout(() => {
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    }, 1000);
  }

  /**
   * Keyboard shortcuts sağla
   */
  static provideKeyboardShortcuts(): Record<string, string> {
    return {
      Enter: 'Submit form',
      Escape: 'Close modal or cancel operation',
      Tab: 'Navigate to next field',
      'Shift+Tab': 'Navigate to previous field',
      'Ctrl+Enter': 'Submit form (alternative)',
      'Alt+A': 'Focus on email field',
      'Alt+P': 'Focus on password field',
      'Alt+S': 'Submit form',
      'Alt+R': 'Reset form',
    };
  }

  /**
   * Form field için accessibility attributes
   */
  static getFieldAttributes(
    fieldName: string,
    hasError: boolean = false
  ): Record<string, string> {
    const baseAttributes: Record<string, string> = {
      'aria-label': this.getFieldLabel(fieldName),
      'aria-required': 'true',
      role: 'textbox',
    };

    if (hasError) {
      baseAttributes['aria-invalid'] = 'true';
      baseAttributes['aria-describedby'] = `${fieldName}-error`;
    }

    return baseAttributes;
  }

  /**
   * Field label'ları
   */
  private static getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      firstName: 'First name',
      lastName: 'Last name',
      rememberMe: 'Remember me checkbox',
    };

    return labels[fieldName] || fieldName;
  }

  /**
   * Button için accessibility attributes
   */
  static getButtonAttributes(
    buttonType: 'submit' | 'cancel' | 'reset' | 'oauth',
    isLoading: boolean = false
  ): Record<string, string> {
    const baseAttributes: Record<string, string> = {
      role: 'button',
      tabindex: '0',
    };

    if (isLoading) {
      baseAttributes['aria-busy'] = 'true';
      baseAttributes['aria-label'] = 'Loading, please wait';
    }

    switch (buttonType) {
      case 'submit':
        baseAttributes['aria-label'] = 'Submit form';
        break;
      case 'cancel':
        baseAttributes['aria-label'] = 'Cancel operation';
        break;
      case 'reset':
        baseAttributes['aria-label'] = 'Reset form';
        break;
      case 'oauth':
        baseAttributes['aria-label'] = 'Sign in with Google';
        break;
    }

    return baseAttributes;
  }

  /**
   * Form için accessibility attributes
   */
  static getFormAttributes(
    formType: 'login' | 'register' | 'reset'
  ): Record<string, string> {
    const formLabels: Record<string, string> = {
      login: 'Sign in form',
      register: 'Sign up form',
      reset: 'Password reset form',
    };

    return {
      role: 'form',
      'aria-label': formLabels[formType],
      'aria-live': 'polite',
    };
  }

  /**
   * Error message için accessibility attributes
   */
  static getErrorAttributes(errorId: string): Record<string, string> {
    return {
      id: errorId,
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': 'true',
    };
  }

  /**
   * Loading state için accessibility attributes
   */
  static getLoadingAttributes(
    loadingText: string = 'Loading'
  ): Record<string, string> {
    return {
      role: 'status',
      'aria-live': 'polite',
      'aria-label': loadingText,
    };
  }

  /**
   * OAuth button için accessibility attributes
   */
  static getOAuthButtonAttributes(provider: string): Record<string, string> {
    return {
      role: 'button',
      'aria-label': `Sign in with ${provider}`,
      tabindex: '0',
    };
  }

  /**
   * Form validation için accessibility feedback
   */
  static announceValidationError(
    fieldName: string,
    errorMessage: string
  ): void {
    const announcement = `${fieldName} field error: ${errorMessage}`;
    this.announceError(announcement, 'validation');
  }

  /**
   * Form submission için accessibility feedback
   */
  static announceFormSubmission(
    status: 'success' | 'error',
    message: string
  ): void {
    if (status === 'success') {
      this.announceSuccess(message, 'submission');
    } else {
      this.announceError(message, 'submission');
    }
  }

  /**
   * High contrast mode kontrolü
   */
  static isHighContrastMode(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return (
      window.matchMedia('(prefers-contrast: high)').matches ||
      window.matchMedia('(prefers-contrast: more)').matches
    );
  }

  /**
   * Reduced motion kontrolü
   */
  static isReducedMotion(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Accessibility configuration'ı güncelle
   */
  static updateAccessibilityConfig(config: Partial<AccessibilityConfig>): void {
    Object.assign(AuthAccessibility.DEFAULT_CONFIG, config);
  }

  /**
   * Keyboard event handler'ı
   */
  static handleKeyboardNavigation(event: KeyboardEvent): boolean {
    const { key, ctrlKey, altKey, shiftKey } = event;

    // Alt + key combinations
    if (altKey && !ctrlKey && !shiftKey) {
      switch (key.toLowerCase()) {
        case 'a':
          this.focusField('email');
          return true;
        case 'p':
          this.focusField('password');
          return true;
        case 's':
          this.submitForm();
          return true;
        case 'r':
          this.resetForm();
          return true;
      }
    }

    // Escape key
    if (key === 'Escape') {
      this.cancelOperation();
      return true;
    }

    return false;
  }

  /**
   * Field'a focus yap
   */
  private static focusField(fieldName: string): void {
    const field = document.querySelector(
      `[name="${fieldName}"], [id="${fieldName}"]`
    ) as HTMLElement;
    if (field) {
      field.focus();
    }
  }

  /**
   * Form'u submit et
   */
  private static submitForm(): void {
    const form = document.querySelector('form[role="form"]') as HTMLFormElement;
    if (form) {
      const submitButton = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      if (submitButton) {
        submitButton.click();
      }
    }
  }

  /**
   * Form'u reset et
   */
  private static resetForm(): void {
    const form = document.querySelector('form[role="form"]') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  }

  /**
   * İşlemi iptal et
   */
  private static cancelOperation(): void {
    const cancelButton = document.querySelector(
      'button[aria-label*="Cancel"]'
    ) as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }
}
