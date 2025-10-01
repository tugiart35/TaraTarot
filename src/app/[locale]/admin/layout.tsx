// Add ScreenReaderProvider to admin layout
import { ScreenReaderProvider } from '@/components/accessibility/ScreenReaderAnnouncements';

// Wrap the admin content
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScreenReaderProvider>
      {/* Existing admin layout content */}
      {children}
    </ScreenReaderProvider>
  );
}