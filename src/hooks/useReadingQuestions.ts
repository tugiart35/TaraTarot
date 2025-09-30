import { useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import type { TarotConfig } from '@/features/tarot/shared/types/tarot-config.types';

export interface ReadingQuestionEntry {
  label: string;
  value: string;
}

export interface ReadingQuestions {
  personalInfo: ReadingQuestionEntry[];
  prompts: ReadingQuestionEntry[];
}

function parseQuestions(
  rawQuestions: any,
  config: TarotConfig | null,
  translate: (key: string, fallback?: string) => string
): ReadingQuestions {
  if (!rawQuestions) {
    return { personalInfo: [], prompts: [] };
  }

  let questionsPayload = rawQuestions;
  if (typeof rawQuestions === 'string') {
    try {
      questionsPayload = JSON.parse(rawQuestions);
    } catch (error) {
      console.warn('Failed to parse reading questions', error);
      return { personalInfo: [], prompts: [] };
    }
  }

  const personalInfoEntries: ReadingQuestionEntry[] = [];
  const promptEntries: ReadingQuestionEntry[] = [];

  const namespace = config?.translationNamespace;
  const formKeys = config?.i18nKeys?.form;

  const personalInfo =
    questionsPayload.personalInfo || questionsPayload.details?.personalInfo;

  if (personalInfo) {
    personalInfoEntries.push(
      {
        label:
          (formKeys && translate(formKeys.firstName)) ||
          translate('readingModal.firstName', 'Ad'),
        value: personalInfo.name ?? personalInfo.firstName ?? '-',
      },
      {
        label:
          (formKeys && translate(formKeys.lastName)) ||
          translate('readingModal.lastName', 'Soyad'),
        value: personalInfo.surname ?? personalInfo.lastName ?? '-',
      },
      {
        label:
          (formKeys && translate(formKeys.birthDate)) ||
          translate('readingModal.birthDate', 'Doğum Tarihi'),
        value: personalInfo.birthDate ?? '-',
      },
      {
        label:
          (formKeys && translate(formKeys.email)) ||
          translate('readingModal.email', 'E-posta'),
        value: personalInfo.email ?? '-',
      }
    );
  }

  const userQuestions =
    questionsPayload.userQuestions ||
    questionsPayload.questions ||
    questionsPayload.prompts;

  if (userQuestions) {
    if (typeof userQuestions === 'object') {
      Object.entries(userQuestions).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const normalizedKey = key.toLowerCase();
        let labelFallback = key;

        if (namespace) {
          const translated = translate(
            `${namespace}.form.${normalizedKey}Question`,
            value as string
          );
          if (translated !== value) {
            labelFallback = translated;
          }
        }

        promptEntries.push({
          label: labelFallback,
          value: String(value),
        });
      });
    } else if (Array.isArray(userQuestions)) {
      userQuestions.forEach((question: any, index: number) => {
        if (!question) {
          return;
        }
        promptEntries.push({
          label: `${translate('readingModal.question', 'Soru')} ${index + 1}`,
          value: String(question),
        });
      });
    }
  }

  return {
    personalInfo: personalInfoEntries.filter(
      entry => entry.value && entry.value !== '-'
    ),
    prompts: promptEntries.filter(entry => entry.value),
  };
}

export function useReadingQuestions(
  reading: Reading | null,
  config: TarotConfig | null
): ReadingQuestions {
  const { t } = useTranslations();

  const questions = useMemo(
    () =>
      parseQuestions(reading?.questions, config, (key, fallback) =>
        t(key, fallback ?? key)
      ),
    [reading?.questions, config, t]
  );

  return questions;
}
