/*
 * Admin Lazy Components
 *
 * Bu dosya admin paneli için lazy loading component'lerini içerir.
 * Bundle size'ı optimize eder ve performansı artırır.
 */

import dynamic from 'next/dynamic';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';

// Lazy load heavy admin components
export const AutoReportingLazy = dynamic(() => import('./AutoReporting'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

export const SpreadEditorLazy = dynamic(() => import('./SpreadEditor'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

export const EmailTemplateModalsLazy = dynamic(
  () =>
    import('./EmailTemplateModals').then(mod => ({
      default: mod.AddEmailTemplateModal,
    })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

export const AuditLogViewerLazy = dynamic(() => import('./AuditLogViewer'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

export const AdminUserModalsLazy = dynamic(
  () =>
    import('./AdminUserModals').then(mod => ({
      default: mod.AddAdminUserModal,
    })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

// Modal components lazy loading
export const UserDetailModalLazy = dynamic(() => import('./UserDetailModal'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

export const CreditManagementModalLazy = dynamic(
  () => import('./CreditManagementModal'),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

// History components lazy loading
export const ReadingHistoryLazy = dynamic(() => import('./ReadingHistory'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

export const PaymentHistoryLazy = dynamic(() => import('./PaymentHistory'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

export const TransactionHistoryLazy = dynamic(
  () => import('./TransactionHistory'),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);
