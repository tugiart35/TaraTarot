/*
 * UserDetailModal Component Tests
 * 
 * Bu dosya UserDetailModal component'i için unit testleri içerir.
 * Jest ve React Testing Library kullanır.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDetailModal from '../UserDetailModal';
import { AdminUser } from '@/types/admin.types';

// Mock user data
const mockUser: AdminUser = {
  id: 'test-user-123',
  email: 'test@example.com',
  display_name: 'Test User',
  credit_balance: 100,
  created_at: '2024-01-01T00:00:00Z',
  last_sign_in_at: '2024-01-15T10:30:00Z',
  status: 'active',
  is_admin: false,
};

// Mock props
const mockProps = {
  user: mockUser,
  isOpen: true,
  onClose: jest.fn(),
};

describe('UserDetailModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render user information correctly', () => {
      render(<UserDetailModal {...mockProps} />);
      
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument(); // credit balance
    });

    it('should render accessibility attributes', () => {
      render(<UserDetailModal {...mockProps} />);
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'user-detail-title');
      expect(modal).toHaveAttribute('aria-describedby', 'user-detail-description');
    });

    it('should render tab navigation with proper ARIA attributes', () => {
      render(<UserDetailModal {...mockProps} />);
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Kullanıcı detay sekmeleri');
      
      const overviewTab = screen.getByRole('tab', { name: /genel bakış/i });
      expect(overviewTab).toHaveAttribute('aria-selected', 'true');
      expect(overviewTab).toHaveAttribute('aria-controls', 'overview-panel');
    });

    it('should render close button with accessibility attributes', () => {
      render(<UserDetailModal {...mockProps} />);
      
      const closeButton = screen.getByLabelText("Modal'ı kapat");
      expect(closeButton).toHaveAttribute('title', "Modal'ı kapat");
    });
  });

  describe('User Interaction', () => {
    it('should call onClose when close button is clicked', () => {
      render(<UserDetailModal {...mockProps} />);
      
      const closeButton = screen.getByLabelText("Modal'ı kapat");
      fireEvent.click(closeButton);
      
      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('should switch tabs when tab buttons are clicked', () => {
      render(<UserDetailModal {...mockProps} />);
      
      const transactionsTab = screen.getByRole('tab', { name: /işlem geçmişi/i });
      fireEvent.click(transactionsTab);
      
      expect(transactionsTab).toHaveAttribute('aria-selected', 'true');
    });

    it('should close modal when backdrop is clicked', () => {
      render(<UserDetailModal {...mockProps} />);
      
      const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/70');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('User Status Display', () => {
    it('should display active status correctly', () => {
      render(<UserDetailModal {...mockProps} />);
      expect(screen.getByText('🟢 Aktif')).toBeInTheDocument();
    });

    it('should display suspended status correctly', () => {
      const suspendedUser = { ...mockUser, status: 'suspended' };
      render(<UserDetailModal {...mockProps} user={suspendedUser} />);
      expect(screen.getByText('🔴 Askıya Alınmış')).toBeInTheDocument();
    });

    it('should handle user without display name', () => {
      const userWithoutName = { ...mockUser, display_name: null };
      render(<UserDetailModal {...mockProps} user={userWithoutName} />);
      expect(screen.getByText('İsimsiz Kullanıcı')).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('should format dates correctly', () => {
      render(<UserDetailModal {...mockProps} />);
      
      // Check if formatted date appears in the document
      const createdAtElement = screen.getByText(/01\.01\.2024/);
      expect(createdAtElement).toBeInTheDocument();
    });
  });

  describe('Modal Visibility', () => {
    it('should not render when isOpen is false', () => {
      render(<UserDetailModal {...mockProps} isOpen={false} />);
      
      const modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(<UserDetailModal {...mockProps} isOpen={true} />);
      
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });
  });
});
