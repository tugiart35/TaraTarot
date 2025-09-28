import type {
  TarotConfig as SchemaTarotConfig,
  TarotTheme as SchemaTarotTheme,
  ValidationKeys as SchemaValidationKeys,
  I18nKeys as SchemaI18nKeys,
  ModalI18nKeys as SchemaModalI18nKeys,
  FormI18nKeys as SchemaFormI18nKeys,
  CanvasI18nKeys as SchemaCanvasI18nKeys,
  CreditKeys as SchemaCreditKeys,
  PersonalInfo as SchemaPersonalInfo,
  Questions as SchemaQuestions,
  FormErrors as SchemaFormErrors,
  ModalStates as SchemaModalStates,
  ReadingData as SchemaReadingData,
} from '../schemas/tarot-config.schema';
import { TarotCard, PositionInfo } from '@/types/tarot';

export type TarotConfig = SchemaTarotConfig;
export type TarotTheme = SchemaTarotTheme;
export type ValidationKeys = SchemaValidationKeys;
export type I18nKeys = SchemaI18nKeys;
export type ModalI18nKeys = SchemaModalI18nKeys;
export type FormI18nKeys = SchemaFormI18nKeys;
export type CanvasI18nKeys = SchemaCanvasI18nKeys;
export type CreditKeys = SchemaCreditKeys;
export type PersonalInfo = SchemaPersonalInfo;
export type Questions = SchemaQuestions;
export type FormErrors = SchemaFormErrors;
export type ModalStates = SchemaModalStates;
export type ReadingData = SchemaReadingData;

/**
 * Tarot okuma hook props tipi
 */
export interface UseTarotReadingProps {
  config: {
    cardCount: number;
    positionsInfo: readonly PositionInfo[];
  };
  onComplete?: (cards: TarotCard[], interpretation: string) => void;
  onPositionChange?: (title: string) => void;
}

/**
 * Tarot okuma hook return tipi
 */
export interface UseTarotReadingReturn {
  selectedCards: (TarotCard | null)[];
  usedCardIds: Set<number>;
  showCardDetails: TarotCard | null;
  cardStates: boolean[];
  isReversed: boolean[];
  deck: TarotCard[];
  currentPosition: number;
  userQuestion: string;
  selectedReadingType: string | null;
  interpretationRef: React.RefObject<HTMLDivElement>;
  handleCardSelect: (card: TarotCard) => void;
  handleCardDetails: (card: TarotCard) => void;
  setShowCardDetails: React.Dispatch<React.SetStateAction<TarotCard | null>>;
  toggleCardState: (positionId: number) => void;
  handleClearAll: () => void;
  shuffleDeck: () => void;
  setSelectedReadingType: React.Dispatch<React.SetStateAction<string | null>>;
  setUserQuestion: React.Dispatch<React.SetStateAction<string>>;
}
