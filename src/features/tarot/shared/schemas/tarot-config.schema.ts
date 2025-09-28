import { z } from 'zod';

/**
 * Zod şeması: Pozisyon bilgisi
 */
export const PositionInfoSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  desc: z.string().min(1),
  description: z.string().min(1),
});

/**
 * Zod şeması: Pozisyon layout
 */
export const PositionLayoutSchema = z.object({
  id: z.number().min(1),
  className: z.string().min(1),
  x: z.number().optional(),
  y: z.number().optional(),
});

/**
 * Zod şeması: Tema renkleri
 */
export const TarotThemeSchema = z.enum([
  'blue',
  'pink',
  'purple',
  'green',
  'yellow',
  'orange',
  'red',
]);

/**
 * Zod şeması: Form yer tutucuları
 */
export const FormPlaceholdersSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
  concernQuestion: z.string().min(1).optional(),
  understandingQuestion: z.string().min(1).optional(),
  emotionalQuestion: z.string().min(1).optional(),
});

/**
 * Zod şeması: Form i18n anahtarları
 */
export const FormI18nKeysSchema = z.object({
  personalInfo: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthDate: z.string().min(1),
  email: z.string().min(1),
  communicationMethod: z.string().min(1),
  emailCommunication: z.string().min(1),
  whatsappCommunication: z.string().min(1),
  questions: z.string().min(1),
  concernQuestion: z.string().min(1),
  understandingQuestion: z.string().min(1),
  emotionalQuestion: z.string().min(1),
  saving: z.string().min(1),
  saveAndOpen: z.string().min(1),
  clearAll: z.string().min(1).optional(),
  placeholders: FormPlaceholdersSchema.optional(),
});

/**
 * Zod şeması: Canvas i18n anahtarları
 */
export const CanvasI18nKeysSchema = z.object({
  selectReadingTitle: z.string().min(1),
  selectReadingDescription: z.string().min(1),
  lockedTitle: z.string().min(1),
  lockedDescription: z.string().min(1),
});

/**
 * Zod şeması: Kredi anahtarları
 */
export const CreditKeysSchema = z.object({
  detailed: z.string().min(1),
  written: z.string().min(1),
});

/**
 * Zod şeması: Validation anahtarları
 */
export const ValidationKeysSchema = z.object({
  nameMinLength: z.string().min(1),
  surnameMinLength: z.string().min(1),
  birthDateRequired: z.string().min(1),
  emailInvalid: z.string().min(1),
  questionMinLength: z.string().min(1),
});

/**
 * Zod şeması: Modal i18n anahtarları
 */
export const ModalI18nKeysSchema = z.object({
  infoTitle: z.string().min(1),
  aboutSpread: z.string().min(1),
  aboutSpreadText: z.string().min(1),
  cardCount: z.string().min(1),
  loveAttentionInfo: z.string().min(1),
  loveAttention: z.string().min(1),
  cardCountText: z.string().min(1),
  detailedReading: z.string().min(1),
  detailedReadingText: z.string().min(1),
  writtenReading: z.string().min(1),
  writtenReadingText: z.string().min(1),
  process: z.string().min(1),
  step1: z.string().min(1),
  step2: z.string().min(1),
  step3: z.string().min(1),
  step4: z.string().min(1),
  cancel: z.string().min(1),
  continue: z.string().min(1),
  creditConfirm: z.string().min(1),
  creditConfirmMessage: z.string().min(1),
  processing: z.string().min(1),
  confirm: z.string().min(1),
  savingReading: z.string().min(1),
  saveReading: z.string().min(1),
  successTitle: z.string().min(1),
  successMessage: z.string().min(1),
  redirecting: z.string().min(1),
});

/**
 * Zod şeması: i18n anahtarları
 */
export const I18nKeysSchema = z.object({
  modals: ModalI18nKeysSchema,
  form: FormI18nKeysSchema,
  canvas: CanvasI18nKeysSchema,
});

/**
 * Zod şeması: Tarot konfigürasyonu
 */
export const TarotConfigSchema = z.object({
  spreadId: z.string().min(1),
  translationNamespace: z.string().min(1),
  summaryKey: z.string().min(1),
  cardCount: z.number().min(1),
  positionsInfo: z.array(PositionInfoSchema).min(1),
  positionsLayout: z.array(PositionLayoutSchema).min(1),
  theme: TarotThemeSchema,
  icon: z.string().min(1),
  backgroundImage: z.string().min(1),
  backgroundAlt: z.string().min(1),
  readingType: z.string().min(1),
  supabaseReadingType: z.string().min(1),
  creditKeyPrefix: z.string().min(1),
  creditKeys: CreditKeysSchema,
  validationKeys: ValidationKeysSchema,
  i18nKeys: I18nKeysSchema,
});

/**
 * Zod şeması: Kişisel bilgi
 */
export const PersonalInfoSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  birthDate: z.string().min(1),
  email: z.string().email(),
});

/**
 * Zod şeması: Sorular
 */
export const QuestionsSchema = z.object({
  concern: z.string().min(1),
  understanding: z.string().min(1),
  emotional: z.string().min(1),
});

/**
 * Zod şeması: Form hataları
 */
export const FormErrorsSchema = z.object({
  name: z.string(),
  surname: z.string(),
  birthDate: z.string(),
  email: z.string(),
  concern: z.string(),
  understanding: z.string(),
  emotional: z.string(),
  general: z.string(),
});

/**
 * Zod şeması: Modal durumları
 */
export const ModalStatesSchema = z.object({
  isSaving: z.boolean(),
  showCreditConfirm: z.boolean(),
  detailedFormSaved: z.boolean(),
  showInfoModal: z.boolean(),
  isSavingReading: z.boolean(),
  showSuccessModal: z.boolean(),
});

/**
 * Zod şeması: Okuma verisi
 */
export const ReadingDataSchema = z.object({
  userId: z.string().min(1),
  readingType: z.string().min(1),
  status: z.enum(['completed', 'in_progress', 'failed']),
  title: z.string().min(1),
  interpretation: z.string().min(1),
  cards: z.array(z.any()),
  personalInfo: PersonalInfoSchema.optional(),
  questions: QuestionsSchema.optional(),
  timestamp: z.date(),
  duration: z.number().optional(),
});

// Tip çıkarımları
export type TarotConfig = z.infer<typeof TarotConfigSchema>;
export type TarotTheme = z.infer<typeof TarotThemeSchema>;
export type ValidationKeys = z.infer<typeof ValidationKeysSchema>;
export type I18nKeys = z.infer<typeof I18nKeysSchema>;
export type ModalI18nKeys = z.infer<typeof ModalI18nKeysSchema>;
export type FormI18nKeys = z.infer<typeof FormI18nKeysSchema>;
export type CanvasI18nKeys = z.infer<typeof CanvasI18nKeysSchema>;
export type CreditKeys = z.infer<typeof CreditKeysSchema>;
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type Questions = z.infer<typeof QuestionsSchema>;
export type FormErrors = z.infer<typeof FormErrorsSchema>;
export type ModalStates = z.infer<typeof ModalStatesSchema>;
export type ReadingData = z.infer<typeof ReadingDataSchema>;
export type FormPlaceholders = z.infer<typeof FormPlaceholdersSchema>;
