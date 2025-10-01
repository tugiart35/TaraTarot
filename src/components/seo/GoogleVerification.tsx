/**
 * Google Search Console verification component
 * Add this to your layout after getting the verification code from Google Search Console
 */

interface GoogleVerificationProps {
  verificationCode?: string;
}

export function GoogleVerification({ verificationCode }: GoogleVerificationProps) {
  // Only render if verification code is provided
  if (!verificationCode) {
    return null;
  }

  return (
    <meta
      name="google-site-verification"
      content={verificationCode}
    />
  );
}

/**
 * Usage in layout.tsx:
 * 
 * import { GoogleVerification } from '@/components/seo/GoogleVerification';
 * 
 * // In the head section:
 * <GoogleVerification verificationCode="your-google-verification-code" />
 * 
 * Note: Replace "your-google-verification-code" with the actual code from Google Search Console
 */
