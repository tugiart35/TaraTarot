import React, { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

export const ScreenReaderAnnouncement: React.FC<
  ScreenReaderAnnouncementProps
> = ({ message, priority = 'polite' }) => {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announcementRef.current && message) {
      announcementRef.current.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  }, [message]);

  return (
    <div
      ref={announcementRef}
      aria-live={priority}
      aria-atomic='true'
      className='sr-only'
    />
  );
};

// Hook for screen reader announcements
export const useScreenReaderAnnouncement = () => {
  const [announcement, setAnnouncement] = React.useState('');
  const [priority, setPriority] = React.useState<'polite' | 'assertive'>(
    'polite'
  );

  const announce = (
    message: string,
    announcementPriority: 'polite' | 'assertive' = 'polite'
  ) => {
    setPriority(announcementPriority);
    setAnnouncement(message);
  };

  return { announce, announcement, priority };
};
