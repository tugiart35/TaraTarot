/*
 * SimpleAdminLogin Component Tests
 *
 * Bu dosya SimpleAdminLogin component'i için unit testleri içerir.
 * Jest ve React Testing Library kullanır.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimpleAdminLogin from '../SimpleAdminLogin';

// Mock props
const mockProps = {
  onLogin: jest.fn(),
};

describe('SimpleAdminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render login form elements', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/şifre/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /giriş/i })
      ).toBeInTheDocument();
    });

    it('should render accessibility attributes', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');

      const passwordInput = screen.getByLabelText(/şifre/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
    });
  });

  describe('Form Interaction', () => {
    it('should update email input value', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });

      expect(emailInput).toHaveValue('admin@test.com');
    });

    it('should update password input value', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const passwordInput = screen.getByLabelText(/şifre/i);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(passwordInput).toHaveValue('password123');
    });

    it('should show loading state when form is submitted', async () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);
      const submitButton = screen.getByRole('button', { name: /giriş/i });

      fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Form Validation', () => {
    it('should disable submit button when form is empty', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const submitButton = screen.getByRole('button', { name: /giriş/i });
      expect(submitButton).toBeDisabled();
    });

    it('should enable submit button when form is filled', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);
      const submitButton = screen.getByRole('button', { name: /giriş/i });

      fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(submitButton).not.toBeDisabled();
    });

    it('should validate email format', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: /giriş/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when login fails', async () => {
      const mockOnLogin = jest
        .fn()
        .mockRejectedValue(new Error('Login failed'));

      render(<SimpleAdminLogin onLogin={mockOnLogin} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);
      const submitButton = screen.getByRole('button', { name: /giriş/i });

      fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/giriş başarısız/i)).toBeInTheDocument();
      });
    });

    it('should clear error message when form is modified', async () => {
      const mockOnLogin = jest
        .fn()
        .mockRejectedValue(new Error('Login failed'));

      render(<SimpleAdminLogin onLogin={mockOnLogin} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);
      const submitButton = screen.getByRole('button', { name: /giriş/i });

      // First, trigger an error
      fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/giriş başarısız/i)).toBeInTheDocument();
      });

      // Then modify the form
      fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

      // Error should be cleared
      expect(screen.queryByText(/giriş başarısız/i)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('should have proper labels for inputs', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      render(<SimpleAdminLogin {...mockProps} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/şifre/i);
      const submitButton = screen.getByRole('button', { name: /giriş/i });

      emailInput.focus();
      expect(emailInput).toHaveFocus();

      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(passwordInput).toHaveFocus();

      fireEvent.keyDown(passwordInput, { key: 'Tab' });
      expect(submitButton).toHaveFocus();
    });
  });
});
