'use client';

import { useCallback, useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/lib/supabase/client';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import type { ReadingType as CreditReadingType } from '@/lib/constants/reading-credits';
import { READING_TYPES } from '@/types/tarot';
import type { TarotConfig } from '../types/tarot-config.types';
import type { UseTarotFormStateReturn } from './useTarotFormState';

export interface SaveReadingPayload {
  readingType: string;
  title: string;
  interpretation: string;
  cards: Record<string, unknown>;
  questions?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
  status?: 'completed' | 'in_progress' | 'failed';
  idempotencyKey?: string;
}

export interface SaveReadingResult {
  success: boolean;
  error?: string;
  recordId?: string;
  costCredits: number;
}

export interface UseTarotSaveStateProps {
  config: TarotConfig;
  selectedReadingType: string | null;
  setSelectedReadingType: (type: string | null) => void;
  formState: Pick<
    UseTarotFormStateReturn,
    | 'validateDetailedForm'
    | 'setModalStates'
    | 'setSaving'
    | 'setDetailedFormSaved'
    | 'setSavingReading'
    | 'modalStates'
  >;
}

export interface UseTarotSaveStateReturn {
  requestDetailedFormSave: () => boolean;
  cancelDetailedFormSave: () => void;
  confirmDetailedFormSave: () => Promise<{
    success: boolean;
    reason?: 'auth' | 'credits';
  }>;
  saveReading: (payload: SaveReadingPayload) => Promise<SaveReadingResult>;
  detailedCredits: ReturnType<typeof useReadingCredits>;
  writtenCredits: ReturnType<typeof useReadingCredits>;
}

const buildDefaultIdempotencyKey = (userId: string, readingType: string) =>
  `reading_${userId}_${readingType}_${Date.now()}`;

const resolveCreditKey = (key: string): CreditReadingType =>
  key as CreditReadingType;

export function useTarotSaveState({
  config,
  selectedReadingType,
  setSelectedReadingType,
  formState,
}: UseTarotSaveStateProps): UseTarotSaveStateReturn {
  const { user } = useAuth();
  const { t } = useTranslations();

  const detailedCredits = useReadingCredits(
    resolveCreditKey(config.creditKeys.detailed)
  );
  const writtenCredits = useReadingCredits(
    resolveCreditKey(config.creditKeys.written)
  );

  const requestDetailedFormSave = useCallback(() => {
    const isValid = formState.validateDetailedForm();
    if (!isValid) {
      return false;
    }

    formState.setModalStates(prev => ({ ...prev, showCreditConfirm: true }));
    return true;
  }, [formState]);

  const cancelDetailedFormSave = useCallback(() => {
    formState.setModalStates(prev => ({ ...prev, showCreditConfirm: false }));
  }, [formState]);

  const confirmDetailedFormSave = useCallback(async () => {
    if (!user) {
      formState.setModalStates(prev => ({ ...prev, showCreditConfirm: false }));
      setSelectedReadingType(null);
      return { success: false, reason: 'auth' as const };
    }

    const hasCredits =
      selectedReadingType === READING_TYPES.DETAILED
        ? detailedCredits.creditStatus.hasEnoughCredits
        : selectedReadingType === READING_TYPES.WRITTEN
          ? writtenCredits.creditStatus.hasEnoughCredits
          : true;

    if (!hasCredits) {
      formState.setModalStates(prev => ({ ...prev, showCreditConfirm: false }));
      return { success: false, reason: 'credits' as const };
    }

    formState.setSaving(true);
    try {
      formState.setDetailedFormSaved(true);
      formState.setModalStates(prev => ({ ...prev, showCreditConfirm: false }));
      return { success: true };
    } finally {
      formState.setSaving(false);
    }
  }, [
    detailedCredits.creditStatus.hasEnoughCredits,
    formState,
    selectedReadingType,
    setSelectedReadingType,
    user,
    writtenCredits.creditStatus.hasEnoughCredits,
  ]);

  const costCredits = useMemo(() => {
    if (selectedReadingType === READING_TYPES.DETAILED) {
      return detailedCredits.creditStatus.requiredCredits;
    }

    if (selectedReadingType === READING_TYPES.WRITTEN) {
      return writtenCredits.creditStatus.requiredCredits;
    }

    return 0;
  }, [
    detailedCredits.creditStatus.requiredCredits,
    selectedReadingType,
    writtenCredits.creditStatus.requiredCredits,
  ]);

  const saveReading = useCallback(
    async (payload: SaveReadingPayload) => {
      formState.setSavingReading(true);

      if (!user) {
        formState.setSavingReading(false);
        return {
          success: false,
          error: t('auth.messages.loginRequired', 'Lütfen giriş yapın.'),
          costCredits,
        };
      }

      try {
        const spreadName = t(
          `${config.spreadId}.data.spreadName`,
          config.spreadId
        );
        const title =
          payload.title ||
          t(`${config.spreadId}.data.spreadTitle`, payload.title);
        const interpretation = payload.interpretation;
        const idempotencyKey =
          payload.idempotencyKey ||
          buildDefaultIdempotencyKey(user.id, payload.readingType);

        const { data, error } = await supabase.rpc(
          'fn_create_reading_with_debit',
          {
            p_user_id: user.id,
            p_reading_type: payload.readingType,
            p_spread_name: spreadName,
            p_title: title,
            p_interpretation: interpretation,
            p_cards: payload.cards,
            p_questions: payload.questions ?? null,
            p_cost_credits: costCredits,
            p_metadata: {
              ...(payload.metadata ?? {}),
              locale: (navigator && navigator.language) || 'tr-TR',
            },
            p_idempotency_key: idempotencyKey,
            p_status: payload.status ?? 'completed',
          }
        );

        if (error) {
          throw error;
        }

        return {
          success: true,
          recordId: data?.id,
          costCredits,
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Kaydetme işlemi başarısız oldu.';
        return {
          success: false,
          error: message,
          costCredits,
        };
      } finally {
        formState.setSavingReading(false);
      }
    },
    [config.spreadId, costCredits, formState, t, user]
  );

  return {
    requestDetailedFormSave,
    cancelDetailedFormSave,
    confirmDetailedFormSave,
    saveReading,
    detailedCredits,
    writtenCredits,
  };
}
