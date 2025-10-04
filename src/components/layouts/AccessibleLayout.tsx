import React from 'react';

interface AccessibleLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AccessibleLayout: React.FC<AccessibleLayoutProps> = ({
  children,
  title = 'Tarot Card Reading',
  description = 'Professional tarot card readings and interpretations',
}) => {

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Skip to content link */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50'
        onFocus={e => e.target.classList.remove('sr-only')}
        onBlur={e => e.target.classList.add('sr-only')}
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'
        id='announcements'
      />

      {/* Main content */}
      <main
        id='main-content'
        role='main'
        tabIndex={-1}
        className='container mx-auto px-4 py-8'
        aria-labelledby='page-title'
      >
        <h1 id='page-title' className='sr-only'>
          {title}
        </h1>
        <p className='sr-only'>{description}</p>
        {children}
      </main>
    </div>
  );
};
