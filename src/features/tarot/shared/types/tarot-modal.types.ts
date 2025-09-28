import { ReactNode } from 'react';

export type TarotTheme =
  | 'blue'
  | 'pink'
  | 'purple'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red';

export interface ThemeClasses {
  border: string;
  headerBorder: string;
  iconBg: string;
  iconText: string;
  titleText: string;
  labelText: string;
  inputBorder: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  focusRing: string;
  sectionBorder: string;
}

export interface BaseTarotModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: TarotTheme;
  icon: string;
  titleKey: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface ModalContent {
  title: string;
  description: string;
  steps?: Array<{
    title: string;
    description: string;
  }>;
  additionalInfo?: string;
}
