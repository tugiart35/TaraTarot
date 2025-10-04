import React, { useState } from 'react';
import { useIsMobile } from '@/lib/responsive/responsive';

interface MobileNavigationProps {
  children: React.ReactNode;
  brand?: React.ReactNode;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  children,
  brand,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Brand */}
          <div className='flex-shrink-0'>{brand}</div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                {children}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <div className='md:hidden'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='touch-target inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {!isOpen ? (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                ) : (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t'>
            {children}
          </div>
        </div>
      )}
    </nav>
  );
};

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  children,
  active = false,
}) => {
  const baseClasses =
    'touch-target block px-3 py-2 rounded-md text-base font-medium';
  const activeClasses = active
    ? 'bg-blue-100 text-blue-700'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';

  return (
    <a href={href} className={`${baseClasses} ${activeClasses}`}>
      {children}
    </a>
  );
};
