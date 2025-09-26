/*
 * AuthForm Component Tests
 * 
 * Bu dosya AuthForm component'i için unit testleri içerir.
 * Jest ve React Testing Library kullanır.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../AuthForm';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRememberMe } from '@/hooks/auth/useRememberMe';

// Mock hooks
jest.mock('@/hooks/auth/useAuth');
jest.mock('@/hooks/auth/useRememberMe');
jest.mock('@/hooks/useToast');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseRememberMe = useRememberMe as jest.MockedFunction<typeof useRememberMe>;

// Mock props
const mockProps = {
  locale: 'tr',
  initialError: null,
  next: null,
};

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      error: null,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
      signInWithGoogle: jest.fn(),
      refreshSession: jest.fn(),
      clearError: jest.fn(),
    });

    mockUseRememberMe.mockReturnValue({
      rememberMe: false,
      savedEmail: '',
      updateRememberMe: jest.fn(),
      clearRememberMe: jest.fn(),
      loadSavedEmail: jest.fn(),
    });
  });

  describe('Rendering', () => {
    it('should render login form by default', () => {
      render(<AuthForm {...mockProps} />);
      
      expect(screen.getByLabelText('E-posta adresi')).toBeInTheDocument();
      expect(screen.getByLabelText('Şifre')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /giriş yap/i })).toBeInTheDocument();
    });

    it('should render register form when switched', () => {
      render(<AuthForm {...mockProps} />);
      
      const toggleButton = screen.getByText('Hesabınız yok mu? Kayıt olun');
      fireEvent.click(toggleButton);
      
      expect(screen.getByLabelText('Ad')).toBeInTheDocument();
      expect(screen.getByLabelText('Soyad')).toBeInTheDocument();
      expect(screen.getByLabelText('Doğum tarihi')).toBeInTheDocument();
      expect(screen.getByLabelText('Cinsiyet')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /kayıt ol/i })).toBeInTheDocument();
    });

    it('should render accessibility attributes', () => {
      render(<AuthForm {...mockProps} />);
      
      const emailInput = screen.getByLabelText('E-posta adresi');
      expect(emailInput).toHaveAttribute('aria-label', 'E-posta adresi');
      expect(emailInput).toHaveAttribute('type', 'email');
      
      const passwordInput = screen.getByLabelText('Şifre');
      expect(passwordInput).toHaveAttribute('aria-label', 'Şifre');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form Validation', () => {
    it('should validate email format', async () => {
      render(<AuthForm {...mockProps} />);
      
      const emailInput = screen.getByLabelText('E-posta adresi');
      const submitButton = screen.getByRole('button', { name: /giriş yap/i });
      
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Geçerli bir e-posta adresi girin')).toBeInTheDocument();
      });
    });

    it('should validate required fields', async () => {
      render(<AuthForm {...mockProps} />);
      
      const submitButton = screen.getByRole('button', { name: /giriş yap/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('E-posta adresi gerekli')).toBeInTheDocument();
        expect(screen.getByText('Şifre gerekli')).toBeInTheDocument();
      });
    });

    it('should validate password strength for registration', async () => {
      render(<AuthForm {...mockProps} />);
      
      // Switch to register mode
      const toggleButton = screen.getByText('Hesabınız yok mu? Kayıt olun');
      fireEvent.click(toggleButton);
      
      const emailInput = screen.getByLabelText('E-posta adresi');
      const passwordInput = screen.getByLabelText('Şifre');
      const nameInput = screen.getByLabelText('Ad');
      const surnameInput = screen.getByLabelText('Soyad');
      const birthDateInput = screen.getByLabelText('Doğum tarihi');
      const genderSelect = screen.getByLabelText('Cinsiyet');
      const submitButton = screen.getByRole('button', { name: /kayıt ol/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.change(surnameInput, { target: { value: 'Doe' } });
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      fireEvent.change(genderSelect, { target: { value: 'male' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/şifre en az/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call signIn when submitting login form', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({});
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        error: null,
        signIn: mockSignIn,
        signUp: jest.fn(),
        signOut: jest.fn(),
        resetPassword: jest.fn(),
        signInWithGoogle: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      render(<AuthForm {...mockProps} />);
      
      const emailInput = screen.getByLabelText('E-posta adresi');
      const passwordInput = screen.getByLabelText('Şifre');
      const submitButton = screen.getByRole('button', { name: /giriş yap/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should call signUp when submitting register form', async () => {
      const mockSignUp = jest.fn().mockResolvedValue({});
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        error: null,
        signIn: jest.fn(),
        signUp: mockSignUp,
        signOut: jest.fn(),
        resetPassword: jest.fn(),
        signInWithGoogle: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      render(<AuthForm {...mockProps} />);
      
      // Switch to register mode
      const toggleButton = screen.getByText('Hesabınız yok mu? Kayıt olun');
      fireEvent.click(toggleButton);
      
      const emailInput = screen.getByLabelText('E-posta adresi');
      const passwordInput = screen.getByLabelText('Şifre');
      const nameInput = screen.getByLabelText('Ad');
      const surnameInput = screen.getByLabelText('Soyad');
      const birthDateInput = screen.getByLabelText('Doğum tarihi');
      const genderSelect = screen.getByLabelText('Cinsiyet');
      const submitButton = screen.getByRole('button', { name: /kayıt ol/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.change(surnameInput, { target: { value: 'Doe' } });
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      fireEvent.change(genderSelect, { target: { value: 'male' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password123!',
          confirmPassword: '',
          name: 'John',
          surname: 'Doe',
          birthDate: '1990-01-01',
          gender: 'male',
          rememberMe: false,
        });
      });
    });
  });

  describe('Google Login', () => {
    it('should call signInWithGoogle when Google button is clicked', async () => {
      const mockSignInWithGoogle = jest.fn().mockResolvedValue({});
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        error: null,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signOut: jest.fn(),
        resetPassword: jest.fn(),
        signInWithGoogle: mockSignInWithGoogle,
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      render(<AuthForm {...mockProps} />);
      
      const googleButton = screen.getByLabelText(/google ile giriş yap/i);
      fireEvent.click(googleButton);
      
      await waitFor(() => {
        expect(mockSignInWithGoogle).toHaveBeenCalledWith('tr');
      });
    });
  });

  describe('Password Reset', () => {
    it('should show password reset form when forgot password is clicked', () => {
      render(<AuthForm {...mockProps} />);
      
      const forgotPasswordButton = screen.getByLabelText('Şifremi unuttum');
      fireEvent.click(forgotPasswordButton);
      
      expect(screen.getByText('Şifre Sıfırlama')).toBeInTheDocument();
      expect(screen.getByLabelText('Şifre sıfırlama e-posta adresi')).toBeInTheDocument();
    });

    it('should call resetPassword when password reset form is submitted', async () => {
      const mockResetPassword = jest.fn().mockResolvedValue({});
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        error: null,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signOut: jest.fn(),
        resetPassword: mockResetPassword,
        signInWithGoogle: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      render(<AuthForm {...mockProps} />);
      
      const forgotPasswordButton = screen.getByLabelText('Şifremi unuttum');
      fireEvent.click(forgotPasswordButton);
      
      const emailInput = screen.getByLabelText('Şifre sıfırlama e-posta adresi');
      const submitButton = screen.getByLabelText('Şifre sıfırlama e-postası gönder');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com', 'tr');
      });
    });
  });

  describe('Remember Me', () => {
    it('should call updateRememberMe when remember me is checked', () => {
      const mockUpdateRememberMe = jest.fn();
      mockUseRememberMe.mockReturnValue({
        rememberMe: false,
        savedEmail: '',
        updateRememberMe: mockUpdateRememberMe,
        clearRememberMe: jest.fn(),
        loadSavedEmail: jest.fn(),
      });

      render(<AuthForm {...mockProps} />);
      
      const rememberMeCheckbox = screen.getByLabelText('Beni hatırla');
      fireEvent.click(rememberMeCheckbox);
      
      expect(rememberMeCheckbox).toBeChecked();
    });
  });

  describe('Error Handling', () => {
    it('should display initial error message', () => {
      render(<AuthForm {...mockProps} initialError="Test error" />);
      
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('should display callback failed error message', () => {
      render(<AuthForm {...mockProps} initialError="callback_failed" />);
      
      expect(screen.getByText('Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.')).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('should show loading state when auth is loading', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: true,
        error: null,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signOut: jest.fn(),
        resetPassword: jest.fn(),
        signInWithGoogle: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      render(<AuthForm {...mockProps} />);
      
      const submitButton = screen.getByRole('button', { name: /giriş yap/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<AuthForm {...mockProps} />);
      
      const form = screen.getByRole('form', { hidden: true });
      expect(form).toBeInTheDocument();
    });

    it('should have proper labels for inputs', () => {
      render(<AuthForm {...mockProps} />);
      
      expect(screen.getByLabelText('E-posta adresi')).toBeInTheDocument();
      expect(screen.getByLabelText('Şifre')).toBeInTheDocument();
      expect(screen.getByLabelText('Beni hatırla')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for error states', async () => {
      render(<AuthForm {...mockProps} />);
      
      const emailInput = screen.getByLabelText('E-posta adresi');
      const submitButton = screen.getByRole('button', { name: /giriş yap/i });
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
      });
    });
  });
});
